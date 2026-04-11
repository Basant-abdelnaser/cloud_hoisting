import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { setCookie } from "@/app/utils/generateToken";

/**
 * @route POST /api/users/login
 * @description login user
 * @access Public
 */

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    // check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      // check pass
      const user = existingUser[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      // create token
      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "3d" },
      );

      // set cookie
      const cookie = setCookie(token);

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { message: "login successfully" },
        { status: 200, headers: { "Set-Cookie": cookie } },
      );
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
