"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { navItems, type NavItem } from "@/config/navigation";
import { Logo } from "../shared/logo/Logo";

export function Sidebar({
  className,
  isCollapsed,
}: {
  className?: string;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      className={ cn(
        "hidden border-r bg-muted/40 md:block h-full transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-64",
        className
      ) }
    >
      <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
        <div
          className={ cn(
            "flex h-14 items-center border-b px-4 lg:h-[60px]",
            isCollapsed ? "justify-center px-2" : "lg:px-6"
          ) }
        >
          <Link href="/" className="flex items-center gap-2 font-semibold">
            { !isCollapsed && <Logo width={ 160 } height={ 50 } /> }
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <TooltipProvider delayDuration={ 0 }>
            <nav className="grid items-start px-2 text-sm font-medium gap-1 py-2">
              { navItems.map((item, index) => (
                <NavItem
                  key={ index }
                  item={ item }
                  pathname={ pathname }
                  isCollapsed={ isCollapsed }
                />
              )) }
            </nav>
          </TooltipProvider>
        </ScrollArea>
      </div>
    </div>
  );
}

function NavItem({
  item,
  pathname,
  isCollapsed,
}: {
  item: NavItem;
  pathname: string;
  isCollapsed?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (item.children) {
    return (
      <Collapsible open={ isOpen && !isCollapsed } onOpenChange={ setIsOpen }>
        <Tooltip>
          <TooltipTrigger asChild>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={ cn(
                  "w-full justify-between px-3 py-2 h-9",
                  isCollapsed ? "justify-center px-0" : ""
                ) }
              >
                <div className="flex items-center gap-3">
                  { item.icon }
                  { !isCollapsed && <span>{ item.title }</span> }
                </div>
                { !isCollapsed && (
                  <ChevronDown
                    className={ cn("h-4 w-4 shrink-0 transition-transform", {
                      "rotate-180": isOpen,
                    }) }
                  />
                ) }
              </Button>
            </CollapsibleTrigger>
          </TooltipTrigger>
          { isCollapsed && (
            <TooltipContent side="right" className="flex flex-col gap-1">
              <div className="font-semibold mb-1">{ item.title }</div>
              { item.children.map((child, index) => (
                <Link
                  key={ index }
                  href={ child.href }
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  { child.title }
                </Link>
              )) }
            </TooltipContent>
          ) }
        </Tooltip>
        { !isCollapsed && (
          <CollapsibleContent className="pl-6 pr-2 py-1 space-y-1">
            { item.children.map((child, index) => (
              <Link
                key={ index }
                href={ child.href }
                className={ cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === child.href ? "bg-muted text-primary" : ""
                ) }
              >
                { child.title }
              </Link>
            )) }
          </CollapsibleContent>
        ) }
      </Collapsible>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={ item.href! }
          className={ cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === item.href ? "bg-muted text-primary" : "",
            isCollapsed ? "justify-center px-0" : ""
          ) }
        >
          { item.icon }
          { !isCollapsed && <span>{ item.title }</span> }
        </Link>
      </TooltipTrigger>
      { isCollapsed && <TooltipContent side="right">{ item.title }</TooltipContent> }
    </Tooltip>
  );
}
