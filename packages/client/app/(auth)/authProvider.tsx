"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LogoDiv from "@/components/LogoDiv";
import { usePathname, useRouter } from "next/navigation";

// https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const HeaderComponent = ({ isSignIn = false }: { isSignIn?: Boolean }) => (
  <View className="mt-4 mb-7">
    <Heading level={3} className="text-2xl! font-bold!">
      <LogoDiv />
    </Heading>
    <p className="text-muted-foreground mt-2">
      <span className="font-bold">Welcome!</span> Please sign{" "}
      {isSignIn ? "in" : "up"} to continue
    </p>
  </View>
);

const components = {
  SignIn: {
    Header() {
      return <HeaderComponent isSignIn />;
    },
    Footer() {
      const { toSignUp } = useAuthenticator();

      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              onClick={toSignUp}
              className="text-primary cursor-pointer hover:underline border-none p-0"
            >
              Sign up
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return <HeaderComponent />;
    },
    FormFields() {
      const { validationErrors } = useAuthenticator();
      const roleErrorMessage = validationErrors?.["custom:role"];

      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={roleErrorMessage}
            hasError={!!roleErrorMessage}
            className="*:cursor-pointer!"
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={toSignIn}
              className="text-primary cursor-pointer hover:underline border-none p-0"
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
  },
};

const services = {
  async validateCustomSignUp(formData: Record<string, string>) {
    const errors: Record<string, string> = {};
    const username = formData.username;

    if (username) {
      if (username.includes(" ")) {
        errors.username = "Username cannot contain spaces";
      } else if (!/^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u.test(username)) {
        errors.username =
          "Username can only contain letters, numbers, and special characters";
      }
    }

    return errors;
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(sign-in|sign-up)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  // Redirect auth users
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // Allow access to public pages without auth
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathname.includes("sign-up") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}
        services={services}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
