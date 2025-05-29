import { collectionSlugs } from '@/collections';
import configPromise from '@payload-config';
import { CollectionSlug, getPayload } from 'payload';

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: collectionSlugs.categories as CollectionSlug,
    depth: 1, // Load subcategories
    where: {
      parent: { exists: false },
    },
  });

  return (
    <div>
      <ul>
        {data.docs.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}
