import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

/**
 * @route GET /api/users/logout
 * @description logout user
 * @access Private
 */

export async function GET() {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete("token");

    return NextResponse.json(
      { message: "Logout successfully" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
