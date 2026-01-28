"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
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
import Link from "next/link";

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
        <div
          className={cn(
            "flex flex-nowrap min-h-14 items-center overflow-hidden",
            open ? "justify-between px-2" : "justify-center",
          )}
        >
          {open ? (
            <>
              <h1 className="text-xl font-bold text-gray-800 text-nowrap">
                {userType === "manager" ? "Manager View" : "Renter View"}
              </h1>
              <Button
                aria-label="Close sidebar"
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={() => toggleSidebar()}
              >
                <X className="size-5" />
              </Button>
            </>
          ) : (
            <Button
              aria-label="Open sidebar"
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => toggleSidebar()}
            >
              <Menu className="size-5" />
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarMenu className="p-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem
                key={link.label}
                className="flex justify-center w-full"
              >
                <SidebarMenuButton
                  asChild
                  aria-label={`Go to ${link.label}`}
                  className={cn(
                    "flex items-center px-3 py-6 text-foreground",
                    isActive ? "bg-secondary-200 hover:bg-secondary-300" : "",
                  )}
                >
                  <Link
                    href={link.href}
                    className="w-full text-nowrap"
                    scroll={false}
                  >
                    <link.icon className="size-5" />
                    {open && link.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
