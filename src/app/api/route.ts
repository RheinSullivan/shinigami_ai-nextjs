import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groqAPI = process.env.GROQ_API_KEY; // Ganti dengan variabel yang tidak diekspos ke publik

if (!groqAPI) {
  console.error("Groq API Key is missing! Please set it in Vercel Environment Variables.");
  throw new Error("Internal Server Error"); // Ubah agar error tidak mengungkapkan informasi sensitif
}

const groq = new Groq({ apiKey: groqAPI });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const reply = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: body.content }],
    });

    return NextResponse.json({ response: reply.choices[0].message.content });
  } catch (error: unknown) {
    console.error("API Error:", error instanceof Error ? error.message : "Unknown Error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 }); // Jangan tampilkan error asli ke frontend
  }
}
