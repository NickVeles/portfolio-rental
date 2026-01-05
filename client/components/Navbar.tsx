import { NAVBAR_HEIGHT } from "@/lib/constants";
import Link from "next/link";
import { Logo } from "./Icons";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-60 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="cursor-pointer" scroll={false}>
            {/* logo div */}
            <div className="group flex items-center gap-3 text-white">
              <Logo
                aria-label="VelRent Logo"
                role="img"
                className="size-6 group-hover:text-primary-300! "
              />
              <div className="text-xl font-bold group-hover:text-primary-300 ">
                VEL
                <span className="text-secondary-500 font-light group-hover:text-primary-300 ">
                  RENT
                </span>
              </div>
            </div>
          </Link>
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
