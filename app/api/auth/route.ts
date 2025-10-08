
import {NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request:NextRequest) {
  const token = request.cookies.get("generator-token")?.value || '';

  if (!token) {
    return NextResponse.json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
    return await NextResponse.json({
      isLoggedIn: true,
      user: decoded, // this contains username, email, id, etc.
    });
  } catch (error:unknown) {
    return NextResponse.json({message:"token related issue", isLoggedIn: false });
  }
}
