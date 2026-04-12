import { NextRequest, NextResponse } from "next/server";
/****
 * @method GET
 * @route  ~/api/me
 * @description  gets user token
 * @access Public
 */

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("token")?.value;
  if (!authToken) {
    return NextResponse.json(
      { message: "No token provided , access denied " },
      { status: 401 },
    );
  }
  return NextResponse.json({ token: authToken }, { status: 200 });
}
