'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { memberLoginFormSchema } from './login-form.schema';
import z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  GenericInput,
  GenericInputPassword,
} from '@/components/feature/form/generic-input';
import { useLoginForm } from './use-login';

export const LoginForm = ({ className = '' }: CommonProps) => {
  const { onSubmit, isLoading } = useLoginForm();

  const form = useForm<z.infer<typeof memberLoginFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(memberLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className={cn('space-y-4', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <GenericInput
            formHook={form}
            inputProps={{
              name: 'email',
            }}
            label="Email"
          />
          <GenericInputPassword
            formHook={form}
            inputProps={{
              name: 'password',
            }}
            label="Password"
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500">
          Register here
        </a>
      </p>
    </div>
  );
};
