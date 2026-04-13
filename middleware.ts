import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;
  // if (!authToken) {
  //   return NextResponse.json(
  //     { message: "No token provided , access denied " },
  //     { status: 401 },
  //   );
  // }

  if (authToken) {
    if (
      request.nextUrl.pathname.startsWith("/api/login") ||
      request.nextUrl.pathname.startsWith("/api/register")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
