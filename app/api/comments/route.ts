import { verifyToken } from "@/app/utils/verifyToken";
import { db } from "@/lib/db";
import { comments } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
/****
 * @method POST
 * @route  ~/api/comments
 * @description Add new comment
 * @access Private (only logged in user can add new comment)
 */

interface CommentBody {
  text: string;
  articleId: number;
}
export const createCommentSchema = z.object({
  text: z.string(),
  articleId: z.number(),
});
export async function POST(request: NextRequest) {
  // client will give text , articleId
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "only logged in user can add new comment" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as CommentBody;
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const newComment = {
      text: body.text,
      articleId: body.articleId,
      userId: user.id,
    };

    await db.insert(comments).values(newComment);
    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/****
 * @method GET
 * @route  ~/api/comments
 * @description Get all comments
 * @access Private (only Admin can get all comments)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "UnAuthorised" }, { status: 403 });
    }
    const allComments = await db.select().from(comments);
    return NextResponse.json(allComments, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
