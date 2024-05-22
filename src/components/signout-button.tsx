import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export function SignOut() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="w-full text-start">
          Sign Out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Are you absolutely sure?</DialogTitle>
          <form
            action={() => {
              signOut();
              redirect("/");
            }}
            className="flex gap-2"
          >
            <DialogClose asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full text-start"
                type="reset"
              >
                Cancle
              </Button>
            </DialogClose>
            <Button
              variant={"destructive"}
              size={"sm"}
              className="w-full text-start"
              type="submit"
            >
              Sign Out
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
