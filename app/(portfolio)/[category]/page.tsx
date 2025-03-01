import PortfolioPage from '@/app/components/PortfolioPage';

// Validate categories to ensure only valid routes are accessible
const validCategories = ['product', 'software', 'content', 'innovation'];

export function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

interface PageParams extends Promise<{ category: string }> {}

export default async function DynamicPortfolioPage({
  params,
}: {
  params: PageParams;
}) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  // Validate category
  if (!validCategories.includes(category)) {
    return <div className="text-center text-red-500">Invalid portfolio category</div>;
  }

  return <PortfolioPage category={category} />;
} 