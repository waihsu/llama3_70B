import Navbar from "@/components/Navbar";
import { ResizableLayout } from "@/components/resize-layout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ResizableLayout>
      <Navbar />
      {children}
    </ResizableLayout>
  );
}
