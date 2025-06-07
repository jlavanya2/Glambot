import type React from "react"
export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen py-8">{children}</div>
}

