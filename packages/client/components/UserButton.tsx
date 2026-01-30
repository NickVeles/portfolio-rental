"use client";

import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import {
  LogOut,
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

interface UserButtonProps {
  user: User;
}

function UserButton({ user }: UserButtonProps) {
  const router = useRouter();
  const isUserManager = user.userRole?.toLowerCase() === "manager";

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex items-center gap-2 focus:outline-none cursor-pointer">
        <Avatar>
          {/* //TODO: add image to prisma.schema */}
          {/* <AvatarImage src={user.userInfo?.image} /> */}
          <AvatarFallback className="bg-primary-600 group-hover:bg-primary-500">
            {user.userInfo?.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="text-background hidden md:flex group-hover:underline underline-offset-2">
          {user.userInfo?.name}
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 *:cursor-pointer font-bold *:flex *:items-center *:justify-start *:gap-2 *:pr-4 *:hover:bg-primary-100">
        {/* Dashboard */}
        <DropdownMenuItem
          onClick={() =>
            router.push(
              isUserManager ? "/managers/properties" : "/tenants/favorites",
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
            router.push(`/${user.userRole?.toLowerCase()}s/settings`)
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
