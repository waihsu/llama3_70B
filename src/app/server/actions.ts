"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { getGroqChatCompletion } from "@/lib/groqService";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUser() {
  try {
    const session = await auth();
    const user = session?.user;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function signup({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    console.log(email, password, name);
    const existUser = await prisma.user.findUnique({ where: { email } });
    console.log(existUser);
    if (existUser) return { messg: "Email already exists" };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
    return { messg: "successful" };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function getConversation() {
  const user = await getUser();
  if (!user) return [];
  try {
    const conversations = await prisma.conversation.findMany({
      where: { user_id: user.id },
      orderBy: { createdAt: "desc" },
    });
    return conversations;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function sendAMessage({
  conversation_id,
  message,
}: {
  conversation_id?: string;
  message: string;
}) {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      const chatCompletion = await getGroqChatCompletion(message);
      return { messg: chatCompletion.choices[0].message.content };
    }
    if (!conversation_id) {
      const newConversation = await prisma.conversation.create({
        data: { name: message, user_id: user.id as string },
      });
      await prisma.messages.create({
        data: {
          conversation_id: newConversation.id,
          role: "user",
          message: message,
        },
      });
      const chatCompletion = await getGroqChatCompletion(message);
      await prisma.messages.create({
        data: {
          conversation_id: newConversation.id,
          message: chatCompletion.choices[0].message.content,
          role: "assistant",
        },
      });
      return { newConversation };
    }
    await prisma.messages.create({
      data: {
        conversation_id: conversation_id,
        role: "user",
        message: message,
      },
    });
    const chatCompletion = await getGroqChatCompletion(message);
    const respMessg = await prisma.messages.create({
      data: {
        conversation_id: conversation_id,
        message: chatCompletion.choices[0].message.content,
        role: "assistant",
      },
    });

    return { respMessg };
  } catch (err) {
    console.log(err);
    return { messg: "error" };
  }
}

export async function getMessages(conversation_id: string) {
  try {
    const messages = await prisma.messages.findMany({
      where: { conversation_id },
    });
    return messages;
  } catch (err) {
    console.log(err);
    return [];
  }
}
