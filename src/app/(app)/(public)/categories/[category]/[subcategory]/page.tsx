type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function Page({ params }: PageProps) {
  const { category, subcategory } = await params;
  return (
    <>
      <h1 className="text-2xl font-bold">
        Category: {category}, Subcategory: {subcategory}
      </h1>
    </>
  );
}
