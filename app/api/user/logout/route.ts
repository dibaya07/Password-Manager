import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = NextResponse.json({
            message:"logout successful",
            success:true,
        })
        response.cookies.set('generator-token',"",{
            httpOnly:true,expires: new Date(0)
        })
        return response;
    }catch (error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
}
    
}