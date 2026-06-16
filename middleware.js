import { NextResponse } from "next/server";

export async function middleware(request) {
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = 
    pathname.startsWith("/my-profile") || 
    /^\/products\/[^\/]+$/.test(pathname);

  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:id*", "/my-profile/:path*"],
};