"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
  status: "published" | "draft"
  created_at: string
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch("/api/admin/achievements")
      if (response.ok) {
        const data = await response.json()
        setAchievements(data)
      }
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAchievement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return

    try {
      const response = await fetch(`/api/admin/achievements/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setAchievements(achievements.filter((a) => a.id !== id))
      }
    } catch (error) {
      console.error("Error deleting achievement:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading achievements...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground">Manage student and chapter achievements</p>
          </div>
          <Link href="/admin/achievements/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Achievement
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {achievements.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No achievements found</p>
                <Link href="/admin/achievements/new">
                  <Button>Create your first achievement</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{achievement.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={achievement.status === "published" ? "default" : "secondary"}>
                        {achievement.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/activities/achievement/${achievement.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/achievements/${achievement.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteAchievement(achievement.id)}>
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
