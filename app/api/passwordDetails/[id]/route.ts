import { NextRequest, NextResponse } from "next/server";
import PasswordDetail from '../../../../models/passwordDetails'
import connectDB from '../../../../lib/mongodb'


connectDB()

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const reqBody = await request.json();
    const { encryptedData } = reqBody;
    if (!encryptedData) {
      return NextResponse.json({ error: 'encryptedData is missing' }, { status: 400 })
    }
    const newVault = new PasswordDetail({
      owner: id,
      encryptedData
    })
    const savedVault = await newVault.save()


    return NextResponse.json({
      message: "vault created successfully",
      success: true,
      savedVault
    })

  } catch (error) {
    console.log("post method error", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }

}

export async function GET(request: NextRequest) { //{ params }: { params: { id: string } }
  try {
    const path = request.nextUrl.pathname;
    const id = path.split("/").pop();
    const vaultDetails = await PasswordDetail.find({ owner: id })
    return NextResponse.json({ success: true, data: vaultDetails })

  } catch (error) {
    console.log("vault Details get method error ", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const reqBody = await request.json();
  const { encryptedData } = reqBody;

  if (!encryptedData) return NextResponse.json({ error: "No data provided" });

  try {
    const updated = await PasswordDetail.findByIdAndUpdate(id, { encryptedData }, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}


export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await context.params;
    const deletedItem = await PasswordDetail.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}