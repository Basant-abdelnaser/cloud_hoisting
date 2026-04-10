import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";

/****
 * @method POST
 * @route  ~/api/articles
 * @description Create article
 * @access Public
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
 * @description Get all articles
 * @access Public
 */
export async function GET() {
  let data;
  try {
    data = await db.select().from(articles);
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  return Response.json(data);
}
