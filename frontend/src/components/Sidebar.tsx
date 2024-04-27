"use client";

import { BadgePercent, LogOut } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";
import { FaSalesforce } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import {
  LuBarChart4,
  LuBuilding2,
  LuGalleryVertical,
  LuInbox,
  LuSettings,
  LuUsers,
} from "react-icons/lu";
import { TbChevronLeft, TbDirection } from "react-icons/tb";

type SidebarItemProps = {
  isCollapsed: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const SidebarItem = ({
  children,
  leftSlot,
  rightSlot,
  isCollapsed,
  className = "",
}: PropsWithChildren<SidebarItemProps>) => {
  return (
    <div className={[`flex items-center gap-2`, className].join(" ")}>
      <div className="size-[16px] shrink-0">{leftSlot}</div>
      <div
        className={[
          "flex-1 flex justify-between items-center gap-2 overflow-hidden",
          isCollapsed ? "w-0" : "w-auto",
        ].join(" ")}
      >
        <div>{children}</div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={[
        `px-4 py-6 transition transition-all duration-300`,
        isCollapsed ? "w-[66px]" : "w-[240px]",
      ].join(" ")}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <SidebarItem
            isCollapsed={isCollapsed}
            className="px-2 py-1 border border-neutral-200 rounded-md"
            leftSlot={
                <BadgePercent className="size-4 rounded-md"/>
            }
            rightSlot={<TbDirection className="text-xl opacity-50" />}
          >
            <span className="text-sm font-medium">Sales team</span>
          </SidebarItem>
          <div className="flex justify-end">
            <button
              onClick={() => setIsCollapsed((s) => !s)}
              className={[
                "size-5 flex justify-center items-center text-sm rounded-full bg-neutral-900 text-white translate-x-[27px]",
                "transition transition-all duration-300 delay-200",
                "shadow-[0px_0px_12px_rgba(72,66,66,1)]",
                isCollapsed ? "rotate-180" : "",
              ].join(" ")}
            >
              <TbChevronLeft />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 border border-neutral-200 rounded-md bg-white"
              leftSlot={<LuBarChart4 />}
            >
              <span className="text-sm font-medium">Dashboard</span>
            </SidebarItem>
           
          </div>
          <div className="py-4">
            <hr />
          </div>
          <div className="flex flex-col gap-2">
          <Link href="/dashboard/pdf">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<FaFilePdf />}
            >
              <span className="text-sm font-medium">PDF Injestion</span>
            </SidebarItem>
            </Link>
            <Link href="/dashboard">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<GrAnalytics />}
            >
              <span className="text-sm font-medium">Analytics</span>
            </SidebarItem>
            </Link>
            <Link href="/chat">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuUsers />}
            >
              <span className="text-sm font-medium">Sales Chatbot</span>
            </SidebarItem>
            </Link>
          </div>
        </div>
        
            <SidebarItem
            isCollapsed={isCollapsed}
            className="px-2 py-1 opacity-70"
            leftSlot={<LogOut className="size-4" />}
            >
            <span className="text-sm font-medium">Log Out</span>
            </SidebarItem>
            
        </div>
        </aside>
    );
    };