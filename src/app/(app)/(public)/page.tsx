/*
// EXAMPLE USE CASE
// NOTE: This is a server sample page that uses tRPC to fetch data
"use server"

import { getQueryClient, trpc } from '@/trpc/server';

export default async function Page() {
  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );
  return (
    <div className="prose prose-lg max-w-none">
      {JSON.stringify(categories, null, 2)}
    </div>
  );
}
  */

export const dynamic = 'force-dynamic';

import { Test } from './categories/_components/test.component';

export default function Page() {
  return (
    <div className="prose prose-lg max-w-none">
      <Test className="mb-4" />
    </div>
  );
}
