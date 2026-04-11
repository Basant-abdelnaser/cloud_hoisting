import { NextRequest, NextResponse } from "next/server";

import { Article } from "@/app/utils/interfaces";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/app/utils/verifyToken";

interface UpdatedArticle {
  title?: string;
  body?: string;
}

/****
 * @method GET
 * @route  ~/api/articles/:id
 * @description Get article by id
 * @access Public
 */

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));
  if (article.length === 0) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(article, { status: 200 });
}

/**
 * @method PUT
 * @route  ~/api/articles/:id
 * @description Update article by id
 * @access Private (only admin can update article)
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const user = verifyToken(request);
  if (!user || !user.isAdmin) {
    return NextResponse.json({ message: "UnAuthorised" }, { status: 403 });
  }
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));
  if (article.length === 0) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  const updatedArticle = (await request.json()) as UpdatedArticle;

  await db
    .update(articles)
    .set(updatedArticle)
    .where(eq(articles.id, Number(id)));

  const newArticle = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));

  return NextResponse.json(
    { message: "Article updated successfully", data: newArticle },
    { status: 200 },
  );
}

/**
 * @method DELETE
 * @route  ~/api/articles/:id
 * @description Delete article by id
 * @access Private (only admin can update article)
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const user = verifyToken(request);
  if (!user || !user.isAdmin) {
    return NextResponse.json({ message: "UnAuthorised" }, { status: 403 });
  }
  const article = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)));
  if (article.length === 0) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }
  await db.delete(articles).where(eq(articles.id, Number(id)));

  return NextResponse.json(
    { message: "Article deleted successfully" },
    { status: 200 },
  );
}
