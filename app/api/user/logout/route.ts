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
    }catch(error:any){
        console.log("logout error",error.message)
    }
    
}