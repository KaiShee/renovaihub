import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message } = payload;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Thanks, your message is received. We will contact you shortly.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}