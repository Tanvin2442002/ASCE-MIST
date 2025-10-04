"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

interface SiteVisit {
  id: number
  title: string
  location: string
  description: string
  visit_date: string
  duration: string
  participants: string
  category: string
  status: "draft" | "published"
  created_at: string
}

export default function SiteVisitsPage() {
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchSiteVisits()
  }, [])

  const fetchSiteVisits = async () => {
    try {
      const response = await fetch("/api/admin/site-visits")
      if (response.ok) {
        const data = await response.json()
        setSiteVisits(data)
      }
    } catch (error) {
      console.error("Error fetching site visits:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this site visit?")) {
      try {
        const response = await fetch(`/api/admin/site-visits/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setSiteVisits(siteVisits.filter((visit) => visit.id !== id))
        }
      } catch (error) {
        console.error("Error deleting site visit:", error)
      }
    }
  }

  const filteredSiteVisits = siteVisits.filter((visit) => {
    const matchesSearch =
      visit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || visit.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Site Visits</h1>
            <p className="text-muted-foreground">Manage educational site visits and field trips</p>
          </div>
          <Link href="/admin/site-visits/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Site Visit
            </Button>
          </Link>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search site visits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSiteVisits.map((visit) => (
              <Card key={visit.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{visit.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {visit.location}
                      </CardDescription>
                    </div>
                    <Badge variant={visit.status === "published" ? "default" : "secondary"}>{visit.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{visit.description}</p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(visit.visit_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {visit.participants}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(visit.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredSiteVisits.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No site visits found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "No site visits match your current filters."
                  : "Get started by creating your first site visit."}
              </p>
              <Link href="/admin/site-visits/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Site Visit
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
