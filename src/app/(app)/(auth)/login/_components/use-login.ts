'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { memberLoginFormSchema } from './login-form.schema';
import z from 'zod';
import { useState } from 'react';

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof memberLoginFormSchema>) => {
      setIsLoading(true);
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || 'Login failed');
      }
      return response.json();
    },
    onSuccess: () => {
      setIsLoading(false);
      router.push('/dashboard');
      router.refresh(); // NOTE: Refresh the page to update the session state
    },
    onError: (error) => {
      setIsLoading(false);
      console.error('Login error:', error);
    },
  });

  const onSubmit = (values: z.infer<typeof memberLoginFormSchema>) => {
    loginMutation.mutate(values);
  };

  return {
    isLoading,
    onSubmit,
    loginMutation,
  };
};
