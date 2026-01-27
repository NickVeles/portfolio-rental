"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building2,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface DashboardSidebarProps {
  userType: "manager" | "tenant";
}

const DashboardSidebar = ({ userType }: DashboardSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          {
            icon: Building2,
            label: "Your Properties",
            href: "/managers/properties",
          },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          {
            icon: Settings,
            label: "Settings",
            href: "/managers/settings",
          },
        ]
      : [
          {
            icon: Heart,
            label: "Favorites",
            href: "/tenants/favorites",
          },
          {
            icon: FileText,
            label: "Applications",
            href: "/tenants/applications",
          },
          {
            icon: Home,
            label: "Residences",
            href: "/tenants/residences",
          },
          {
            icon: Settings,
            label: "Settings",
            href: "/tenants/settings",
          },
        ];

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 shadow-lg"
      style={{
        top: NAVBAR_HEIGHT,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem
            className={cn(
              "flex flex-nowrap min-h-14 w-full items-center pt-3 mb-3",
              open ? "justify-between px-6" : "justify-center",
            )}
          >
            {open ? (
              <>
                <h1 className="text-xl font-bold text-gray-800 text-nowrap">
                  {userType === "manager" ? "Manager View" : "Renter View"}
                </h1>
                <Button
                  aria-label="Close sidebar"
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSidebar()}
                >
                  <X className="min-h-4 min-w-4" />
                </Button>
              </>
            ) : (
              <Button
                aria-label="Open sidebar"
                variant="ghost"
                size="icon"
                onClick={() => toggleSidebar()}
              >
                <Menu className="min-h-4 min-w-4" />
              </Button>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
};

export default DashboardSidebar;
