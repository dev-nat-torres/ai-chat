import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { env } from '@/lib/server/env';

export const chatMessageSchema = z.object({
  role: z.string().trim(),
  content: z.string().trim(),
});

export const chatMessageHistorySchema = z.array(chatMessageSchema);

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatMessageHistory = z.infer<typeof chatMessageHistorySchema>;

const genAi = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const gemini = genAi.getGenerativeModel({ model: env.GEMINI_MODEL });
