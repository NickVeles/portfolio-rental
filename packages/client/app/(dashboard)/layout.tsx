import DashboardSidebar from "@/components/DashboardSidebar";
import Navbar from "@/components/Navbar";
import { getAuthenticatedUser } from "@/lib/amplify-server-utils";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();
  return (
    <div className="size-full">
      <Navbar />
      <main style={{ paddingTop: NAVBAR_HEIGHT }} className="flex">
        <DashboardSidebar userType={user?.userRole.toLowerCase()} />
        <div className="grow transition-all duration-300">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
