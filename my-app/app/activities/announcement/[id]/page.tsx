"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { MarkdownPreviewer } from "@/components/markdown-previewer"
import Link from "next/link"
import { useEffect, useState } from "react"


const backend = process.env.NEXT_PUBLIC_BACKEND

interface Announcement {
  id: string
  title: string
  description: string
  status: string
  priority: string
  image_url: string[] | string
  created_at: string
  updated_at: string
}

interface AnnouncementDetailPageProps {
  params: {
    id: string
  }
}

export default function AnnouncementDetailPage({ params }: AnnouncementDetailPageProps) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(`${backend}/api/announcements/${params.id}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch announcement")
        const data = await res.json()
        setAnnouncement(data)
      } catch (err: any) {
        setError(err.message || "Error fetching announcement")
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncement()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading announcement details...</p>
      </div>
    )
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Announcement Not Found</h1>
          <Link
            href="/activities/announcement"
            className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/activities/announcement"
          className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Announcements
        </Link>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Image at the top */}
              <div className="w-full mb-6">
                <img
                  src={
                    Array.isArray(announcement.image_url)
                      ? announcement.image_url[0]
                      : announcement.image_url || "/placeholder.svg"
                  }
                  alt={announcement.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Title and meta */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge>
                    <Tag className="w-3 h-3 mr-1" />
                    {announcement.status}
                  </Badge>
                  {announcement.priority === "high" && (
                    <Badge className="bg-red-100 text-red-800 border-red-200 border">Priority</Badge>
                  )}
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {announcement.created_at
                      ? new Date(announcement.created_at).toLocaleDateString()
                      : ""}
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{announcement.title}</h1>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <MarkdownPreviewer content={announcement.description} />
              </div>

              {/* Show other fields if needed */}
              <div className="text-sm text-gray-500">
                <div>
                  <strong>Status:</strong> {announcement.status}
                </div>
                <div>
                  <strong>Priority:</strong> {announcement.priority}
                </div>
                <div>
                  <strong>Created:</strong> {announcement.created_at
                    ? new Date(announcement.created_at).toLocaleString()
                    : ""}
                </div>
                <div>
                  <strong>Updated:</strong> {announcement.updated_at
                    ? new Date(announcement.updated_at).toLocaleString()
                    : ""}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
