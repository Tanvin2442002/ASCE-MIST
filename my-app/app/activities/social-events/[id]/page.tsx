"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const backend = process.env.NEXT_PUBLIC_BACKEND

export default function SocialEventDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [event, setEvent] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${backend}/api/events/${id}`)
        if (!res.ok) throw new Error("Failed to fetch event")
        const data = await res.json()
        setEvent(data)
      } catch (err: any) {
        setError(err.message || "Error fetching event")
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading event details...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? error : "Event Not Found"}
          </h1>
          <Link href="/activities/social-events">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Back to Social Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/activities/social-events"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Social Events
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {event.type}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Social Event: {event.title}
          </h1>
          <p className="text-gray-600 text-lg">
            Date: {event.date} | Location: {event.location}
          </p>
        </div>

        {/* Main Event Image */}
        <div className="mb-8">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full max-w-4xl mx-auto h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-gray-600 mt-2 text-sm">
            Participants enjoying the social event activities
          </p>
        </div>

        {/* Event Information */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Date:</span> {event.date}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Location:</span> {event.location}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Type:</span> {event.type}
                </p>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
              <div>
                <img
                  src={event.group_image || "/images/default-group.jpg"}
                  alt="Event group photo"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-center text-gray-600 mt-2 text-sm">
                  Group photo of event participants
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <img
              src={event.group_image || "/images/default-group.jpg"}
              alt="Event activities"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Participants engaged in event activities
            </p>
          </div>
          <div>
            <img
              src={event.activities_image || "/images/default-activities.jpg"}
              alt="Event highlights"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">
              Memorable moments from the event
            </p>
          </div>
        </div>

        {/* Event Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Highlights</h2>
              <ul className="space-y-2">
                {event.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Organizers */}
        {event.organizers && event.organizers.length > 0 && (
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Organized By</h2>
              <ul className="space-y-2">
                {event.organizers.map((organizer: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{organizer}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Event Description */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <p className="text-gray-700 leading-relaxed">
              {event.full_description || event.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
