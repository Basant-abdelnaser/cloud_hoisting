import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";
import { verifyTokenForPage } from "@/app/utils/verifyToken";

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

const Header = async () => {
  const token = (await cookies()).get("token")?.value;
  console.log("token", token);

  let user = null;
  if (token) {
    try {
      user = verifyTokenForPage(token!) as User;
      console.log("user", user);
    } catch (err) {
      console.log("Error fetching user:", err);
    }
  }
  return <HeaderClient user={user} />;
};

export default Header;
