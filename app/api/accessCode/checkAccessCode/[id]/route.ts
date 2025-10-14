import { NextRequest, NextResponse } from "next/server";
import AccessCode from "@/models/accessCode";
import bcrypt from "bcryptjs";
import connectDB from "../../../../../lib/mongodb";


connectDB()


export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {

  try {
    const { id } = await context.params;
    const reqBody = await request.json();
    const { accessCode } = reqBody;

    const owner = await AccessCode.findOne({ owner: id })

    if (!owner) {
      return NextResponse.json({ error: 'owner does not exist' }, { status: 400 })
    }

    const validAccessCode = await bcrypt.compare(accessCode, owner.accessCode);
    if (!validAccessCode) {
      return NextResponse.json({ error: 'invalid password' }, { status: 400 })
    }

    return NextResponse.json({
      message: "code created successfully",
      success: true,
    })

  } catch (error) {
    console.log("post method error", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }

}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "id not found" }, { status: 400 })
    }

    const accessCode = await AccessCode.findOne({ owner: id })
    if (!accessCode) {
      return NextResponse.json({ message: "access code is not available ", success: false })
    }


    return NextResponse.json({ message: "access code matched ", success: true })
  } catch (error) {
    console.log("get accesscode error ", error)
    return NextResponse.json({ message: "something is wrong  ", success: false })
  }
}