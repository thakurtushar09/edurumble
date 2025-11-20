import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";
import { AttemptedQuizModel } from "@/Models/attemptedQuizModel";
import { QuizModel } from "@/Models/quizModel";
import { UserModel } from "@/Models/userModel";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const quizId = body.quizId ?? body.id;
    const userId = body.userId;

    if (
      !quizId ||
      !userId ||
      !mongoose.isValidObjectId(quizId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid IDs" },
        { status: 400 }
      );
    }

    const quiz = await QuizModel.findById(quizId).lean().exec();
    if (!quiz)
      return NextResponse.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );

    const user = await UserModel.findById(userId).lean().exec();
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const attempt = await AttemptedQuizModel.findOne({
      quiz: quizId,
      user: userId,
    })
      .lean()
      .exec();

    if (!attempt)
      return NextResponse.json(
        { success: false, message: "No attempt found" },
        { status: 404 }
      );

    // ---------------------------
    // Gemini Prompt
    // ---------------------------
    const modelName = "gemini-2.5-pro";
    const model = getGeminiModel(modelName);

    const prompt = `
You analyze ONE quiz attempt and output ONLY valid JSON following the SCHEMA below.

Keep all strings <= 140 chars.
If percent == 100, include "advancedPath".
If topic cannot be inferred, use "general review".

SCHEMA:
{
  "summary": string,
  "score": { "correct": int, "total": int, "percent": number },
  "strengths": [ { "questionId": string, "note": string } ],
  "weaknesses": [
    {
      "questionId": string,
      "selectedAnswer": string,
      "correctAnswer": string,
      "inferredTopic": string,
      "shortTip": string,
      "recommendedExercises": [ string ]
    }
  ],
  "studyPlan7Days": [
    { "day": int, "task": string, "durationMin": int }
  ],
  "nextSteps": [ string ],
  "confidence": string,
  "advancedPath": null | {
    "suggestedTopics": [ string ],
    "projects": [ string ],
    "timeEstimateWeeks": int
  }
}

ANALYZE_ATTEMPT_JSON:
${JSON.stringify({ attempt })}
`;

    // ---------------------------
    // Safe multi-version generation
    // ---------------------------
    let rawResponse;

    if ("generateContent" in model && typeof model.generateContent === "function") {
      rawResponse = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      });
    } else if ("generate" in model && typeof model.generate === "function") {
      rawResponse = await model.generate({
        text: prompt,
        temperature: 0.2,
      });
    } else if ("generateText" in model && typeof model.generateText === "function") {
      rawResponse = await model.generateText({
        text: prompt,
        temperature: 0.2,
      });
    } else {
      throw new Error("No supported Gemini generation method found");
    }

    // ---------------------------
    // Extract text safely
    // ---------------------------
    let text: string | null = null;

    try {
      if (rawResponse?.response?.text) {
        const t = rawResponse.response.text();
        text = t instanceof Promise ? await t : t;
      }
    } catch {}

    if (!text && rawResponse?.output?.[0]?.content) {
      for (const section of rawResponse.output[0].content) {
        if (typeof section.text === "string") {
          text = section.text.trim();
          break;
        }
      }
    }

    if (!text && rawResponse?.text) text = rawResponse.text;
    if (!text && rawResponse?.response?.outputText)
      text = rawResponse.response.outputText;

    if (!text) text = JSON.stringify(rawResponse);

    text = text.trim();

    // ---------------------------
    // Ensure valid JSON
    // ---------------------------
    let report: any = null;
    try {
      report = JSON.parse(text);
    } catch {
      const s = text.indexOf("{");
      const e = text.lastIndexOf("}");
      if (s !== -1 && e !== -1 && e > s) {
        try {
          report = JSON.parse(text.slice(s, e + 1));
        } catch {}
      }
    }

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to parse AI response as JSON",
          modelText: text,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, attempt, report },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
