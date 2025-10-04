"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Webinar {
  id: string
  title: string
  description: string
  date: string
  time: string
  speaker: string
  status: "published" | "draft"
  created_at: string
}

export default function AdminWebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWebinars()
  }, [])

  const fetchWebinars = async () => {
    try {
      const response = await fetch("/api/admin/webinars")
      if (response.ok) {
        const data = await response.json()
        setWebinars(data)
      }
    } catch (error) {
      console.error("Error fetching webinars:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteWebinar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webinar?")) return

    try {
      const response = await fetch(`/api/admin/webinars/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setWebinars(webinars.filter((w) => w.id !== id))
      }
    } catch (error) {
      console.error("Error deleting webinar:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading webinars...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Webinars</h1>
            <p className="text-muted-foreground">Manage webinar events and sessions</p>
          </div>
          <Link href="/admin/webinars/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Webinar
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {webinars.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No webinars found</p>
                <Link href="/admin/webinars/new">
                  <Button>Create your first webinar</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            webinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{webinar.title}</CardTitle>
                      <CardDescription>{webinar.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(webinar.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{webinar.time}</span>
                        <span>•</span>
                        <span>Speaker: {webinar.speaker}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={webinar.status === "published" ? "default" : "secondary"}>{webinar.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/activities/webinar/${webinar.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/webinars/${webinar.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteWebinar(webinar.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
