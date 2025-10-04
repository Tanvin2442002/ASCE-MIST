"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 10

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnnouncements() {
      setLoading(true)
      try {
        const res = await fetch(`${backend}/api/announcements`)
        const data = await res.json()
        setAnnouncements(data)
      } catch (err) {
        setAnnouncements([])
      }
      setLoading(false)
    }
    fetchAnnouncements()
  }, [])

  const totalPages = Math.ceil(announcements.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAnnouncements = announcements.slice(startIndex, endIndex)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Achievement":
        return "bg-green-100 text-green-800 border-green-200"
      case "Research":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Partnership":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Event":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
          <p className="text-gray-600">Stay updated with the latest news and achievements from ASCE @ MIST</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {currentAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="bg-white border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    <img
                      src={
                        Array.isArray(announcement.image_url)
                          ? announcement.image_url[0]
                          : announcement.image_url || "/placeholder.svg"
                      }
                      alt={announcement.title}
                      className="w-full h-48 lg:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="lg:w-2/3 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* If you have a type field, use it here. Otherwise, remove this Badge */}
                      {/* <Badge className={`${getTypeColor(announcement.type)} border`}>{announcement.type}</Badge> */}
                      {announcement.priority && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 border">Priority</Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        {announcement.created_at
                          ? new Date(announcement.created_at).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{announcement.title}</h2>
                    {/* Description intentionally omitted */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-900 border-gray-400 hover:bg-gray-50 bg-transparent"
                        onClick={() =>
                          (window.location.href = `/activities/announcement/${announcement.id}`)
                        }
                      >
                        Read More
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
          <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-400"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "text-gray-900 border-gray-400"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-400"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
