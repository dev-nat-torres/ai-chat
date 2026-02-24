import { SignInForm } from '@/components/auth';

export default async function SignInPage() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      {/** Sign in card */}
      <div className='max-w-md w-full p-8 rounded-lg border'>
        {/** Sign in header */}
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-semibold mb-2 tracking-tight'>
            Sign in to AI Chat
          </h1>
          <p className='text-sm text-muted-foreground'>
            Complete the form below to sign in.
          </p>
        </div>
        {/** Sign in form */}
        <SignInForm />
      </div>
    </div>
  );
}
