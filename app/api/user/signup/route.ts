import User from "@/models/userModel";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { username, email, password } = reqBody;

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: 'user already exist' }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPass,
        })

        const savedUser = await newUser.save()

        const tokenData = {
            id: savedUser._id,
            username: username,
            email: email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "signup successfully",
            success: true,
            savedUser
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