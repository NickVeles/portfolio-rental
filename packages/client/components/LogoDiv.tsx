import Link from "next/link";
import { Logo } from "./Icons";

const LogoDiv = () => (
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
);

export default LogoDiv;
