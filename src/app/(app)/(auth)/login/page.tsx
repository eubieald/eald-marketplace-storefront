import { LoginForm } from './_components/login-form';

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm className="w-full max-w-md p-6 bg-white rounded-lg shadow-md" />
    </div>
  );
}
