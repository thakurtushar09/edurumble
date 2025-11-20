import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";
import { quizSchema } from "@/Schemas/quizSchema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI("");

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { topic, difficulty } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, message: "Missing topic" },
        { status: 400 }
      );
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
Difficulty: ${difficulty}
`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const quizText = result.response.text();
    const jsonStart = quizText.indexOf("{");
    const jsonEnd = quizText.lastIndexOf("}");
    const jsonString = quizText.slice(jsonStart, jsonEnd + 1);

    const parsed = quizSchema.safeParse({
      ...JSON.parse(jsonString),
      createdBy: new mongoose.Types.ObjectId(session.user._id),
      isLive: false,
      participants: [],
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newQuiz = new QuizModel(parsed.data);
    await newQuiz.save();
    const savedQuiz = await newQuiz.populate("createdBy");

    return NextResponse.json({ success: true, quiz: savedQuiz }, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json(
      { success: false, message: "Quiz creation failed." },
      { status: 500 }
    );
  }
}
