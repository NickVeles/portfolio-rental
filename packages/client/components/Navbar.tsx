import { NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import LogoDiv from "./LogoDiv";

function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-60 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <LogoDiv isTextForeground={false} />
        </div>
        <p className="text-primary-200 hidden md:block">
          Discover your perfect rental apartment with our advanced search
        </p>
        <div className="flex items-center gap-5">
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
