import { Chat } from '@/components/chat';

export default async function HomePage() {
  return (
    <div className='max-w-3xl min-h-[calc(100vh-4rem)] mx-auto flex items-center justify-center py-16'>
      <Chat />
    </div>
  );
}
