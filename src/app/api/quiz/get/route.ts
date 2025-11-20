import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const quiz = await QuizModel.findById(id).populate('createdBy');

    if (!quiz) {
      return NextResponse.json(
        { success: false, message: "Quiz does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        quiz,
        message: "Here is the quiz",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { success: false, message: "Error in getting quiz" },
      { status: 500 }
    );
  }
}
