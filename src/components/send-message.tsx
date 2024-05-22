"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { sendAMessage } from "@/app/server/actions";
import { useRouter } from "next/navigation";

const sendMessageSchema = z.object({
  conversation_id: z.string().optional(),
  message: z.string(),
});

export default function SendMessage({
  conversation_id,
}: {
  conversation_id?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      conversation_id: conversation_id,
      message: "",
    },
  });
  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    const { messg, newConversation } = await sendAMessage(values);
    form.reset();
    if (newConversation) {
      router.push(newConversation.id);
      router.refresh();
    }
  }
  return (
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
          disabled={!form.formState.isDirty || loading}
        >
          <PaperPlaneIcon className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </Form>
  );
}
