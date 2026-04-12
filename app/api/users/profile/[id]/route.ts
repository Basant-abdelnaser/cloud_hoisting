import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { articles, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/app/utils/verifyToken";

/****
 * @method DELETE
 * @route  ~/api/users/profile/:id
 * @description delete user
 * @access Private (Only user can delete their profile)
 */

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  //   check authorization
  //   const authToken = request.headers.get("authToken");
  const userFromToken = verifyToken(request);

  const userFromDb = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));
  if (userFromDb.length === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (userFromToken !== null && userFromDb[0].id !== userFromToken.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
  await db.delete(users).where(eq(users.id, Number(id)));

  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 },
  );
}

/****
 * @method GET
 * @route  ~/api/users/profile/:id
 * @description get user profile
 * @access Private (Only user can get their profile)
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)));

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);

    if (userFromToken !== null && user[0].id !== userFromToken.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const { password, ...rest } = user[0];
    return NextResponse.json({ rest }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}

/****
 * @method PUT
 * @route  ~/api/users/profile/:id
 * @description update user profile
 * @access Private (Only user can update their profile)
 */

const updateUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = await request.json();

  if (Object.keys(body).length === 0) {
    return NextResponse.json(
      { message: "No data provided to update" },
      { status: 400 },
    );
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));

  if (user.length === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const validation = updateUserSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 },
    );
  }

  const data = validation.data;

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const userFromToken = verifyToken(request);

  if (!userFromToken || user[0].id !== userFromToken.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const updatedUser = await db
    .update(users)
    .set(data)
    .where(eq(users.id, Number(id)))
    .returning();

  const { password, ...rest } = updatedUser[0];

  return NextResponse.json(
    { message: "User updated successfully", data: rest },
    { status: 200 },
  );
}