import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";
import { UserModel } from "@/Models/userModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { quizId, userId } = await req.json();

    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });
    }

    if (!quiz.participants.includes(user._id)) {
      quiz.participants.push(user._id);
      await quiz.save();
    }

    const updatedQuiz = await QuizModel.findById(quizId)
  .populate("participants.userId", "name email"); 


    return NextResponse.json({ success: true, quiz: updatedQuiz });
  } catch (error) {
    console.error("Error adding participant:", error);
    return NextResponse.json({ success: false, message: "Failed to add participant" }, { status: 500 });
  }
}
