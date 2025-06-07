"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, ImageIcon, X, Crop, RotateCw, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setIsAnalyzing(false)
    setProgress(0)
    setIsComplete(false)
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)

    // Simulate progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsComplete(true)
        }, 500)
      }
    }, 200)
  }

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
            <h1 className="text-3xl md:text-4xl font-playfair font-bold">Upload Your Clothing</h1>
            <p className="text-muted-foreground mt-2">
              Upload an image of your clothing item for AI analysis and personalized recommendations
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
                <TabsTrigger value="camera">Take Photo</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    {!uploadedImage ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-playfair font-bold text-lg">Drag & Drop your image here</h3>
                            <p className="text-muted-foreground text-sm">
                              or click the button below to browse your files
                            </p>
                          </div>
                          <Button onClick={handleButtonClick} className="bg-primary hover:bg-primary/90">
                            <Upload className="mr-2 h-4 w-4" /> Select Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="relative max-w-md mx-auto">
                          <div className="relative aspect-square rounded-lg overflow-hidden border">
                            <Image
                              src={uploadedImage || "/placeholder.svg"}
                              alt="Uploaded clothing"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          {!isAnalyzing && !isComplete && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                                <Crop className="h-4 w-4 mr-1" /> Crop
                              </Button>
                              <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                                <RotateCw className="h-4 w-4 mr-1" /> Rotate
                              </Button>
                            </div>
                          )}
                        </div>

                        {isAnalyzing && !isComplete && (
                          <div className="space-y-4">
                            <h3 className="font-playfair font-bold text-center">Analyzing your image...</h3>
                            <Progress value={progress} className="h-2" />
                            <p className="text-center text-sm text-muted-foreground">
                              Our AI is identifying style, colors, and patterns
                            </p>
                          </div>
                        )}

                        {isComplete && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-4"
                          >
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                              <Sparkles className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="font-playfair font-bold text-lg">Analysis Complete!</h3>
                            <p className="text-muted-foreground">
                              We've analyzed your clothing item and prepared personalized recommendations
                            </p>
                            <Button asChild className="bg-primary hover:bg-primary/90">
                              <Link href="/recommendations">View Recommendations</Link>
                            </Button>
                          </motion.div>
                        )}

                        {!isAnalyzing && !isComplete && (
                          <div className="flex justify-center">
                            <Button onClick={handleAnalyze} className="bg-primary hover:bg-primary/90">
                              <Sparkles className="mr-2 h-4 w-4" /> Analyze Image
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="camera" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <Camera className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-playfair font-bold text-lg">Take a photo with your camera</h3>
                          <p className="text-muted-foreground text-sm">
                            Position your clothing item in good lighting for best results
                          </p>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90">
                          <Camera className="mr-2 h-4 w-4" /> Open Camera
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

