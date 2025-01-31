import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const groqAPI = process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!groqAPI) {
  throw new Error("Groq API Key is missing! Please set it in .env.local");
}

const groq = new Groq({
  apiKey: groqAPI,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const reply = await groq.chat.completions.create({
      messages: [{ role: "user", content: body.content }],
      model: "llama3-8b-8192",
    });

    return NextResponse.json({ response: reply.choices[0].message.content });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
