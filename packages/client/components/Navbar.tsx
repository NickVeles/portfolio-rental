import { getAuthenticatedUser } from "@/lib/amplify-server-utils";
import NavbarClient from "./NavbarClient";

async function Navbar() {
  const user = await getAuthenticatedUser();

  return <NavbarClient initialUser={user} />;
}

export default Navbar;
