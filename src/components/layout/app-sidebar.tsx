"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarLogo } from "./sidebar-logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { navigation } from "@/config/navigation";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" { ...props }>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        { navigation.map((group, index) => (
          <NavMain key={ index } items={ group.items } />
        )) }
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
