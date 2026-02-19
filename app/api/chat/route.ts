import type { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { message } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const fakeResponse = `You said: "${message}". This is a simulated streaming response from the server.`;

      const words = fakeResponse.split(' ');

      for (const word of words) {
        // simulate AI delay
        await new Promise((r) => setTimeout(r, 120));

        controller.enqueue(encoder.encode(word + ' '));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
};
