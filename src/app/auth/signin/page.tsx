import { auth } from "@/auth";
import { Login } from "@/components/login";
import React from "react";

export default async function SignIn() {
  const session = await auth();
  if (session?.user) return <p>You are Logged in.</p>;
  return (
    <>
      <Login />
    </>
  );
}
