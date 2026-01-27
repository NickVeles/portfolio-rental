import { AuthUser } from "aws-amplify/auth";
import { Manager, Tenant } from "@portfolio-rental/shared";
import { MotionProps as OriginalMotionProps } from "framer-motion";

declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}

declare global {
  interface User {
    cognitoInfo: AuthUser;
    userInfo: JsonObject | JsonPrimitive | JsonArray;
    userRole: Tenant | Manager;
  }
}

export {};
