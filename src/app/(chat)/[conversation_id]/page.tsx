import { getMessages } from "@/app/server/actions";
import Messages from "@/components/messages";
import SendMessage from "@/components/send-message";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import ChatForm from "./chat-form";

export default async function page({
  params,
}: {
  params: { conversation_id: string };
}) {
  console.log(params);
  const { conversation_id } = params;
  const messages = await getMessages(conversation_id);
  return (
    <div className="h-full ">
      <ChatForm messages={messages} conversation_id={conversation_id} />
    </div>
  );
}
