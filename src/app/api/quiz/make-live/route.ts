import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();

    const quiz = await QuizModel.findById(id);
    if (!quiz) {
      return Response.json(
        {
          success: false,
          message: "Quiz not found",
        },
        { status: 404 }
      );
    }

    await QuizModel.findByIdAndUpdate(id, { isLive: true });

    return Response.json({
      success: true,
      message: "Quiz is now live!",
    });
  } catch (error) {
    console.error("Error making quiz live:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
