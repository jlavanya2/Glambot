import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCategoriesWithSlugs } from "@/lib/recommendations"

export default function AllRecommendationsPage() {
  const categories = getAllCategoriesWithSlugs()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">All Recommendation Pages</h1>
        <p className="text-muted-foreground mt-2">Quick access to all clothing recommendation pages</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clothing Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(({ category, slug }) => (
              <Link
                key={slug}
                href={`/recommendations/${slug}`}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/10 transition-colors"
              >
                <span>{category}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

