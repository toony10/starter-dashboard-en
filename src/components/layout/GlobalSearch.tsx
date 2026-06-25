"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { navItems } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const searchableItems = React.useMemo(() => {
    const items: { title: string; href: string; icon: React.ReactNode }[] = [];
    navItems.forEach((item) => {
      if (item.href) {
        items.push({ title: item.title, href: item.href, icon: item.icon });
      }
      if (item.children) {
        item.children.forEach((child) => {
          items.push({
            title: `${ item.title } > ${ child.title }`,
            href: child.href,
            icon: item.icon,
          });
        });
      }
    });
    return items;
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={ cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-2/3 lg:w-1/3"
        ) }
        onClick={ () => setOpen(true) }
      >
        <Search className="mr-2 h-4 w-4 shrink-0" />
        <span className="hidden lg:inline-flex">Search pages...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={ open } onOpenChange={ setOpen }>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            { searchableItems.map((item) => (
              <CommandItem
                key={ item.href }
                value={ item.title }
                onSelect={ () => {
                  runCommand(() => router.push(item.href));
                } }
              >
                <div className="mr-2 flex h-4 w-4 items-center justify-center">
                  { item.icon }
                </div>
                { item.title }
              </CommandItem>
            )) }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
