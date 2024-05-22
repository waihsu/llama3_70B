import { getConversation } from "@/app/server/actions";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { conversation } from "@prisma/client";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import ConversationCard from "./conversation-card";

export default async function Conversations() {
  const conversations = await getConversation();
  return (
    <ScrollArea className=" h-full py-3 pb-5 px-2">
      <div className="flex flex-col space-y-3">
        {conversations &&
          conversations.map((item, index) => (
            <Link href={`/${item.id}`} key={index}>
              <ConversationCard name={String(item.name)} />
            </Link>
          ))}
      </div>
    </ScrollArea>
  );
}
