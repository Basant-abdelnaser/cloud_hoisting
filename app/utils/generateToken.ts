import { serialize } from "cookie";

// set cookie
export function setCookie(token: string): string {
  // set cookie
  const cookie = serialize("token", token, {
    httpOnly: true, //mhdsh y2dar y3ml ta3deel 3la cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return cookie;
}
