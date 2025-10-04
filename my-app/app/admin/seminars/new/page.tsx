"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewSeminarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    speaker: "",
    designation: "",
    attendees: "",
    full_description: "",
    video_url: "",
    objectives: "",
    status: "draft" as "published" | "draft",
  })
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [additionalImages, setAdditionalImages] = useState<(File | null)[]>([null, null])
  const [additionalCaptions, setAdditionalCaptions] = useState(["", ""])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("date", formData.date)
      data.append("time", formData.time)
      data.append("location", formData.location)
      data.append("speaker", formData.speaker)
      data.append("designation", formData.designation)
      data.append("attendees", formData.attendees)
      data.append("full_description", formData.full_description)
      data.append("video_url", formData.video_url)
      data.append("status", formData.status)
      // objectives as JSON string (comma separated in input)
      if (formData.objectives.trim()) {
        data.append("objectives", JSON.stringify(formData.objectives.split(",").map(o => o.trim())))
      }

      // Main image
      if (mainImage) data.append("image", mainImage)

      // Additional images and captions
      additionalImages.forEach((img, idx) => {
        if (img) data.append("additional_images", img)
        if (additionalCaptions[idx]) data.append(`additional_caption_${idx}`, additionalCaptions[idx])
      })

      const response = await fetch("http://localhost:5000/api/seminars", {
        method: "POST",
        body: data,
      })

      if (response.ok) {
        router.push("/admin/seminars")
      } else {
        alert("Error creating seminar")
      }
    } catch (error) {
      console.error("Error creating seminar:", error)
      alert("Error creating seminar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/seminars">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Seminars
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">New Seminar</h1>
            <p className="text-muted-foreground">Create a new seminar event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seminar Details</CardTitle>
                <CardDescription>Enter the main information about the seminar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Seminar title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the seminar"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="speaker">Speaker</Label>
                    <Input
                      id="speaker"
                      value={formData.speaker}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      placeholder="Speaker name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="Speaker designation"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Venue or room number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    placeholder="Number of attendees"
                  />
                </div>
                <div>
                  <Label htmlFor="full_description">Full Details</Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    placeholder="Detailed information about the seminar"
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Objectives</Label>
                  <Textarea
                    id="objectives"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    placeholder="Comma separated objectives"
                  />
                </div>
                <div>
                  <Label>Main Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={e => setMainImage(e.target.files?.[0] || null)}
                  />
                </div>
                <div>
                  <Label>Additional Images (up to 2)</Label>
                  {[0, 1].map(idx => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const files = [...additionalImages]
                          files[idx] = e.target.files?.[0] || null
                          setAdditionalImages(files)
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Caption"
                        value={additionalCaptions[idx]}
                        onChange={e => {
                          const captions = [...additionalCaptions]
                          captions[idx] = e.target.value
                          setAdditionalCaptions(captions)
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule & Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "published" | "draft") => setFormData({ ...formData, status: value })}
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

            <Card>
              <CardContent className="pt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Create Seminar"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
