import { User } from "@/app/components/header/Header";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ArticleEditForm from "./ArticleEditForm";
interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const token = (await cookies()).get("token")?.value;
  console.log("token from admin", token);
  if (!token || token === "undefined") {
    return redirect("/");
  }
  const user = jwtDecode(token!) as User;
  if (!user.isAdmin) {
    redirect("/");
  }
  console.log("id", id);
  console.log("params", params);
  return <ArticleEditForm id={id} />;
};

export default page;
