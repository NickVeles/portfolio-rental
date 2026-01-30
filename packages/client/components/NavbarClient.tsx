"use client";

import { NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoDiv from "./LogoDiv";
import { usePathname, useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import UserButton from "./UserButton";

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

  return (
    <div className="fixed top-0 left-0 w-full z-45 shadow-xl">
      <div
        className="flex justify-between items-center w-full py-3 px-4 bg-primary-700 text-background"
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
            <>
              <Separator orientation="vertical" style={{ height: 24 }} />
              <Button
                variant="outline"
                className="text-foreground size-9 md:w-auto flex items-center justify-center gap-2 cursor-pointer"
                onClick={() =>
                  router.push(
                    isUserManager ? "/managers/new-property" : "/search",
                  )
                }
              >
                {isUserManager ? (
                  <>
                    <Plus className="size-5" />
                    <span className="hidden md:flex">Add New Property</span>
                  </>
                ) : (
                  <>
                    <Search className="size-5" />
                    <span className="hidden md:flex">Search Properties</span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>
        {!isDashboardPage && (
          <p className="text-background hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}
        <div className="flex items-center gap-5">
          {authUser ? (
            <UserButton user={authUser} />
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
