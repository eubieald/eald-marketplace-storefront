'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  GenericInput,
  GenericInputPassword,
} from '@/components/feature/form/generic-input';
import { memberRegisterFormSchema } from './register-form.schema';
import { useRegisterForm } from './use-register';

export const RegisterForm = ({ className = '' }: CommonProps) => {
  const form = useForm<z.infer<typeof memberRegisterFormSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(memberRegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  const { isLoading, onSubmit } = useRegisterForm();

  return (
    <div className={cn('space-y-4', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('space-y-4')}
        >
          <GenericInput
            formHook={form}
            inputProps={{
              name: 'username',
            }}
            label="Username"
          />
          <GenericInput
            formHook={form}
            label="Email"
            inputProps={{
              name: 'email',
              type: 'email',
              placeholder: 'Enter your email',
              className: 'bg-[white] text-black mb-2',
            }}
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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500">
          Login here
        </a>
      </p>
    </div>
  );
};
