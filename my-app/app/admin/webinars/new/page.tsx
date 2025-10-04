"use client"

import React, { useState, useEffect } from "react"
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

export default function NewWebinarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    date: "",
    time: "",
    speaker: "",
    speaker_bio: "",
    organization: "",
    meeting_link: "",
    status: "draft" as "published" | "draft",
    objectives: "", // comma separated
  })

  // Files
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [speakerImageFile, setSpeakerImageFile] = useState<File | null>(null)
  const [audienceImageFile, setAudienceImageFile] = useState<File | null>(null)
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)

  // Previews
  const [preview, setPreview] = useState({
    image: "",
    speaker: "",
    audience: "",
  })

  useEffect(() => {
    // cleanup object URLs when unmounted or when file changes
    const urls: string[] = []
    const makePreview = (file: File | null, key: keyof typeof preview) => {
      if (!file) return
      const url = URL.createObjectURL(file)
      urls.push(url)
      setPreview((p) => ({ ...p, [key]: url }))
    }

    // create previews
    makePreview(imageFile, "image")
    makePreview(speakerImageFile, "speaker")
    makePreview(audienceImageFile, "audience")

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u))
      // reset previews on cleanup to avoid stale URLs
      setPreview((p) => ({ image: imageFile ? p.image : "", speaker: speakerImageFile ? p.speaker : "", audience: audienceImageFile ? p.audience : ""}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, speakerImageFile, audienceImageFile, coverImageFile])

  const validate = () => {
    if (!formData.title.trim()) return "Title is required."
    if (!formData.description.trim()) return "Short description is required."
    if (!formData.date) return "Date is required."
    if (!formData.time) return "Time is required."
    if (!formData.speaker.trim()) return "Speaker is required."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validate()
    if (err) {
      alert(err)
      return
    }

    setLoading(true)

    try {
      const fd = new FormData()

      // basic text fields
      fd.append("title", formData.title)
      fd.append("description", formData.description)
      fd.append("full_description", formData.details || formData.description)
      fd.append("date", formData.date)
      fd.append("time", formData.time)
      fd.append("speaker", formData.speaker)
      if (formData.organization) fd.append("organization", formData.organization)
      if (formData.speaker_bio) fd.append("designation", formData.speaker_bio) // optional mapping
      if (formData.meeting_link) fd.append("video_url", formData.meeting_link)
      if (formData.objectives.trim()) {
        fd.append("objectives", JSON.stringify(formData.objectives.split(",").map(o => o.trim())))
      } // comma separated string
      // include status if you want (API ignores unknown fields)
      fd.append("status", formData.status)

      // files (only append if chosen)
      if (imageFile) fd.append("image", imageFile)
      if (speakerImageFile) fd.append("speaker_image", speakerImageFile)
      if (audienceImageFile) fd.append("audience_image", audienceImageFile)

      const res = await fetch("http://localhost:5000/api/webinar", {
        method: "POST",
        body: fd, // browser will set multipart/form-data and boundary
      })

      if (res.ok) {
        // optional: read returned object
        // const created = await res.json()
        router.push("/admin/webinars")
      } else {
        const errBody = await res.json().catch(() => ({}))
        alert("Failed to create webinar: " + (errBody.error ?? res.statusText))
      }
    } catch (error) {
      console.error("Error creating webinar:", error)
      alert("Unexpected error creating webinar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/webinars">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Webinars
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">New Webinar</h1>
            <p className="text-muted-foreground">Create a new webinar event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Webinar Details</CardTitle>
                <CardDescription>Enter the main information about the webinar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Webinar title" required />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the webinar" rows={3} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="speaker">Speaker</Label>
                    <Input id="speaker" value={formData.speaker} onChange={(e) => setFormData({ ...formData, speaker: e.target.value })} placeholder="Speaker name" required />
                  </div>
                  <div>
                    <Label htmlFor="meeting_link">Meeting Link</Label>
                    <Input id="meeting_link" value={formData.meeting_link} onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })} placeholder="Zoom/Teams meeting link" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="speaker_bio">Speaker Bio</Label>
                  <Textarea id="speaker_bio" value={formData.speaker_bio} onChange={(e) => setFormData({ ...formData, speaker_bio: e.target.value })} placeholder="Brief biography of the speaker" rows={3} />
                </div>

                <div>
                  <Label htmlFor="details">Full Details</Label>
                  <Textarea id="details" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} placeholder="Detailed information about the webinar" rows={6} />
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
                  <Label>Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="image">Main Image</Label>
                      <input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />
                      {preview.image && <img src={preview.image} alt="main preview" className="mt-2 max-h-32 object-cover" />}
                    </div>
                    <div>
                      <Label htmlFor="speaker_image">Speaker Image</Label>
                      <input id="speaker_image" type="file" accept="image/*" onChange={(e) => setSpeakerImageFile(e.target.files?.[0] ?? null)} />
                      {preview.speaker && <img src={preview.speaker} alt="speaker preview" className="mt-2 max-h-32 object-cover" />}
                    </div>
                    <div>
                      <Label htmlFor="audience_image">Audience Image</Label>
                      <input id="audience_image" type="file" accept="image/*" onChange={(e) => setAudienceImageFile(e.target.files?.[0] ?? null)} />
                      {preview.audience && <img src={preview.audience} alt="audience preview" className="mt-2 max-h-32 object-cover" />}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} placeholder="MIT Civil Engineering" />
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
                  <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "published" | "draft") => setFormData({ ...formData, status: value })}>
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
                  {loading ? "Creating..." : "Create Webinar"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
