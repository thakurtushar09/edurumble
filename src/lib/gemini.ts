import { GoogleGenerativeAI } from "@google/generative-ai";

export type GeminiModel =
  | ReturnType<GoogleGenerativeAI["getGenerativeModel"]>
  | {
      generate?: (args: any) => Promise<any>;
      generateText?: (args: any) => Promise<any>;
      generateContent?: (args: any) => Promise<any>;
    };

export function getGeminiModel(modelName: string): GeminiModel {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  return genAI.getGenerativeModel({ model: modelName }) as GeminiModel;
}
