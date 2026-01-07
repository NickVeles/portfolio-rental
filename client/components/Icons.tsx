import { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 8.467 8.467"
    {...props}
  >
    <path
      d="M4.233.53.53 4.232h1.323l2.381-2.38 2.382 2.38h1.322L4.233.53zm3.704 3.703L4.233 7.937h3.704V4.233zM4.233 7.937.53 4.233v3.704h3.704zm2.382-3.704H5.292L4.233 3.175 3.175 4.233H1.852l2.381 2.382 2.382-2.382z"
      style={{
        fill: "currentColor",
        strokeWidth: 0.79374999,
        strokeMiterlimit: 4.5,
        stroke: "none",
        strokeOpacity: 1,
        strokeDasharray: "none",
        strokeLinejoin: "bevel",
        paintOrder: "stroke fill markers",
      }}
    />
  </svg>
);
