"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 gradient-bg">
        <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
            <div className="absolute inset-0 bg-muted" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 flex items-center text-lg font-medium"
            >
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-serif">
                  Glam<span className="text-accent">bot</span>
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-20 mt-auto"
            >
              <blockquote className="space-y-2">
                <p className="text-lg">
                  "Glambot has completely transformed how I approach fashion. The AI recommendations are incredibly
                  accurate and have helped me discover my personal style."
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </motion.div>
          </div>
          <div className="lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
            >
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-serif font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="m@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" disabled={isLoading} />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Signing in...
                    </motion.div>
                  ) : (
                    <span className="flex items-center">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
              <p className="px-8 text-center text-sm text-muted-foreground">
                <Link href="/register" className="hover:text-accent underline underline-offset-4">
                  Don&apos;t have an account? Sign Up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

