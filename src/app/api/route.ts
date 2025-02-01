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
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: body.content }],
    });

    return NextResponse.json({ response: reply.choices[0].message.content });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Groq API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
