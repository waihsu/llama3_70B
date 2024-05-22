import { auth } from "@/auth";
import SendMessage from "@/components/send-message";
import UnAuthChat from "@/components/un-auth-chat";

export default async function App() {
  const session = await auth();
  if (!session) {
    return <UnAuthChat />;
  }
  return (
    <main className=" min-w-full flex min-h-dvh flex-col items-center justify-between container scroll-smooth ">
      <div className="fixed w-full px-6 sm:w-[700px] bottom-10 ">
        <SendMessage />
      </div>
    </main>
  );
}
