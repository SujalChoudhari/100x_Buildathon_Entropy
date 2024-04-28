"use client";

import { BadgePercent, LogOut, StarIcon, Voicemail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { FaSalesforce } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import {
  LuBarChart4,
  LuBuilding2,
  LuGalleryVertical,
  LuInbox,
  LuMailSearch,
  LuSettings,
  LuUsers,
  LuVoicemail,
} from "react-icons/lu";
import { TbChevronLeft, TbDirection, TbGraph, TbGraphFilled } from "react-icons/tb";

type SidebarItemProps = {
  isCollapsed: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
  name: string;
  onClick: () => void;
};

export const SidebarItem = ({
  children,
  leftSlot,
  rightSlot,
  isCollapsed,
  className = "",

  name,
  onClick,
}: PropsWithChildren<SidebarItemProps>) => {

  return (
    <div className={[`flex items-center gap-2`, className].join(" ")} onClick={onClick}>
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
  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected item

  const handleItemClick = (name: string) => {
    setSelectedItem(name);
  };
  const router = useRouter();

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
              <TbGraph className="size-4 rounded-md" />
            }
            rightSlot={<TbDirection className="text-xl opacity-50" />}
            name="Sales team"
            onClick={() => handleItemClick("Sales team")}
          >
            <span className={`text-sm font-medium ${selectedItem === "Sales team" ? "text-white" : ""}`}>Sales team</span>
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
              name="Sales team"
              onClick={() => handleItemClick("Sales team")}
            >
              <span className="text-sm  font-medium">Dashboard</span>
            </SidebarItem>

          </div>
          <div className="py-4">
            <hr />
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/dashboard/pdf">
              <SidebarItem
                isCollapsed={isCollapsed}
                className="px-2 py-1  border-neutral-200 rounded-md"
                leftSlot={<FaFilePdf className="text-white" />}
                rightSlot={<TbDirection className="text-xl opacity-50" />}
                name="PDF Injestion"
                onClick={() => handleItemClick("PDF Injestion")}
              >
                <span className={`text-sm font-medium ${selectedItem === "PDF Injestion" ? "text-white" : ""}`}>PDF Injestion</span>
              </SidebarItem>
            </Link>
            <Link href="/dashboard">
              <SidebarItem
                isCollapsed={isCollapsed}
                className="px-2 py-1  border-neutral-200 rounded-md"
                leftSlot={<GrAnalytics className="text-white" />}
                rightSlot={<TbDirection className="text-xl opacity-50" />}
                name="Analytics"
                onClick={() => handleItemClick("Analytics")}
              >
                <span className={`text-sm font-medium ${selectedItem === "Analytics" ? "text-white" : ""}`}>Analytics</span>
              </SidebarItem>
            </Link>
            <Link href="/chat">
              <SidebarItem
                isCollapsed={isCollapsed}
                className="px-2 py-1  border-neutral-200 rounded-md"
                leftSlot={<LuUsers className="text-white" />}
                rightSlot={<TbDirection className="text-xl opacity-50" />}
                name="Sales Chatbot"
                onClick={() => handleItemClick("Sales Chatbot")}
              >
                <span className={`text-sm font-medium ${selectedItem === "Sales Chatbot" ? "text-white" : ""}`}>Sales Chatbot</span>
              </SidebarItem>
            </Link>

            <Link href="/dashboard/voice">
              <SidebarItem
                isCollapsed={isCollapsed}
                className="px-2 py-1 opacity-70"
                leftSlot={<LuVoicemail className="text-white"/>}
                name="Agent Calls"
                onClick={() => handleItemClick("Agent Calls")}
              >
                <span className={`text-sm font-medium ${selectedItem === "Agent Calls" ? "text-white" : ""}`}>Agent Calls</span>
              </SidebarItem>
            </Link>
            <Link href="/dashboard/email">
              <SidebarItem
                isCollapsed={isCollapsed}
                className="px-2 py-1 opacity-70"
                leftSlot={<LuMailSearch className="text-white"/>}
                name="Mass Mail"
                onClick={() => handleItemClick("Mass Mail")}
              >
              <span className={`text-sm font-medium ${selectedItem === "Mass Mail" ? "text-white" : ""}`}>Mass Mail</span>
              </SidebarItem>
            </Link>

          </div>
        </div>
        <SidebarItem
          isCollapsed={isCollapsed}
          className="px-2 py-1 opacity-70"
          leftSlot={<LogOut className="size-4 text-white" />}
          name="Logout"
          onClick={() => handleItemClick("Logout")}
        >
          <button className="text-sm font-medium text-white" onClick={() => { router.push("/login"); localStorage.removeItem("accessToken") }}>Log Out</button>
        </SidebarItem>
        {/* <Link href="/dashboard/voice">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1 opacity-70"
              leftSlot={<LuVoicemail/>}
            >
              <span className="text-sm font-medium">Voice Call</span>
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
            </SidebarItem> */}

      </div>
    </aside>
  );
};