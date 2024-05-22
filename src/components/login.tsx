"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { signIn } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import SocialLogin from "./social-login";

export function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(formData: z.infer<typeof signInSchema>) {
    try {
      const data = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        // callbackUrl: "http://localhost:3000/api/auth/callback/credentials",
      });
      console.log("data", data);
      if (data?.error === "CredentialsSignin") {
        toast({
          title: "Incorrect email or password. Please try again.",
          variant: "destructive",
        });
        console.error("Login error:", data.error);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" shadow-lg rounded-lg p-8 w-full max-w-md ">
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl font-bold">Login</p>
          <Link
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline"
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p className=" text-right">
              {" "}
              <Link
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 text-sm underline "
                href="#"
              >
                Forgot Password?
              </Link>
            </p>
            <Button className=" w-full" size={"sm"} type="submit">
              Submit
            </Button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Do not have an account?
              <Link
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500 underline"
                href="/auth/signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
        <div className=" my-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
