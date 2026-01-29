import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function getUserRoleFromCookies(request: NextRequest): string | null {
  // Amplify stores the ID token in a cookie with this pattern
  const cookies = request.cookies.getAll();
  const idTokenCookie = cookies.find(
    (cookie) =>
      cookie.name.includes("idToken") ||
      cookie.name.includes("CognitoIdentityServiceProvider") &&
        cookie.name.includes("idToken")
  );

  if (!idTokenCookie) return null;

  const payload = decodeJwtPayload(idTokenCookie.value);
  if (!payload) return null;

  return (payload["custom:role"] as string) || null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = getUserRoleFromCookies(request);

  // If no role found, let the auth provider handle it
  if (!userRole) {
    return NextResponse.next();
  }

  // Managers trying to access tenant routes
  if (pathname.startsWith("/tenants") && userRole === "manager") {
    return NextResponse.redirect(new URL("/managers/properties", request.url));
  }

  // Tenants trying to access manager routes
  if (pathname.startsWith("/managers") && userRole === "tenant") {
    return NextResponse.redirect(new URL("/tenants/favorites", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/managers/:path*", "/tenants/:path*"],
};
