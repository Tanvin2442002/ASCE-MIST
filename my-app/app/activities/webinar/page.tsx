"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Webinar {
  id: number
  title: string
  date: string
  time: string
  speaker: string
  organization: string
  image: string
  description: string
}

const ITEMS_PER_PAGE = 10

export default function WebinarPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/webinars")
        if (!res.ok) throw new Error("Failed to fetch webinars")
        const data = await res.json()
        setWebinars(data)
      } catch (error) {
        console.error("Error fetching webinars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWebinars()
  }, [])

  const totalPages = Math.ceil(webinars.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentWebinars = webinars.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading webinars...</p>
      </div>
    )
  }

  if (!webinars.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No webinars available.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Webinars</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our expert-led webinars covering the latest trends and innovations in civil engineering and technology.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {currentWebinars.map((webinar) => (
            <Card
              key={webinar.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img
                      src={webinar.image || "/placeholder.svg"}
                      alt={webinar.title}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-balance">{webinar.title}</h2>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold">Date:</span> {webinar.date}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Time:</span> {webinar.time}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Speaker:</span> {webinar.speaker}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-semibold">Organization:</span> {webinar.organization}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">{webinar.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <Link href={`/activities/webinar/${webinar.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="text-gray-900 border-gray-400 hover:bg-gray-50 bg-transparent"
                      >
                        Watch Recording
                      </Button>
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
