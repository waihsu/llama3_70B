import { auth } from "@/auth";
import React from "react";
import Conversations from "./conversation";
import SocialLogin from "./social-login";
import Link from "next/link";
import { Edit } from "lucide-react";

export default async function SideBar() {
  const session = await auth();
  return (
    <div className="relative h-full bg-primary">
      <Link
        href={"/"}
        className="w-full flex justify-between items-center bg-[#333333] p-2 rounded-lg"
      >
        <div className="flex items-center">
          <FingerprintIcon className="text-white h-6 w-6" />
          <span className="text-white font-medium mx-2">New chat</span>
        </div>
        <Edit className=" self-end" />
      </Link>
      {session ? (
        <Conversations />
      ) : (
        <div className="">
          <SocialLogin />
        </div>
      )}
    </div>
  );
}

function FingerprintIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  );
}
