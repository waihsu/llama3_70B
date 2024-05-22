"use client";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig();
  const { theme, themes, setTheme, resolvedTheme } = useTheme();
  // console.log("defaultTheme", defaultTheme);
  return (
    <div
      className={cn(
        `theme-${defaultTheme || config.theme}`,
        "w-full scrollbar-thumb-primary",
        className
      )}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
