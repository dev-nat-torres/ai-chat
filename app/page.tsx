import { Chat } from '@/components/chat';

export default async function HomePage() {
  return (
    <div className='max-w-3xl mx-auto flex items-center justify-center'>
      <Chat />
    </div>
  );
}
