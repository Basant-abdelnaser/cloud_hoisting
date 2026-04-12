import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function getUserFromServer() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded;
}
