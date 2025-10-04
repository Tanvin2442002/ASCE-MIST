"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Announcement {
  id: number
  title: string
  description: string
  type: string
  priority: boolean
  date: string
  status: string
  created_at: string
}

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/admin/announcements")
        if (response.ok) {
          const data = await response.json()
          setAnnouncements(data)
        }
      } catch (error) {
        console.error("Error fetching announcements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading announcements...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Announcement Management</h1>
            <p className="text-slate-600 mt-2">Create and manage announcements</p>
          </div>
          <Button asChild>
            <Link href="/admin/announcements/new">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Announcements</CardTitle>
            <CardDescription>Manage your published and draft announcements</CardDescription>
          </CardHeader>
          <CardContent>
            {announcements.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No announcements found. Create your first announcement!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{announcement.title}</h3>
                        {announcement.priority && (
                          <Badge variant="destructive" className="text-xs">
                            Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">{announcement.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <Badge variant="outline">{announcement.type}</Badge>
                        <span>{formatDate(announcement.date)}</span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            announcement.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {announcement.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
