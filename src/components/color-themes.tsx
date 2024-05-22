"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { CheckIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { themes } from "@/lib/themes";
import { useConfig } from "@/hooks/use-config";

const colors = [
  "zinc",
  "slate",
  "stone",
  "gray",
  "neutral",
  "red",
  "rose",
  "orange",
  "green",
  "blue",
  "yellow",
  "violet",
];

export default function ColorThemes({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  const { resolvedTheme: mode } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="">
      <div className="items-center space-x-0.5 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12">
        {mounted ? (
          <>
            {colors.map((color, index) => {
              const theme = themes.find((theme) => theme.name === color);
              const isActive = config.theme === color;

              if (!theme) {
                return null;
              }

              return (
                <TooltipProvider key={index}>
                  <Tooltip key={color}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          setConfig({
                            ...config,
                            theme: theme.name,
                          });
                          setOpen(false);
                        }}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs",
                          isActive
                            ? "border-[--theme-primary]"
                            : "border-transparent"
                        )}
                        style={
                          {
                            "--theme-primary": `hsl(${
                              theme?.activeColor[
                                mode === "dark" ? "dark" : "light"
                              ]
                            })`,
                          } as React.CSSProperties
                        }
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]"
                          )}
                        >
                          {isActive && (
                            <CheckIcon className="h-4 w-4 text-white" />
                          )}
                        </span>
                        <span className="sr-only">{theme.label}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="rounded-[0.5rem] bg-zinc-900 text-zinc-50"
                    >
                      {theme.label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </>
        ) : (
          <div className="mr-1 flex items-center gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
