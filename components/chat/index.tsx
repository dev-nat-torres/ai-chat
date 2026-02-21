'use client';

import type { ChatMessageHistory } from '@/lib/server';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/client';

import { PaperclipIcon, SendHorizontalIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';
import { ChatLoadingIndicator } from '@/components/chat/loading';

export function Chat() {
  const attachedFilesRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessageHistory>([]);

  function simulateUploadClick() {
    attachedFilesRef.current?.click();
  }

  async function handleSendMessage() {
    if (!message.trim()) return;

    const userPayload = {
      content: message,
      role: 'user',
    };

    setConversation((prev) => [...prev, userPayload]);
    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ data: [...conversation, userPayload] }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let done = false;
      let accumulatedText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
        }
      }

      setConversation((prev) => [
        ...prev,
        { content: accumulatedText, role: 'assistant' },
      ]);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Streaming failed');
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full'>
      {conversation.length === 0 && (
        <div className='text-center mb-6 space-y-2'>
          <h3 className='text-3xl font-semibold'>What do you want to know?</h3>
          <p className='text-sm text-muted-foreground'>
            Upload files to reference their content and generate appropriate
            answers.
          </p>
        </div>
      )}

      <ul className='flex flex-col w-full gap-y-2 mb-6 max-h-[60vh] overflow-y-auto'>
        {conversation.map((cvx, index) => (
          <li
            key={index}
            className={cn(
              'w-[80%] border rounded-lg p-4',
              cvx.role === 'user'
                ? 'self-end bg-gray-500 text-white'
                : 'self-start',
            )}
          >
            <p>{cvx.content}</p>
          </li>
        ))}
      </ul>

      <input type='file' ref={attachedFilesRef} multiple className='hidden' />

      {isLoading && <ChatLoadingIndicator />}

      <InputGroup>
        <InputGroupTextarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className='resize-none max-h-32'
          placeholder='Ask questions here...'
        />

        <InputGroupAddon align='block-end'>
          <InputGroupButton
            type='button'
            variant='outline'
            title='Attach Files'
            aria-label='Attach Files'
            onClick={simulateUploadClick}
          >
            <PaperclipIcon />
            <p className='hidden lg:block'>Attach</p>
          </InputGroupButton>

          <InputGroupButton
            type='button'
            variant='default'
            title='Send message'
            aria-label='Send message'
            className='ml-auto'
            onClick={handleSendMessage}
          >
            <SendHorizontalIcon />
            <p className='hidden lg:block'>Send</p>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
