"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ITEMS_PER_PAGE = 10

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function SocialEventsPage() {
  const [socialEvents, setSocialEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${backend}/api/events`)
        if (!res.ok) throw new Error("Failed to fetch events")
        const data = await res.json()
        setSocialEvents(data)
      } catch (err: any) {
        setError(err.message || "Error fetching events")
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const totalPages = Math.ceil(socialEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEvents = socialEvents.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Social Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building community and fostering relationships through engaging social activities and memorable experiences.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {currentEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-3">
                        {event.type}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">{event.title}</h2>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Date:</span> {event.date}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Location:</span> {event.location}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/activities/social-events/${event.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-400 hover:bg-gray-50"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-900 border-gray-400 hover:bg-gray-50"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-400 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
