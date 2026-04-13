import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { ARTICLE_PER_PAGE } from "@/app/utils/constants";
import { verifyToken } from "@/app/utils/verifyToken";

/****
 * @method POST
 * @route  ~/api/articles
 * @description Create article
 * @access Private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  const articleSchema = z.object({
    title: z.string().min(2).max(200),
    description: z.string().min(10).max(1000),
  });

  const validation = articleSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 },
    );
  }
  const user = verifyToken(request);
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "UnAuthorised" }, { status: 403 });
  }

  let newArticle;
  try {
    newArticle = await db
      .insert(articles)
      .values({
        title: validation.data.title,
        description: validation.data.description,
      })
      .returning();
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  return NextResponse.json(
    { message: "Article created successfully", data: newArticle },
    { status: 201 },
  );
}

/****
 * @method GET
 * @route  ~/api/articles
 * @description Get articles by page number
 * @access Public
 */
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page") || "1";
  const pageNum = Number(page);
  const offset = (pageNum - 1) * ARTICLE_PER_PAGE;

  let data;
  try {
    data = await db.query.articles.findMany({
      limit: ARTICLE_PER_PAGE,
      offset,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  return Response.json(data);
}
