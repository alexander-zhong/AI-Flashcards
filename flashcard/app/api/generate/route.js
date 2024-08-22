import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format and make the output STRICT JSON format without additional text (IMPORTANT):
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  const data = await req.text();

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `${systemPrompt} and this is user input ${data}`
    );

    const jsonObject = JSON.parse(result.response.text());

    return NextResponse.json(jsonObject);
  } catch (err) {
    return NextResponse(JSON.stringify({ error: "Internal Error" }), {
      status: 500,
    });
  }
}
