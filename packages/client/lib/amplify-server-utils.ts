import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
        userPoolClientId:
          process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
      },
    },
  },
});

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    return await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        try {
          const session = await fetchAuthSession(contextSpec);
          const { idToken } = session.tokens ?? {};

          if (!idToken) {
            return null;
          }

          const user = await getCurrentUser(contextSpec);
          const userRole = idToken.payload["custom:role"] as string;

          const endpoint =
            userRole === "manager"
              ? `/managers/${user.userId}`
              : `/tenants/${user.userId}`;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
              cache: "no-store",
            },
          );

          if (!response.ok) {
            // User not found in database yet
            return null;
          }

          const userInfo = await response.json();

          return {
            cognitoInfo: { ...user },
            userInfo,
            userRole,
          };
        } catch {
          return null;
        }
      },
    });
  } catch {
    return null;
  }
}
