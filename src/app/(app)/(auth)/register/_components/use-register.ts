'use client';

import { z } from 'zod';
import { memberRegisterFormSchema } from './register-form.schema';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const trpc = useTRPC();
  const registerMutation = useMutation(trpc.auth.register.mutationOptions());

  const onSubmit = async (values: z.infer<typeof memberRegisterFormSchema>) => {
    try {
      setIsLoading(true);
      await registerMutation.mutateAsync(values);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
    registerMutation,
  };
};
