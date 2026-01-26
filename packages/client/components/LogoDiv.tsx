import Link from "next/link";
import { Logo } from "./Icons";

interface LogoDivProps {
  isTextForeground?: Boolean;
}

const LogoDiv = ({ isTextForeground = true }: LogoDivProps) => (
  <Link href="/" className="cursor-pointer" scroll={false}>
    {/* logo div */}
    <div className={`group flex items-center gap-3 ${isTextForeground? "text-foreground" : "text-background"}`}>
      <Logo
        aria-label="VelRent Logo"
        role="img"
        className="size-6 group-hover:text-primary-300!"
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
