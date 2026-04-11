import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

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
