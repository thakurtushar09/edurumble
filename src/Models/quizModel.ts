import mongoose, { Schema, Document, Types } from "mongoose";

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

const questionSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

interface Participant {
  userId: Types.ObjectId;
  score: number;
  submittedAt: Date;
  answers: string[];
}

export interface Quiz extends Document {
  title: string;
  description: string;
  questions: Question[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  isLive: boolean;
  participants: Participant[];
  winner?: Types.ObjectId;
}

const quizSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  isLive: { type: Boolean, default: false },
  participants: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      score: { type: Number},
      submittedAt: { type: Date, default: Date.now },
      answers: { type: [String] },
    },
  ],
  winner: { type: Schema.Types.ObjectId, ref: "User", default: null },
});

export const QuizModel =
  mongoose.models.Quiz || mongoose.model<Quiz>("Quiz", quizSchema);

export const QuestionModel =
  mongoose.models.Question || mongoose.model<Question>("Question", questionSchema);
