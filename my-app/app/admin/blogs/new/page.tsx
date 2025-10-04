"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    type: "",
    image: null as File | null,
    group_image: null as File | null,
    activities_image: null as File | null,
    description: "",
    full_description: "",
    highlights: [] as string[],
    organizers: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("date", formData.date);
      form.append("location", formData.location);
      form.append("type", formData.type);
      form.append("description", formData.description);
      form.append("full_description", formData.full_description);

      // arrays → JSON strings
      form.append("highlights", JSON.stringify(formData.highlights));
      form.append("organizers", JSON.stringify(formData.organizers));

      if (formData.image) form.append("image", formData.image);
      if (formData.group_image)
        form.append("group_image", formData.group_image);
      if (formData.activities_image)
        form.append("activities_image", formData.activities_image);

      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        router.push("/admin/blogs");
      } else {
        alert("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">New Event</h1>
            <p className="text-muted-foreground">Create a new event</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Event Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>
                  Enter the main details about the event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Event title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Savar Lake Resort"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    placeholder="Recreation, Seminar, Workshop..."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief overview of the event"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea
                    id="full_description"
                    value={formData.full_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_description: e.target.value,
                      })
                    }
                    placeholder="Detailed event description"
                    rows={8}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Provide image URLs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image">Main Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="group_image">Group Image</Label>
                  <Input
                    id="group_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        group_image: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="activities_image">Activities Image</Label>
                  <Input
                    id="activities_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activities_image: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
                <CardDescription>Enter one highlight per line</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.highlights.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      highlights: e.target.value.split("\n"),
                    })
                  }
                  placeholder="Over 200 participants\nBoat rides and fishing\nSports competitions..."
                  rows={5}
                />
              </CardContent>
            </Card>

            {/* Organizers */}
            <Card>
              <CardHeader>
                <CardTitle>Organizers</CardTitle>
                <CardDescription>Enter one organizer per line</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.organizers.join("\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organizers: e.target.value.split("\n"),
                    })
                  }
                  placeholder="ASCE Student Chapter Executive Committee\nEvent Management Team\nFaculty Advisors"
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
