"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ITEMS_PER_PAGE = 10

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchSeminars() {
      setLoading(true)
      try {
        const res = await fetch(`${backend}/api/seminars`)
        const data = await res.json()
        setSeminars(data)
      } catch {
        setSeminars([])
      }
      setLoading(false)
    }
    fetchSeminars()
  }, [])

  const totalPages = Math.ceil(seminars.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentSeminars = seminars.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ASCE Seminars</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our educational seminars featuring expert speakers discussing the latest developments in civil
            engineering, construction technology, and sustainable infrastructure.
          </p>
        </div>

        {/* Seminars Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid gap-8 mb-12">
            {currentSeminars.map((seminar) => (
              <Link key={seminar.id} href={`/activities/seminar/${seminar.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={seminar.image || "/placeholder.svg"}
                        alt={seminar.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <CardContent className="md:w-2/3 p-6 bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{seminar.title}</h2>
                        <Button
                          size="sm"
                          variant="default"
                          className="ml-4 flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700 border-0"
                        >
                          ▶ Watch
                        </Button>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📅</span>
                          <span>
                            {seminar.date
                              ? new Date(seminar.date).toLocaleDateString()
                              : ""}{" "}
                            • {seminar.time}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <span className="mr-2">📍</span>
                          <span>{seminar.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-semibold text-gray-900">{seminar.speaker}</p>
                        <p className="text-sm text-gray-600">{seminar.designation}</p>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{seminar.description}</p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              ← Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
