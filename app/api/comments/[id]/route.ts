import { verifyToken } from "@/app/utils/verifyToken";
import { db } from "@/lib/db";
import { comments } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
/****
 * @method PUT
 * @route  ~/api/comments/:id
 * @description update comment
 * @access Private (only user can edit his comment)
 */

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await request.json()) as { text: string };
  try {
    const comment = await db
      .select()
      .from(comments)
      .where(eq(comments.id, Number(id)));
    if (comment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }
    const userFromToken = verifyToken(request);
    if (userFromToken !== null && comment[0].userId !== userFromToken.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    await db
      .update(comments)
      .set(body)
      .where(eq(comments.id, Number(id)));

    return NextResponse.json(
      { message: "Comment updated successfully" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

/****
 * @method DELETE
 * @route  ~/api/comments/:id
 * @description Delete comment
 * @access Private (only user or admin can delete his comment)
 */

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const comment = await db
      .select()
      .from(comments)
      .where(eq(comments.id, Number(id)));
    if (comment.length === 0) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "no token provided , access denied" },
        { status: 401 },
      );
    }

    if (comment[0].userId !== user.id) {
      if (!user.isAdmin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
      }
      await db.delete(comments).where(eq(comments.id, Number(id)));
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 },
      );
    }
    await db.delete(comments).where(eq(comments.id, Number(id)));
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 },
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
 * @route  ~/api/comments/:id
 * @description GET comment BY Id
 * @access PUPLIC
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    // const comment = await db
    //   .select()
    //   .from(comments)
    //   .where(eq(comments.id, Number(id)));
    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, Number(id)),
      with: {
        user: {
          columns: {
            username: true,
            id: true,
          },
        },
      },
    });
    if (!comment)
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    return NextResponse.json(comment, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
