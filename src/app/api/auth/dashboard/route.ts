import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { AttemptedQuizModel } from "@/Models/attemptedQuizModel";
import { QuizModel } from "@/Models/quizModel";
import { z } from "zod";

const userIdSchema = z.object({
  userId: z.string().min(1, "userId is required"),
});

export async function POST(req: Request) {
  await dbConnect();

  try {
    // Validate request body
    const body = await req.json();
    const { userId } = userIdSchema.parse(body);

    // Step 1: Get all attempted quizzes
    const attempts = await AttemptedQuizModel.find({ user: userId })
      .sort({ attemptedAt: -1 })
      .lean();

    if (!attempts.length) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "No attempted quizzes found",
      });
    }

    // Step 2: Fetch quizzes for the attempt list
    const quizIds = attempts.map((a) => a.quiz);
    const quizzes = await QuizModel.find({ _id: { $in: quizIds } })
      .select("title description questions")
      .lean();

    // Step 3: Merge Attempt + Quiz Details
    const dashboardData = attempts.map((attempt) => {
      const quiz = quizzes.find((q) => String(q._id) === String(attempt.quiz));

      return {
        quizId: quiz?._id?.toString(),
        quizTitle: quiz?.title || "Unknown Quiz",
        quizDescription: quiz?.description || "",
        totalQuestions: quiz?.questions?.length || 0,
        score: attempt.score,
        attemptedAt: attempt.attemptedAt,
        correctAnswers: attempt.answers.filter(
          (a: { isCorrect: boolean }) => a.isCorrect
        ).length,
      };
    });

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error: any) {
    console.error("Error in /api/auth/dashboard:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
