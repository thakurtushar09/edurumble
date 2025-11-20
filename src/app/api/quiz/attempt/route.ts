import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Question, Quiz, QuizModel } from "@/Models/quizModel";
import { UserModel } from "@/Models/userModel";
import { AttemptedQuizModel } from "@/Models/attemptedQuizModel";
import { questionSchema } from "@/Schemas/questionSchema";
import { quizSchema } from "@/Schemas/quizSchema";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { quizId, userId, answers } = body;

    if (!quizId || !userId || !Array.isArray(answers)) {
      return NextResponse.json(
        { success: false, message: "quizId, userId and answers are required" },
        { status: 400 }
      );
    }


    const quiz = await QuizModel.findById(quizId).lean<Quiz>();
    if (!quiz) {
      return NextResponse.json({ success: false, message: "Quiz not found" }, { status: 404 });
    }

    let score = 0;
    const processedAnswers = answers
      .map((ans: any) => {
       
        const q:any= quiz.questions.find((qq: any) => qq._id.toString() === ans.questionId);
        if (!q) return null;

        const isCorrect = q.answer === ans.selected;
        if (isCorrect) score++;

        return {
          questionId: q._id,
          selectedAnswer: ans.selected,
          correctAnswer: q.answer,
          isCorrect,
        };
      })
      .filter(Boolean);

    // create attempt (new document each time)
    const attempt = await AttemptedQuizModel.create({
      user: userId,
      quiz: quizId,
      answers: processedAnswers,
      score,
      attemptedAt: new Date(),
    });

    // push attempt into user's attemptedQuizzes
    await UserModel.findByIdAndUpdate(userId, { $push: { attemptedQuizzes: attempt._id } });

    // populate for response
    const populated = await AttemptedQuizModel.findById(attempt._id)
      .populate("user", "username fullname email")
      .populate("quiz", "title description")
      .populate("answers.questionId", "question options answer");

    return NextResponse.json({ success: true, attempt: populated });
  } catch (err: any) {
    console.error("Error saving attempt:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
