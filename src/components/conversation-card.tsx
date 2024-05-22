import { Card } from "./ui/card";

export default function ConversationCard({ name }: { name: string }) {
  return (
    <Card className="flex justify-start items-center p-3">
      <p className="  line-clamp-1 ">{name}</p>
    </Card>
  );
}
