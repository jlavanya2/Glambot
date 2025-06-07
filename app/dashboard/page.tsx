"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Clock, Heart, Grid3X3, List, Shirt, Palette, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Hello")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const uploads = [
    {
      id: 1,
      title: "Summer Dress",
      date: "2 days ago",
      image: "/placeholder.svg?height=300&width=300",
      recommendations: 8,
    },
    {
      id: 2,
      title: "Casual Outfit",
      date: "1 week ago",
      image: "/placeholder.svg?height=300&width=300",
      recommendations: 12,
    },
    {
      id: 3,
      title: "Formal Suit",
      date: "2 weeks ago",
      image: "/placeholder.svg?height=300&width=300",
      recommendations: 6,
    },
    {
      id: 4,
      title: "Winter Jacket",
      date: "3 weeks ago",
      image: "/placeholder.svg?height=300&width=300",
      recommendations: 9,
    },
  ]

  const styleStats = [
    { label: "Casual", value: 65 },
    { label: "Formal", value: 15 },
    { label: "Sporty", value: 10 },
    { label: "Bohemian", value: 10 },
  ]

  const colorStats = [
    { color: "#0A2463", label: "Navy", percentage: 30 },
    { color: "#E8C1C5", label: "Blush", percentage: 25 },
    { color: "#D4AF37", label: "Gold", percentage: 15 },
    { color: "#FFFFFF", label: "White", percentage: 20 },
    { color: "#000000", label: "Black", percentage: 10 },
  ]

  const trendingItems = ["Oversized Blazers", "Wide-Leg Pants", "Statement Collars", "Chunky Loafers", "Pastel Hues"]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-12 gradient-bg">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-playfair font-bold">
              {greeting}, <span className="text-primary">User</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome to your fashion dashboard. Here's an overview of your style profile.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-playfair">Recent Uploads</CardTitle>
                      <CardDescription>Your recently analyzed clothing items</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="recent">Recent</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                      </TabsList>
                      <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {uploads.map((item) => (
                            <div key={item.id} className="border rounded-lg overflow-hidden card-hover">
                              <div className="relative aspect-square">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium">{item.title}</h3>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> {item.date}
                                  </p>
                                  <Link
                                    href={`/recommendations?id=${item.id}`}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    {item.recommendations} recommendations
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="recent" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {uploads.slice(0, 2).map((item) => (
                            <div key={item.id} className="border rounded-lg overflow-hidden card-hover">
                              <div className="relative aspect-square">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium">{item.title}</h3>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> {item.date}
                                  </p>
                                  <Link
                                    href={`/recommendations?id=${item.id}`}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    {item.recommendations} recommendations
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="favorites" className="mt-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {uploads.slice(1, 3).map((item) => (
                            <div key={item.id} className="border rounded-lg overflow-hidden card-hover">
                              <div className="relative aspect-square">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                                >
                                  <Heart className="h-4 w-4 text-destructive" fill="currentColor" />
                                </Button>
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium">{item.title}</h3>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-muted-foreground flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> {item.date}
                                  </p>
                                  <Link
                                    href={`/recommendations?id=${item.id}`}
                                    className="text-xs text-primary hover:underline"
                                  >
                                    {item.recommendations} recommendations
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href="/upload">
                        <Upload className="mr-2 h-4 w-4" /> Upload New Item
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center">
                      <Palette className="h-5 w-5 mr-2" /> Color Analysis
                    </CardTitle>
                    <CardDescription>Colors that appear most frequently in your wardrobe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {colorStats.map((color, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.color }} />
                              <span>{color.label}</span>
                            </div>
                            <span>{color.percentage}%</span>
                          </div>
                          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${color.percentage}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: color.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center">
                      <Shirt className="h-5 w-5 mr-2" /> Style Profile
                    </CardTitle>
                    <CardDescription>Your fashion preferences based on AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {styleStats.map((style, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{style.label}</span>
                            <span>{style.value}%</span>
                          </div>
                          <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${style.value}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-playfair flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" /> Trending Now
                    </CardTitle>
                    <CardDescription>Fashion trends that match your style</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {trendingItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Explore All Trends
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

