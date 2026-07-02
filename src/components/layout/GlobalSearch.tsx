"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { navigation } from "@/config/navigation";
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
    const items: {
      title: string;
      href: string;
      icon: React.ComponentType<{ className?: string }>;
    }[] = [];

    navigation.forEach((group) => {
      group.items.forEach((item) => {
        items.push({
          title: item.title,
          href: item.url,
          icon: item.icon,
        });
        item.items?.forEach((child) => {
          items.push({
            title: `${ item.title } > ${ child.title }`,
            href: child.url,
            icon: item.icon,
          });
        });
      });
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
            { searchableItems.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={ item.href + item.title }
                  value={ item.title }
                  onSelect={ () => {
                    runCommand(() => router.push(item.href));
                  } }
                >
                  <Icon className="mr-2 h-4 w-4 shrink-0" />
                  { item.title }
                </CommandItem>
              );
            }) }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
