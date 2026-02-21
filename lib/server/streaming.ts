export const streaming = {
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-cache',
  },
  text: (content: string) =>
    new ReadableStream({
      async start(controller) {
        const chunks = content.split(' ');

        for (const chunk of chunks) {
          await new Promise((resolve) => setTimeout(resolve, 240));

          controller.enqueue(`${chunk} `);
        }

        controller.close();
      },
    }),
};
