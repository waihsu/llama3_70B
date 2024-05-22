"use client";
import { cn } from "@/lib/utils";
import { messages } from "@prisma/client";
import React, { useEffect, useRef } from "react";

export default function Messages({ messages }: { messages: messages[] }) {
  const latestMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollTop =
        latestMessageRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="max-h-[500px] lg:max-h-[590px] overflow-y-scroll scrollbar-none"
      ref={latestMessageRef}
    >
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex max-w-[90%] sm:w-max md:max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm overflow-x-scroll scrollbar-none",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.message.split("\n").map((messg, index) => (
              <p key={index}>{messg}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
