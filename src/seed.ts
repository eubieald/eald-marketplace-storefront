import { getPayload } from 'payload';
import config from '@payload-config';

const categories = [
  {
    name: 'Business & Money',
    description: 'Learn about business, personal finance, and entrepreneurship',
    bgColor: '#FFB347',
    slug: 'business-money',
    subcategories: [
      { name: 'Accounting', slug: 'accounting' },
      {
        name: 'Entrepreneurship',
        slug: 'entrepreneurship',
      },
      { name: 'Gigs & Side Projects', slug: 'gigs-side-projects' },
      { name: 'Investing', slug: 'investing' },
      { name: 'Management & Leadership', slug: 'management-leadership' },
      {
        name: 'Marketing & Sales',
        slug: 'marketing-sales',
      },
      { name: 'Networking, Careers & Jobs', slug: 'networking-careers-jobs' },
      { name: 'Personal Finance', slug: 'personal-finance' },
      { name: 'Real Estate', slug: 'real-estate' },
    ],
  },
  {
    name: 'Software Development',
    description: 'Learn about programming, web development, and more',
    bgColor: '#7EC8E3',
    slug: 'software-development',
    subcategories: [
      { name: 'Web Development', slug: 'web-development' },
      { name: 'Mobile Development', slug: 'mobile-development' },
      { name: 'Game Development', slug: 'game-development' },
      { name: 'Programming Languages', slug: 'programming-languages' },
      { name: 'DevOps', slug: 'devops' },
    ],
  },
  {
    name: 'Writing & Publishing',
    description: 'Learn about writing, publishing, and more',
    bgColor: '#D8B5FF',
    slug: 'writing-publishing',
    subcategories: [
      { name: 'Fiction', slug: 'fiction' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
      { name: 'Blogging', slug: 'blogging' },
      { name: 'Copywriting', slug: 'copywriting' },
      { name: 'Self-Publishing', slug: 'self-publishing' },
    ],
  },
  {
    name: 'Other',
    slug: 'other',
  },
  {
    name: 'Education',
    description: 'Learn about online courses, tutoring, and more',
    bgColor: '#FFE066',
    slug: 'education',
    subcategories: [
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'Tutoring', slug: 'tutoring' },
      { name: 'Test Preparation', slug: 'test-preparation' },
      { name: 'Language Learning', slug: 'language-learning' },
    ],
  },
  {
    name: 'Self Improvement',
    description: 'Learn about self improvement, productivity, and more',
    bgColor: '#96E6B3',
    slug: 'self-improvement',
    subcategories: [
      { name: 'Productivity', slug: 'productivity' },
      { name: 'Personal Development', slug: 'personal-development' },
      { name: 'Mindfulness', slug: 'mindfulness' },
      { name: 'Career Growth', slug: 'career-growth' },
    ],
  },
  {
    name: 'Fitness & Health',
    description: 'Learn about fitness, health, and more',
    bgColor: '#FF9AA2',
    slug: 'fitness-health',
    subcategories: [
      { name: 'Workout Plans', slug: 'workout-plans' },
      { name: 'Nutrition', slug: 'nutrition' },
      { name: 'Mental Health', slug: 'mental-health' },
      { name: 'Yoga', slug: 'yoga' },
    ],
  },
  {
    name: 'Design',
    description: 'Learn about design, UI/UX, and more',
    bgColor: '#B5B9FF',
    slug: 'design',
    subcategories: [
      { name: 'UI/UX', slug: 'ui-ux' },
      { name: 'Graphic Design', slug: 'graphic-design' },
      { name: '3D Modeling', slug: '3d-modeling' },
      { name: 'Typography', slug: 'typography' },
    ],
  },
  {
    name: 'Drawing & Painting',
    description: 'Learn about drawing, painting, and more',
    bgColor: '#FFCAB0',
    slug: 'drawing-painting',
    subcategories: [
      { name: 'Watercolor', slug: 'watercolor' },
      { name: 'Acrylic', slug: 'acrylic' },
      { name: 'Oil', slug: 'oil' },
      { name: 'Pastel', slug: 'pastel' },
      { name: 'Charcoal', slug: 'charcoal' },
    ],
  },
  {
    name: 'Music',
    description: 'Learn about music, songwriting, and more',
    bgColor: '#FFD700',
    slug: 'music',
    subcategories: [
      { name: 'Songwriting', slug: 'songwriting' },
      { name: 'Music Production', slug: 'music-production' },
      { name: 'Music Theory', slug: 'music-theory' },
      { name: 'Music History', slug: 'music-history' },
    ],
  },
  {
    name: 'Photography',
    description: 'Learn about photography, portrait, and more',
    bgColor: '#FF6B6B',
    slug: 'photography',
    subcategories: [
      { name: 'Portrait', slug: 'portrait' },
      { name: 'Landscape', slug: 'landscape' },
      { name: 'Street Photography', slug: 'street-photography' },
      { name: 'Nature', slug: 'nature' },
      { name: 'Macro', slug: 'macro' },
    ],
  },
];

// Actual seed script to populate the database with categories and subcategories
const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: 'categories',
      data: {
        name: category.name,
        description: category.description,
        bgColor: category.bgColor,
        slug: category.slug,
        parent: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: 'categories',
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log('Seed completed successfully.');
  process.exit(0);
} catch (error) {
  console.error('Error seeding data:', error);
  process.exit(1);
}
