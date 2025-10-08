// import PasswordDetail from "@/models/passwordDetails";
// import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import PasswordDetail from '../../../../models/passwordDetails'
import connectDB from '../../../../lib/mongodb'


connectDB()

export async function POST (request: NextRequest, { params }: { params: { id: string } }){
    try{
          const  {id}  =await params;
        //   console.log("post method",id)
    const reqBody = await request.json();
    // console.log(reqBody)
    const {encryptedData} = reqBody;
    // console.log(encryptedData)
    if (!encryptedData) { 
    return NextResponse.json({ error: 'encryptedData is missing' }, { status: 400 })
    }
    const newVault = new PasswordDetail({
    owner:id,
    encryptedData})
    const savedVoult = await newVault.save()

    // console.log(newVault)
    // console.log(savedVoult)

    return NextResponse.json({
        message: "voult created successfully",
        success: true,
        savedVoult
    })

    }catch(error){
        console.log("post method error",error)
         return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }

}

export async function GET(request:NextRequest){ //{ params }: { params: { id: string } }
    try{
         const path = request.nextUrl.pathname; 
const id = path.split("/").pop(); 
    // const {id}= params;
    // console.log(id)
    const vaultDetails =  await PasswordDetail.find({owner:id})
    // console.log(vaultDetails)
    return NextResponse.json({success:true,data:vaultDetails})

    }catch(error){
        console.log("vault Details get method error ",error)
         return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

// module.exports = { passwordDetailsHandler }


    // if(reqBody.passwordDetails){
    //     const { title, username, password, url, notes } = reqBody.passwordDetails;

    // }else

    // const { title, username, password, url, notes } = reqBody;
    
    // console.log(title)
    // console.log(password)

    
        //         const path = request.nextUrl.pathname; 
// const id = path.split("/").pop(); 
    

    // const Title = await PasswordDetail.findOne({ title })

    // if (Title) {
    //     return NextResponse.json({ error: 'Title already exist' }, { status: 400 })
    // }

    // const newVoult = new PasswordDetail({
    //     title,
    //     username,
    //     password,
    //     url,
    //     notes
    // })

    
        
        

    // const savedVoult = await newVoult.save()