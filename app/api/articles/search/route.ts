import { ARTICLE_PER_PAGE } from "@/app/utils/constants";
import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { ilike, like } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/****
 * @method GET
 * @route  ~/api/articles/search?q=value
 * @description Get articles by search query
 * @access Public
 */
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q") ?? "";

  try {
    if (!search.trim()) {
      const allArticles = await db.query.articles.findMany({
        limit: ARTICLE_PER_PAGE,
      });

      return NextResponse.json(allArticles);
    }

    const articlesBySearch = await db.query.articles.findMany({
      where: ilike(articles.title, `%${search}%`),
      limit: ARTICLE_PER_PAGE,
    });

    return NextResponse.json(articlesBySearch);
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}