"use client";

import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import {
  LogOut,
  Settings,
  LayoutPanelLeft,
  CircleUser,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Capitalize, cn } from "@/lib/utils";

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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50">
        <DropdownMenuLabel className="pl-4">
          <p className="text-lg">{user.userInfo?.name}</p>
          <p className="inline-flex items-center gap-1">
            <CircleUser
              className={cn(
                "size-4",
                isUserManager ? "text-secondary-700" : "text-primary-700",
              )}
            />
            {Capitalize(user.userRole)}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="*:cursor-pointer font-bold *:flex *:items-center *:justify-start *:gap-2 *:pr-4 *:hover:bg-primary-100">
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
