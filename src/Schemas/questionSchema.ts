import { z } from "zod";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string())
    .min(2, "At least 2 options are required")
    .max(6, "No more than 6 options"),
  answer: z.string().min(1, "Answer is required"),
});
