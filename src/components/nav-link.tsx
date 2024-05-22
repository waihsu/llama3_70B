"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink() {
  const pathname = usePathname();

  return (
    <div className=" hidden sm:flex items-center gap-3 ">
      {/* {sidebarNav.map((item) => (
        <Navlink href={item.href} key={item.href} pathname={pathname}>
          {item.title}
        </Navlink>
      ))} */}
    </div>
  );
}

interface NavlinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  pathname: string;
}

function Navlink({
  pathname,
  href,

  className,
  children,
  ...props
}: NavlinkProps) {
  return (
    <Link
      href={href}
      className={
        (cn(className),
        pathname === href ? "text-primary" : "text-muted-foreground")
      }
      {...props}
    >
      {children}
    </Link>
  );
}
