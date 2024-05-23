import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideBar from "./sidebar";
import Navbar from "./Navbar";

export function ResizableLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] w-full fixed rounded-lg border"
    >
      <ResizablePanel defaultSize={25} className="hidden sm:block">
        <div className="flex flex-col h-full  p-6">
          <SideBar />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="" />
      <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
