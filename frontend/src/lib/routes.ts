import { SVGProps } from "react-html-props";
import Blog from "@/components/icons/blog";
import Chat from "@/components/icons/chat";
import User from "@/components/icons/user";
import FAQs from "@/components/icons/faqs";
import List from "@/components/icons/list";
import Email from "@/components/icons/email";
import Share from "@/components/icons/share";
import Invoice from "@/components/icons/invoice";
import Pricing from "@/components/icons/pricing";
import Profile from "@/components/icons/profile";
import Session from "@/components/icons/session";
import Support from "@/components/icons/support";
import Calender from "@/components/icons/calender";
import Dashboard from "@/components/icons/dashboard";
import Ecommerce from "@/components/icons/ecommerce";
import Authentication from "@/components/icons/authentication";
import DocumentText from "@/components/icons/document-text";

interface RouteProps {
  title: string;
  pages: {
    name: string;
    path: string;
    Icon: (props: SVGProps) => JSX.Element;
    childItems?: { name: string; path: string }[];
  }[];
}

const routes: RouteProps[] = [
  {
    title: "Menu",
    pages: [
      {
        Icon: Dashboard,
        name: "Dashboard",
        path: "/dashboard",
        childItems: [
          { name: "Dashboard V1", path: "/dashboard-v1" },
          { name: "Dashboard V2", path: "/dashboard-v2" },
          { name: "Dashboard V3", path: "/dashboard-v3" },
          { name: "Dashboard V4", path: "/dashboard-v4" },
          { name: "Dashboard V5", path: "/dashboard-v5" },
          { name: "Analytics", path: "/analytics" },
          { name: "Finance 1", path: "/finance-1" },
          { name: "Finance 2", path: "/finance-2" },
          { name: "E-commerce", path: "/ecommerce" },
          { name: "Project Management", path: "/project-management" },
          { name: "CRM", path: "/crm" },
          { name: "Logistics", path: "/logistics" },
          { name: "Marketing", path: "/marketing" },
        ],
      },
    ],
  },
  {
    title: "Pages",
    pages: [
      {
        Icon: User,
        name: "User",
        path: "/user",
        childItems: [{ name: "Marketing", path: "/marketing" }],
      },
      {
        Icon: Profile,
        name: "Account",
        path: "/account",
        childItems: [],
      },
      {
        Icon: User,
        name: "Profile",
        path: "/profile",
        childItems: [],
      },
      {
        Icon: Invoice,
        name: "Invoice",
        path: "/invoice",
        childItems: [],
      },
      {
        Icon: Authentication,
        name: "Authentication",
        path: "/authentication",
        childItems: [],
      },
      {
        Icon: Blog,
        name: "Blog",
        path: "/blog",
        childItems: [],
      },
      {
        Icon: Share,
        name: "Social",
        path: "/social",
        childItems: [],
      },
      {
        Icon: Pricing,
        name: "Pricing",
        path: "/pricing",
      },
      {
        Icon: FAQs,
        name: "FAQs",
        path: "/faqs",
      },
    ],
  },
  {
    title: "Apps",
    pages: [
      {
        Icon: Ecommerce,
        name: "E-commerce",
        path: "/ecommerce",
        childItems: [],
      },
      {
        Icon: Support,
        name: "Contact",
        path: "/contact",
        childItems: [],
      },
      {
        Icon: Email,
        name: "E-mail",
        path: "/email",
      },
      {
        Icon: Chat,
        name: "Chat",
        path: "/chat",
      },
      {
        Icon: List,
        name: "To Do",
        path: "/todo",
      },
      {
        Icon: Calender,
        name: "Calender",
        path: "/calender",
      },
      {
        Icon: Session,
        name: "Session",
        path: "/session",
      },
      {
        Icon: DocumentText,
        name: "Documentation",
        path: "/documentation",
      },
    ],
  },
];

export default routes;
