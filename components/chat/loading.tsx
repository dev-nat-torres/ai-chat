import { Spinner } from '@/components/ui/spinner';

export function ChatLoadingIndicator() {
  return (
    <div className='w-full flex justify-between items-center border p-2 mb-2 rounded-xl'>
      <Spinner />
      <p className='text-muted-foreground'>Loading...</p>
    </div>
  );
}
