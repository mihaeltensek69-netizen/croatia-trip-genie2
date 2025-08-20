import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("OpenAI error:", res.status, txt);
      return NextResponse.json({ role: "assistant", content: "Chat service error. Check your API key." }, { status: 500 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message || {
      role: "assistant",
      content: "Sorry, I couldn't generate a reply.",
    };
    return NextResponse.json(reply);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ role: "assistant", content: "Server error." }, { status: 500 });
  }
}