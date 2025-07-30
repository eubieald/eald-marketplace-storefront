import { caller, getQueryClient, trpc } from '@/trpc/server';
export default async function Page() {
  // NOTE: Fetch session data using tRPC
  /*
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.auth.session.queryOptions());
    const session = queryClient.getQueryData(trpc.auth.session.queryKey());
  */

  // NOTE: Alternatively, you can use the caller directly
  const session = await caller.auth.session();

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>{JSON.stringify(session?.user, null, 2)}</p>
    </div>
  );
}
