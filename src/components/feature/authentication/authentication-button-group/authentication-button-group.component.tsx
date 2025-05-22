import { Button } from '@/components/ui/button';
import { CommonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export const AuthenticationButtonGroup = ({
  className,
  children,
}: CommonProps) => {
  return <div className={cn('flex', className)}>{children}</div>;
};

const AuthenticationButtonLogin = ({ className, children }: CommonProps) => {
  return (
    <Button
      asChild
      variant="secondary"
      className={cn(
        'flex justify-start lg:justify-normal rounded-none border-none bg-transparent text-sm font-normal',
        className
      )}
    >
      {children}
    </Button>
  );
};

const AuthenticationButtonRegister = ({ className, children }: CommonProps) => {
  return (
    <Button
      asChild
      variant="secondary"
      className={cn(
        'flex justify-start lg:justify-normal rounded-none border-none bg-transparent text-sm font-normal',
        className
      )}
    >
      {children}
    </Button>
  );
};

AuthenticationButtonGroup.Login = AuthenticationButtonLogin;
AuthenticationButtonGroup.Register = AuthenticationButtonRegister;
