// models/AttemptedQuiz.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface AnswerRecord {
  questionId: Types.ObjectId;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface AttemptedQuiz extends Document {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  answers: AnswerRecord[];
  score: number;
  attemptedAt: Date;
}

const answerRecordSchema = new Schema<AnswerRecord>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true }, // <- ref
    selectedAnswer: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const attemptedQuizSchema = new Schema<AttemptedQuiz>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    answers: { type: [answerRecordSchema], default: [] },
    score: { type: Number, default: 0 },
    attemptedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


export const AttemptedQuizModel =
  mongoose.models.AttemptedQuiz ||
  mongoose.model<AttemptedQuiz>("AttemptedQuiz", attemptedQuizSchema);
