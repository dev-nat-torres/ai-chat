'use server';

declare global {
  interface ChatMessage {
    id: string;
    message: string;
    type: string;
  }
}

export async function generateAnswer(payload: ChatMessage) {
  try {
    return {
      success: true,
      message: 'Generated answer successfully.',
      data: { ...payload, type: 'ai' },
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      message: 'An error occurred while generating the answer.',
    };
  }
}
