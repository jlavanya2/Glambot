"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCategoryBySlug, getRecommendationsForCategory, type RecommendationItem } from "@/lib/recommendations"

export default function RecommendationPageClient({ params }: { params: { slug: string } }) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [category, setCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the category from the slug
    const categoryName = getCategoryBySlug(params.slug)
    setCategory(categoryName)

    if (categoryName) {
      // Get recommendations for this category
      const recs = getRecommendationsForCategory(categoryName)
      setRecommendations(recs)
    }

    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-lg">Loading recommendations...</div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Category not found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find recommendations for this category.</p>
          <Button asChild>
            <Link href="/recommendations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Recommendations
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/recommendations" className="text-sm text-muted-foreground hover:text-accent flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Recommendations
        </Link>

        <h1 className="text-3xl font-serif font-bold mt-4">{category}</h1>
        <p className="text-muted-foreground mt-2">
          Discover perfect matches and complementary items for your {category.toLowerCase()}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Item */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src="/placeholder.svg?height=400&width=400" alt={category} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-serif font-bold mb-2">{category}</h2>
              <p className="text-muted-foreground text-sm mb-4">Your selected item</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop Similar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Recommendations</TabsTrigger>
              <TabsTrigger value="color">Different Colors</TabsTrigger>
              <TabsTrigger value="style">Different Styles</TabsTrigger>
              <TabsTrigger value="complementary">Complementary</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RecommendationCard recommendation={rec} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="color" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations
                  .filter((rec) => rec.recommendationType === "Different Color")
                  .map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <RecommendationCard recommendation={rec} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="style" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations
                  .filter((rec) => rec.recommendationType === "Different Style")
                  .map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <RecommendationCard recommendation={rec} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="complementary" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations
                  .filter(
                    (rec) => rec.recommendationType === "Complementary Item" || rec.recommendationType === "Accessory",
                  )
                  .map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <RecommendationCard recommendation={rec} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({ recommendation }: { recommendation: RecommendationItem }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative aspect-square">
        <Image
          src={recommendation.imageUrl || "/placeholder.svg"}
          alt={recommendation.item}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm hover:bg-background">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <div className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            {recommendation.recommendationType}
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-1">{recommendation.item}</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Perfect match for your {recommendation.category.toLowerCase()}
        </p>
        <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
          <a href={recommendation.link} target="_blank" rel="noopener noreferrer">
            View on Amazon
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

