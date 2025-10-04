"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, User, ExternalLink } from "lucide-react"

interface EventDetail {
  id: number | string
  title: string
  date: string
  time?: string | null
  location?: string | null
  organizer?: string | null
  category?: string
  image?: string | null
  description?: string | null
  full_description?: string | null
  registration_link?: string | null
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(`http://localhost:5000/api/upcoming-events/${params.id}`)
        if (!res.ok) {
          if (res.status === 404) {
            notFound()
            return
          }
          throw new Error("Failed to fetch")
        }
        const data: EventDetail = await res.json()
        setEvent(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading event details...</p>
      </div>
    )
  }

  if (error || !event) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Event Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 mb-6 space-x-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-1" />
            <span>{event.date}</span>
            {event.time && <span> • {event.time}</span>}
          </div>
          {event.location && (
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{event.location}</span>
            </div>
          )}
          {event.organizer && (
            <div className="flex items-center">
              <User className="w-5 h-5 mr-1" />
              <span>{event.organizer}</span>
            </div>
          )}
        </div>

        {/* Event Image */}
        {event.image && (
          <div className="mb-6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Event Description */}
        <div className="prose max-w-none text-gray-700 mb-8">
          <p>{event.full_description || event.description}</p>
        </div>

        {/* Registration Button */}
        {event.registration_link && (
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                Register for Event
                <ExternalLink className="w-4 h-4 ml-2 inline-block" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
