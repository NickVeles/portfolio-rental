"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import StoreProvider from "../state/redux";
import Auth from "./(auth)/authProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <Auth>
          <SidebarProvider>{children}</SidebarProvider>
        </Auth>
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default Providers;
