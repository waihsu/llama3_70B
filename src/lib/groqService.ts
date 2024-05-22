import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function getGroqChatCompletion(userMessage: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama3-70b-8192",
  });
}
