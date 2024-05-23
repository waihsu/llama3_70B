"use client";
import {
  CheckIcon,
  ChevronLeftIcon,
  PaperPlaneIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import Link from "next/link";
import { sendAMessage } from "@/app/server/actions";
import { messages } from "@prisma/client";

const sendMessageSchema = z.object({
  conversation_id: z.string().optional(),
  message: z.string(),
});

interface Message {
  role: string;
  message: string;
}

export default function ChatForm({
  messages,
  conversation_id,
}: {
  messages: messages[];
  conversation_id: string;
}) {
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      conversation_id: conversation_id,
      message: "",
    },
  });
  const [allmessages, setAllMessages] = useState<Message[]>(messages);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollTop =
        latestMessageRef.current.scrollHeight;
    }
  }, [allmessages]);

  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    setAllMessages((pre) => [
      ...pre,
      { role: "user", message: values.message },
    ]);
    form.reset();
    const { respMessg } = await sendAMessage(values);
    if (respMessg) {
      setAllMessages((pre) => [
        ...pre,
        { role: respMessg.role, message: respMessg.message },
      ]);
    }
  }
  return (
    <div className=" h-[90%] rounded-none">
      <div
        ref={latestMessageRef}
        className="h-[86%] shadow-sm py-0  mb-6 flex flex-col space-y-3 overflow-y-scroll scrollbar-none  "
      >
        {allmessages.map((message, index) => (
          <div key={index} className=" flex space-x-1 ">
            <div
              className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted overflow-x-scroll"
              )}
            >
              {message.message.split("\n").map((messg, index) => (
                <p key={index}>{messg}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background  w-full px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormControl>
                    <Input
                      id="message"
                      placeholder="Type your message..."
                      className="flex-1 text-muted-foreground"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!form.formState.isDirty}
            >
              <PaperPlaneIcon className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
