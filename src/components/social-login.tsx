"use client";
import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export default function SocialLogin() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className=" flex items-center w-full gap-x-2 ">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <FaGithub />
      </Button>
    </div>
  );
}
