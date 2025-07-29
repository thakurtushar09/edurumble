import { z } from "zod";
import { questionSchema } from "./questionSchema";

export const participantSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  score: z.number().nonnegative("Score must be a positive number"),
  submittedAt: z.date(),
  answers: z.array(z.string()).min(1, "At least one answer is required"),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  createdBy: z.string().min(1, "Creator ID is required"),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  isLive: z.boolean().default(false),
  participants: z.array(participantSchema).optional().default([]),
  winner: z.string().optional(), 
});
