import User from "@/models/userModel";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: 'user does not exist' }, { status: 400 })
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'invalid password' }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "login successfully",
            success: true
        })
        response.cookies.set("generator-token", token, { httpOnly: true })
        return response;

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
    }

}

