import { getAllCategoriesWithSlugs } from "@/lib/recommendations"
import RecommendationPageClient from "./RecommendationPageClient"

export default function RecommendationPage({ params }: { params: { slug: string } }) {
  return <RecommendationPageClient params={params} />
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = getAllCategoriesWithSlugs()

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

