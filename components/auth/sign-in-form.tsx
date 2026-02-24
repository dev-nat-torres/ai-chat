'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import Link from 'next/link';
import { MailIcon, LockIcon } from 'lucide-react';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { Button, buttonVariants } from '@/components/ui/button';

import { signInSchema, type SignInFormData } from '@/lib/client';

const defaultValues: SignInFormData = {
  email: '',
  password: '',
};

export function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });

  async function onSubmit(formData: SignInFormData) {
    toast.success(<pre>{JSON.stringify(formData, null, 2)}</pre>);
  }

  return (
    <div className='space-y-8'>
      <form id='sign-in-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='sign-in-form-email'>
                  Email address
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='sign-in-form-email'
                    type='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='juan.dela.cruz@email.com'
                    autoComplete='off'
                  />

                  <InputGroupAddon align='inline-start'>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='sign-in-form-password'>
                  Password
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='sign-in-form-password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='@securePassword123'
                    autoComplete='off'
                  />

                  <InputGroupAddon align='inline-start'>
                    <LockIcon />
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Field orientation='vertical'>
        <Button form='sign-in-form' type='submit' size='lg'>
          Sign In
        </Button>

        <Link
          href='/sign-up'
          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
        >
          Don&apos;t have an account? Sign up here
        </Link>
      </Field>
    </div>
  );
}
