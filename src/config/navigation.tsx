import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart,
  type LucideIcon,
} from "lucide-react";

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: NavSubItem[];
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Posts",
        url: "/dashboard/posts",
        icon: FileText,
        items: [
          { title: "All Posts", url: "/dashboard/posts" },
          { title: "Add New", url: "/dashboard/posts/new" },
        ],
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
};
