import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createAuthClient } from "better-auth/client";

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/auth",
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  const isAuthenticated = !!session;

  // Protected Routes
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
