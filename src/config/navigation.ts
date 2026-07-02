import {
  LayoutDashboard,
  Settings,
  BarChart,
  type LucideIcon,
  PencilRuler,
  Filter,
  Table,
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
        url: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Forms",
        url: "/forms",
        icon: PencilRuler,
        items: [
          { title: "Rich Text Editor", url: "/forms/rich-text" },
          { title: "Image Uploader", url: "/forms/image-uploader" },
          { title: "File Uploader", url: "/forms/file-uploader" },
        ],
      },
      {
        title: "Filters",
        url: "/filters",
        icon: Filter,
        items: [
          { title: "Pagination", url: "/filters/pagination" },
          { title: "Select Filter", url: "/filters/select" },
          { title: "Search Filter", url: "/filters/search" },
          { title: "Limit Filter", url: "/filters/limit" },
          { title: "Reset Filters", url: "/filters/reset" },
        ],
      },
      {
        title: "Charts",
        url: "/charts",
        icon: BarChart,
        items: [
          { title: "Dashboard Charts", url: "/charts/analytics" },
        ],
      },
      {
        title: "Table",
        url: "/table",
        icon: Table,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        items: [
          { title: "Dark Theme Colors", url: "/settings/dark-theme" },
        ],
      },
    ],
  },
];

export const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "",
};
