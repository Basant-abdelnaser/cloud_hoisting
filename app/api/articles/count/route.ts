import { db } from "@/lib/db";
import { articles } from "@/lib/schema";
import { NextResponse } from "next/server";

/****
 * @method GET
 * @route  ~/api/articles/count
 * @description Get articles count
 * @access Public
 */

export async function GET() {
  try {
    const count = (await db.select().from(articles)).length;
    return NextResponse.json({ count }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
