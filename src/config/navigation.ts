import {
  LayoutDashboard,
  Settings,
  BarChart,
  type LucideIcon,
  PencilRuler,
  Filter,
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
