import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

// verify token for api
export function verifyToken(request: NextRequest): JwtPayload | null {
  try {
    const authToken = request.cookies.get("token")?.value;
    //go to middleware
    const userFromToken = jwt.verify(
      authToken!,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    return userFromToken;
  } catch (error) {
    return null;
  }
}

// verify token for page
export function verifyTokenForPage(token: string): JwtPayload | null {
  try {
    const userFromToken = jwt.verify(
      token!,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (!userFromToken) return null;

    return userFromToken;
  } catch (error) {
    return null;
  }
}
