"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoDiv from "./LogoDiv";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import {
  Bell,
  LogOut,
  MessageCircle,
  Plus,
  Search,
  Settings,
  LayoutPanelLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarClientProps {
  initialUser: User | null;
}

function NavbarClient({ initialUser }: NavbarClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const authUser = initialUser;
  const isUserManager = authUser?.userRole?.toLowerCase() === "manager";
  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 w-full z-45 shadow-xl">
      <div
        className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-background"
        style={{ minHeight: NAVBAR_HEIGHT }}
      >
        <div className="flex items-center gap-4 md:gap-6">
          {/* Dashboard Sidebar */}
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}

          {/* Logo Div */}
          <LogoDiv isTextForeground={false} />

          {/* Search/Add button */}
          {isDashboardPage && authUser && (
            <Button
              variant="secondary"
              className="flex items-center justify-start gap-2"
              onClick={() =>
                router.push(
                  isUserManager ? "/managers/new-property" : "/search",
                )
              }
            >
              {isUserManager ? (
                <>
                  <Plus className="size-4" />
                  <span className="hidden md:flex">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  <span className="hidden md:flex">Search Properties</span>
                </>
              )}
            </Button>
          )}
        </div>
        {!isDashboardPage && (
          <p className="text-background hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}
        <div className="flex items-center gap-5">
          {authUser ? (
            <>
              <div className="relative hidden md:flex group cursor-pointer">
                <MessageCircle className="size-6 text-background group-hover:text-primary-300" />
                <span className="absolute top-0 right-0 size-2 bg-secondary-700 rounded-full" />
              </div>
              <div className="relative hidden md:flex group cursor-pointer">
                <Bell className="size-6 text-background group-hover:text-primary-300" />
                <span className="absolute top-0 right-0 size-2 bg-secondary-700 rounded-full" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="group flex items-center gap-2 focus:outline-none cursor-pointer">
                  <Avatar>
                    {/* //TODO: add image to prisma.schema */}
                    {/* <AvatarImage src={authUser.userInfo?.image} /> */}
                    <AvatarFallback className="bg-primary-600 group-hover:bg-primary-500">
                      {authUser.userInfo?.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-background hidden md:flex group-hover:underline underline-offset-2">
                    {authUser.userInfo?.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-50 *:cursor-pointer font-bold *:flex *:items-center *:justify-start *:gap-2 *:pr-4 *:hover:bg-primary-100">
                  {/* Dashboard */}
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        isUserManager
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false },
                      )
                    }
                  >
                    <LayoutPanelLeft className="size-5" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                      )
                    }
                  >
                    <Settings className="size-5" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-secondary-700!"
                    onClick={handleSignOut}
                  >
                    <LogOut className="size-5 text-inherit" />
                    Sign Out
                  </DropdownMenuItem>
                  {/* Settings */}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="text-white border-white bg-trasparent hover:bg-white hover:text-primary-700 rounded-lg"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>

              <Button
                variant="secondary"
                className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                asChild
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarClient;
