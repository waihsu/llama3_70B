"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { Separator } from "@/components/ui/separator";
import { SignOut } from "./signout-button";
import Link from "next/link";

export function DropdownProfile({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className=" cursor-pointer py-1 rounded-md px-3 text-xs border border-input bg-background shadow-sm hover:bg-accent hover:text-primary">
          {user.name}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
