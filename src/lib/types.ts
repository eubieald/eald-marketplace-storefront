import { PropsWithChildren } from 'react';

// This is a type that is used to define the props that are common to all components
export type CommonProps = PropsWithChildren & {
  className?: string;
};
