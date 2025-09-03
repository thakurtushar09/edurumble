import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";
import { quizSchema } from "@/Schemas/quizSchema";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyABhvvH20rftIIhQSmN8wGutGZMDLp4Myo");

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { topic,difficulty, createdBy } = body;

    if (!topic || !createdBy) {
      return NextResponse.json({ success: false, message: "Missing topic or creator ID." }, { status: 400 });
    }

    const prompt = `
You are an AI quiz generator. Given a topic, generate a quiz in valid JSON format like this:

{
  "title": "Quiz Title",
  "description": "Brief description",
  "questions": [
    {
      "question": "What is ...?",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct Option"
    }
  ]
}

Rules:
- Generate exactly 5 questions.
- Each question must have 4 options.
- Answers must match one of the options.
- Return JSON only.

Topic: ${topic}
Difficulty:${difficulty}
`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const quizText = result.response.text();
    const jsonStart = quizText.indexOf("{");
    const jsonEnd = quizText.lastIndexOf("}");
    const jsonString = quizText.slice(jsonStart, jsonEnd + 1);

    const parsed = quizSchema.safeParse({
      ...JSON.parse(jsonString),
      createdBy,
      isLive: false,
      participants: [],
    });

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.flatten() }, { status: 400 });
    }

    const newQuiz = new QuizModel(parsed.data);
    await newQuiz.save();

    return NextResponse.json({ success: true, quiz: newQuiz }, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ success: false, message: "Quiz creation failed." }, { status: 500 });
  }
}
