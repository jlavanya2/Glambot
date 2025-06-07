"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAllCategoriesWithSlugs } from "@/lib/recommendations"
import { RecommendationsNav } from "@/components/recommendations-nav"

export default function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const categories = getAllCategoriesWithSlugs()

  const filteredCategories = categories.filter(({ category }) =>
    category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Clothing Recommendations</h1>
        <p className="text-muted-foreground mt-2">Browse our AI-powered recommendations for various clothing items</p>
      </div>

      <RecommendationsNav />

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clothing items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(({ category, slug }, index) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/recommendations/${slug}`}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative aspect-square">
                  <Image src="/placeholder.svg?height=300&width=300" alt={category} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{category}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-muted-foreground">4 recommendations</p>
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clothing items match your search. Try a different query.</p>
        </div>
      )}
    </div>
  )
}

