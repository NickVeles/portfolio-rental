import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full">
      <Navbar />
      <main
        className={`size-full flex flex-col pt-[${NAVBAR_HEIGHT}px]`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
