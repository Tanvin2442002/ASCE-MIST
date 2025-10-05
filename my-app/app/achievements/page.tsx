"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ITEMS_PER_PAGE = 10

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const backend = process.env.NEXT_PUBLIC_BACKEND

  useEffect(() => {
    if (!backend) {
      setError("Backend URL is not configured.")
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const signal = controller.signal

    async function fetchAchievements() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${backend}/api/achievements`, { signal })
        if (!res.ok) {
          const text = await res.text().catch(() => "")
          throw new Error(`Failed to fetch achievements: ${res.status} ${text}`)
        }
        const data = await res.json()

        // Normalize backend fields to match what the UI expects:
        // - awarded_by -> awardedBy
        // - ensure date is present
        const normalized = (data || []).map((a: any) => ({
          id: a.id,
          title: a.title,
          category: a.category,
          date: a.date,
          description: a.description,
          image: a.image,
          awardedBy: a.awarded_by ?? a.awardedBy ?? "",
          level: a.level,
          // keep other fields if needed later:
          details: a.details,
          criteria: a.criteria,
          additional_images: a.additional_images,
          impact: a.impact,
        }))

        setAchievements(normalized)
      } catch (err: any) {
        if (err.name === "AbortError") return
        console.error("Error fetching achievements:", err)
        setError(err.message || "Error fetching achievements")
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()

    return () => {
      controller.abort()
    }
  }, [backend])

  const totalPages = Math.max(1, Math.ceil(achievements.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAchievements = achievements.slice(startIndex, endIndex)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Chapter Excellence": "bg-purple-100 text-purple-800",
      "Community Service": "bg-blue-100 text-blue-800",
      Innovation: "bg-green-100 text-green-800",
      Leadership: "bg-yellow-100 text-yellow-800",
      Research: "bg-red-100 text-red-800",
      "Volunteer Service": "bg-indigo-100 text-indigo-800",
      Academic: "bg-pink-100 text-pink-800",
      Competition: "bg-orange-100 text-orange-800",
      "Event Management": "bg-teal-100 text-teal-800",
      Environment: "bg-emerald-100 text-emerald-800",
      Mentorship: "bg-violet-100 text-violet-800",
      Technology: "bg-cyan-100 text-cyan-800",
      Partnership: "bg-sky-100 text-sky-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-gold-100 text-gold-800 border-gold-200",
      National: "bg-silver-100 text-silver-800 border-silver-200",
      Institutional: "bg-bronze-100 text-bronze-800 border-bronze-200",
    }
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Celebrating our journey of excellence, innovation, and service to the engineering community. These
            achievements reflect our commitment to academic excellence and community impact.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center mb-6">
            <p className="text-gray-600">Loading achievements…</p>
          </div>
        )}
        {error && (
          <div className="text-center mb-6">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <Link href={`/achievements/${achievement.id}`} className="block">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getLevelColor(achievement.level)} border`}>{achievement.level}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    <span className="text-sm text-gray-500">
                      {achievement.date
                        ? new Date(achievement.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {achievement.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Awarded by: {achievement.awardedBy}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-900 border-gray-400 hover:bg-gray-50 hover:border-gray-500 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}

          {/* If there are no achievements and not loading */}
          {!loading && achievements.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center text-gray-600">No achievements found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-300 hover:bg-gray-50"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "text-gray-900 border-gray-300 hover:bg-gray-50"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-300 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
