// app/admin/site-visits/new/page.jsx
"use client"

import React, { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND

export default function NewSiteVisit() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    highlights: "",
    learningOutcomes: "",
    date: "",
    duration: "",
    participants: "",
    category: "",
    status: "draft",
  })
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleFileChange = (e:any) => {
    setError(null)
    const list = e.target.files
    if (!list) return
    const arr:any = Array.from(list).slice(0, 3)
    setFiles(arr)
  }

  const handleChange = (key:any, value:any) => {
    setFormData((s) => ({ ...s, [key]: value }))
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!formData.title.trim() || !formData.description.trim() || !formData.date) {
      setError("Title, description and visit date are required.")
      return
    }

    setSubmitting(true)
    try {
      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("location", formData.location)
      payload.append("description", formData.description)
      payload.append("highlights", formData.highlights)
      payload.append("learning_outcomes", formData.learningOutcomes)
      payload.append("visit_date", formData.date)
      payload.append("duration", formData.duration)
      payload.append("max_participants", formData.participants)
      payload.append("category", formData.category)
      payload.append("status", formData.status)

      files.slice(0, 3).forEach((file) => {
        payload.append("images", file, file.name)
      })

      const resp = await fetch(`${API_BASE}/api/site-visits/upload`, {
        method: "POST",
        body: payload,
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => null)
        throw new Error(err?.error || `Request failed with status ${resp.status}`)
      }

      const created = await resp.json()
      setSuccess("Site visit created successfully.")
      setFormData({
        title: "",
        location: "",
        description: "",
        highlights: "",
        learningOutcomes: "",
        date: "",
        duration: "",
        participants: "",
        category: "",
        status: "draft",
      })
      setFiles([])
      console.log("created site visit:", created)
    } catch (err) {
      console.error(err)
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Something went wrong"
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/site-visits">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Site Visits
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Site Visit</h1>
            <p className="text-slate-600 mt-2">Add a new site visit experience</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Visit Details</CardTitle>
                  <CardDescription>Enter the site visit information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Enter site visit title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Enter location"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Describe the site visit"
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="highlights">Key Highlights</Label>
                    <Textarea
                      id="highlights"
                      value={formData.highlights}
                      onChange={(e) => handleChange("highlights", e.target.value)}
                      placeholder="One per line"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="learningOutcomes">Learning Outcomes</Label>
                    <Textarea
                      id="learningOutcomes"
                      value={formData.learningOutcomes}
                      onChange={(e) => handleChange("learningOutcomes", e.target.value)}
                      placeholder="One per line"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visit Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date">Visit Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="e.g., Full day (9:00 AM - 4:00 PM)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="participants">Participants</Label>
                    <Input
                      id="participants"
                      type="number"
                      min={1}
                      value={formData.participants}
                      onChange={(e) => handleChange("participants", e.target.value)}
                      placeholder="e.g., 50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Environmental">Environmental</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="images">Images (up to 3)</Label>
                    <input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="mt-2"
                    />
                    {files.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {files.map((f, i) => (
                          <div key={i} className="text-sm truncate max-w-[150px]">
                            {f.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={submitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {submitting ? "Saving..." : "Save Site Visit"}
                </Button>
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>

              {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
              {success && <div className="text-sm text-green-600 mt-2">{success}</div>}
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
