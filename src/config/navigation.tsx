import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart,
} from "lucide-react";

export type NavItem = {
  title: string;
  href?: string;
  icon: React.ReactNode;
  children?: { title: string; href: string }[];
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <Users className="w-4 h-4 shrink-0" />,
  },
  {
    title: "Posts",
    icon: <FileText className="w-4 h-4 shrink-0" />,
    children: [
      { title: "All Posts", href: "/dashboard/posts" },
      { title: "Add New", href: "/dashboard/posts/new" },
    ],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart className="w-4 h-4 shrink-0" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-4 h-4 shrink-0" />,
  },
];
