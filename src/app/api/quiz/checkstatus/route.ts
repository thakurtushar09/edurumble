import dbConnect from "@/lib/dbConnect";
import { QuizModel } from "@/Models/quizModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { quizId } = await req.json();

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) {
      return Response.json(
        {
          success: false,
          message: "Quiz does not exist",
        },
        { status: 404 }
      );
    }

    if (!quiz.isLive) {
      return Response.json(
        {
          success: false,
          message: "Quiz is not live now",
        },
        { status: 403 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Quiz is live",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `message: ${error}`,
      },
      { status: 500 }
    );
  }
}
