"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllCategoriesWithSlugs } from "@/lib/recommendations"

export function RecommendationsNav() {
  const [isOpen, setIsOpen] = useState(false)
  const categories = getAllCategoriesWithSlugs()

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center">
            <Shirt className="h-5 w-5 mr-2" />
            Quick Access to Recommendations
          </div>
          {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
          >
            {categories.map(({ category, slug }) => (
              <Button key={slug} variant="outline" size="sm" asChild className="justify-start h-auto py-2">
                <Link href={`/recommendations/${slug}`}>{category}</Link>
              </Button>
            ))}
          </motion.div>
        </CardContent>
      )}
    </Card>
  )
}

