"use client"

import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Event {
  id: string
  title: string
  date: string
  location: string
  type: string
  image?: string
}

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${backend}/api/events`)
        const data = await res.json()
        setEvents(data)
      } catch (err) {
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header + New Event */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Event Management</h1>
            <p className="text-slate-600 mt-2">Create and manage social events</p>
          </div>
          <Button asChild>
            <Link href="/admin/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Link>
          </Button>
        </div>

        {/* Event List */}
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>Manage your upcoming and past events</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-center py-6">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No events found</p>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row items-center md:items-start justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    {/* Event Info */}
                    <div className="flex items-center gap-4 flex-1">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-24 h-24 object-cover rounded-lg hidden md:block"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-slate-900">{event.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{event.location}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/events/${event.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/events/edit/${event.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                        onClick={() => alert("Delete event: " + event.id)}
                      >
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
