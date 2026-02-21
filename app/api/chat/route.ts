import type { NextRequest } from 'next/server';

import { gemini, chatMessageHistorySchema } from '@/lib/server';
import { streaming } from '@/lib/server';

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  console.log(data);

  const validation = chatMessageHistorySchema.safeParse(data);

  if (!validation.success) {
    return new Response('Invalid message history format.', { status: 400 });
  }

  const messages = validation.data;

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const chat = gemini.startChat({ history });
  const lastMessage = messages[messages.length - 1].content;

  const result = await chat.sendMessageStream(lastMessage);

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: streaming.headers,
  });
}
