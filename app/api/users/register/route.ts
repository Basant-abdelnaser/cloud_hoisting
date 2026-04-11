import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "@/app/utils/generateToken";
/**
 * @route POST /api/users/register
 * @description Create new user
 * @access Public
 */

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, username, password } = result.data;

    // check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.insert(users).values({
      email,
      username,
      password: hashedPassword,
    });

    // getuserfromdb
    const user = await db.select().from(users).where(eq(users.email, email));

    // create token

    const token = jwt.sign(
      { id: user[0].id, isAdmin: user[0].isAdmin, username: user[0].username },
      process.env.JWT_SECRET!,
      { expiresIn: "3d" },
    );

    // set cookie
    const cookie = setCookie(token);

    return NextResponse.json(
      {
        message: "User created successfully",
        data: { email, username },
      },
      { status: 201, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
