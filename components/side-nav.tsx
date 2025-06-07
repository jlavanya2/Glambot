"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Upload,
  Sparkles,
  Palette,
  Heart,
  History,
  Settings,
  HelpCircle,
  Shirt,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { getAllCategoriesWithSlugs } from "@/lib/recommendations"

interface SideNavProps {
  className?: string
}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname()
  const [showRecommendations, setShowRecommendations] = useState(false)
  const categories = getAllCategoriesWithSlugs()

  const links = [
    {
      title: "Upload",
      href: "/upload",
      icon: Upload,
    },
    {
      title: "Recommendations",
      href: "/recommendations",
      icon: Sparkles,
      isExpandable: true,
      isExpanded: showRecommendations,
      onExpand: () => setShowRecommendations(!showRecommendations),
      subItems: categories.map(({ category, slug }) => ({
        title: category,
        href: `/recommendations/${slug}`,
        icon: Shirt,
      })),
    },
    {
      title: "Style Analysis",
      href: "/analysis",
      icon: Palette,
    },
    {
      title: "Favorites",
      href: "/favorites",
      icon: Heart,
    },
    {
      title: "History",
      href: "/history",
      icon: History,
    },
  ]

  const bottomLinks = [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Help",
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <nav
      className={cn(
        "fixed top-16 left-0 bottom-0 w-64 border-r bg-muted/30 backdrop-blur-sm overflow-y-auto",
        className,
      )}
    >
      <div className="flex flex-col h-full py-6">
        <div className="space-y-1 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

            return (
              <div key={link.href}>
                {link.isExpandable ? (
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative cursor-pointer",
                        isActive ? "text-accent" : "text-muted-foreground hover:text-accent hover:bg-accent/10",
                      )}
                      onClick={link.onExpand}
                    >
                      <div className="flex items-center gap-3">
                        <link.icon className="h-4 w-4" />
                        {link.title}
                      </div>
                      {link.isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-lg border border-accent/50 bg-accent/10"
                          style={{ zIndex: -1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>

                    {link.isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 space-y-1 border-l pl-3 border-accent/20"
                      >
                        {link.subItems?.map((subItem) => {
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
                                isSubActive
                                  ? "text-accent"
                                  : "text-muted-foreground hover:text-accent hover:bg-accent/10",
                              )}
                            >
                              <subItem.icon className="h-4 w-4" />
                              {subItem.title}
                              {isSubActive && (
                                <motion.div
                                  layoutId="activeSubNav"
                                  className="absolute inset-0 rounded-lg border border-accent/50 bg-accent/10"
                                  style={{ zIndex: -1 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
                      isActive ? "text-accent" : "text-muted-foreground hover:text-accent hover:bg-accent/10",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-lg border border-accent/50 bg-accent/10"
                        style={{ zIndex: -1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-auto space-y-1 px-3">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-accent hover:bg-accent/10"
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

