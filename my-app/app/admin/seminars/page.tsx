"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Seminar {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  speaker: string
  status: "published" | "draft"
  created_at: string
}

export default function AdminSeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeminars()
  }, [])

  const fetchSeminars = async () => {
    try {
      const response = await fetch("/api/admin/seminars")
      if (response.ok) {
        const data = await response.json()
        setSeminars(data)
      }
    } catch (error) {
      console.error("Error fetching seminars:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteSeminar = async (id: string) => {
    if (!confirm("Are you sure you want to delete this seminar?")) return

    try {
      const response = await fetch(`/api/admin/seminars/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setSeminars(seminars.filter((s) => s.id !== id))
      }
    } catch (error) {
      console.error("Error deleting seminar:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading seminars...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Seminars</h1>
            <p className="text-muted-foreground">Manage seminar events and presentations</p>
          </div>
          <Link href="/admin/seminars/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Seminar
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {seminars.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No seminars found</p>
                <Link href="/admin/seminars/new">
                  <Button>Create your first seminar</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            seminars.map((seminar) => (
              <Card key={seminar.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{seminar.title}</CardTitle>
                      <CardDescription>{seminar.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(seminar.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{seminar.time}</span>
                        <span>•</span>
                        <span>{seminar.location}</span>
                        <span>•</span>
                        <span>Speaker: {seminar.speaker}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={seminar.status === "published" ? "default" : "secondary"}>{seminar.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/activities/seminar/${seminar.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/seminars/${seminar.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteSeminar(seminar.id)}>
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
