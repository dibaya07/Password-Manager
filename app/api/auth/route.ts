
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("generator-token")?.value || '';

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    return await NextResponse.json({
      isLoggedIn: true,
      user: decoded,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, isLoggedIn: false }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
