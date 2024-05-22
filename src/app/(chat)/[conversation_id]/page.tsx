import { getMessages } from "@/app/server/actions";
import Messages from "@/components/messages";
import SendMessage from "@/components/send-message";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

export default async function page({
  params,
}: {
  params: { conversation_id: string };
}) {
  console.log(params);
  const { conversation_id } = params;
  const messages = await getMessages(conversation_id);
  return (
    <Card className="sm:container h-dvh rounded-none ">
      <CardContent className="min-h-[550px] sm:min-h-[590px]">
        <Messages messages={messages} />
      </CardContent>

      <CardFooter>
        <SendMessage conversation_id={conversation_id} />
      </CardFooter>
    </Card>
  );
}
