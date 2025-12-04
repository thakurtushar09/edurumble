import { QuizModel } from "@/Models/quizModel";
import { UserModel } from "@/Models/userModel";

export async function POST(req: Request) {
    const { userId, quizId } = await req.json();

    const userExist = await UserModel.findById(userId);
    if (!userExist) {
        return Response.json(
            { success: false, message: "User does not exist" },
            { status: 404 }
        );
    }

    const quizExist = await QuizModel.findById(quizId);
    if (!quizExist) {
        return Response.json(
            { success: false, message: "Quiz does not exist" },
            { status: 404 }
        );
    }

    if (!quizExist.createdBy.equals(userId)) {
        return Response.json(
            { success: false, message: "Unauthorized user" },
            { status: 401 }
        );
    }

    return Response.json(
        { success: true, message: "Here is your quiz" },
        { status: 200 }
    );
}
