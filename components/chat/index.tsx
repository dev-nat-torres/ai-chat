'use client';

import { generateAnswer } from '@/actions/chat';

import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/client';

import { PaperclipIcon, SendHorizontalIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';

export function Chat() {
  const attachedFilesRef = useRef<HTMLInputElement>(null);
  const [hideHeaderText, setHideHeaderText] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  useEffect(() => {
    alreadySentMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function simulateUploadClick() {
    attachedFilesRef.current?.click();
  }

  function alreadySentMessage() {
    if (localStorage.getItem('alreadySentMessage')) setHideHeaderText(true);

    if (conversation.length > 0) setHideHeaderText(false);
    else setHideHeaderText(true);
  }

  async function handleSendMessage() {
    const payload = {
      id: uuidv4(),
      message,
      type: 'user',
    };

    setIsLoading(true);
    setMessage('');

    if (!localStorage.getItem('alreadySentMessage')) {
      localStorage.setItem('alreadySentMessage', 'true');
      setHideHeaderText(true);
    }

    try {
      setConversation((prev) => [...prev, payload]);

      const response = await generateAnswer(payload);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setConversation((prev) => [...prev, response.data!]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to send the message.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full'>
      {!hideHeaderText && !isLoading && (
        <div className='text-center mb-6 space-y-2'>
          <h3 className='text-3xl font-semibold'>What do you want to know?</h3>
          <p className='text-sm text-muted-foreground'>
            Upload files to reference their content and generate appropriate
            answers.
          </p>
        </div>
      )}

      {!isLoading && hideHeaderText && (
        <ul className='flex flex-col w-full gap-y-2 mb-6 max-h-[60vh] overflow-y-auto'>
          {conversation.map((cvx, index) => (
            <li
              key={index}
              className={cn(
                'w-[80%] border rounded-lg p-4',
                cvx.type === 'user'
                  ? 'self-end bg-gray-500 text-white'
                  : 'self-start',
              )}
            >
              <p>{cvx.message}</p>
            </li>
          ))}
        </ul>
      )}

      <input type='file' ref={attachedFilesRef} multiple className='hidden' />

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
