import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer (for processing)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("File received:", file.name);

    // 👉 For now just return success
    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}