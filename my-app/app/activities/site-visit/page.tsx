"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"

const backend = process.env.NEXT_PUBLIC_BACKEND
interface SiteVisit {
  id: string
  title: string
  location: string
  date: string
  description: string
  image_urls?: string[] // array of images from backend
  department?: string
}

const ITEMS_PER_PAGE = 10

export default function SiteVisitPage() {
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchSiteVisits = async () => {
      try {
        const res = await fetch(`${backend}/api/site-visits`)
        if (!res.ok) throw new Error("Failed to fetch site visits")
        const data: SiteVisit[] = await res.json()
        setSiteVisits(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSiteVisits()
  }, [])

  const totalPages = Math.ceil(siteVisits.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentVisits = siteVisits.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToPrevious = () => currentPage > 1 && goToPage(currentPage - 1)
  const goToNext = () => currentPage < totalPages && goToPage(currentPage + 1)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700">Loading site visits...</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Site Visits</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            Explore our educational field visits and site tours that provide hands-on learning experiences for students
            across various engineering disciplines. These visits bridge the gap between theoretical knowledge and
            practical application.
          </p>
        </div>

        {/* Site Visits Grid */}
        <div className="space-y-8 mb-12">
          {currentVisits.map((visit) => (
            <Link key={visit.id} href={`/activities/site-visit/${visit.id}`}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {/* fixed height on md+ so every card is identical */}
                <div className="md:flex md:h-64">
                  {/* Image column */}
                  <div className="md:w-1/2 md:h-full">
                    <img
                      src={visit.image_urls?.[0] || "/placeholder.svg"}
                      alt={visit.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 70%" }} 
                    />
                  </div>

                  {/* Content column - same height, scrolls internally if content too long */}
                  <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col h-full">
                    <div className="space-y-4 flex-1 overflow-hidden">
                      <h2 className="text-2xl font-bold text-gray-900 text-balance">{visit.title}</h2>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>{new Date(visit.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{visit.location}</span>
                        </div>
                      </div>

                      {visit.department && (
                        <div className="inline-block">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {visit.department}
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 leading-relaxed text-pretty whitespace-pre-line">
                        {visit.description}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-1 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 ${
                    currentPage === page
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 bg-transparent"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, siteVisits.length)} of {siteVisits.length} site visits
        </div>
      </main>
    </div>
  )
}
