'use client';

import { useRef } from 'react';

import { PaperclipIcon, SendHorizontalIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';

export function Chat() {
  const attachedFilesRef = useRef<HTMLInputElement>(null);

  function simulateUploadClick() {
    attachedFilesRef.current?.click();
  }

  return (
    <div className='w-full'>
      <input type='file' ref={attachedFilesRef} multiple className='hidden' />

      <InputGroup>
        <InputGroupTextarea
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
          >
            <SendHorizontalIcon />
            <p className='hidden lg:block'>Send</p>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
