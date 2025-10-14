import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import AccessCode from "@/models/accessCode";
import bcrypt from "bcryptjs";


connectDB()


export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await context.params;
    const reqBody = await request.json();
    const { accessCode } = reqBody;

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(accessCode, salt)
    const newCode = new AccessCode({
      owner: id,
      accessCode: hashPass
    })
    const savedCode = await newCode.save()


    return NextResponse.json({
      message: "code created successfully",
      success: true,
      savedCode
    })

  } catch (error) {
    console.log("post method error", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }

}