import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;
  if (!authToken) {
    return NextResponse.json(
      { message: "No token provided , access denied " },
      { status: 401 },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
