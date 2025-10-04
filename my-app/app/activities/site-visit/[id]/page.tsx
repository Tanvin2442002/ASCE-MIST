"use client"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


const backend = process.env.NEXT_PUBLIC_BACKEND
interface SiteVisit {
  id: string
  title: string
  location: string
  description: string
  highlights?: string
  learning_outcomes?: string
  visit_date?: string
  duration?: string
  max_participants?: number
  category?: string
  status?: string
  image_urls?: string[]
  department?: string
  registration_deadline?: string
}

// Fetch a single site visit by ID from backend
async function getSiteVisitById(id: string): Promise<SiteVisit | null> {
  try {
    const res = await fetch(`${backend}/api/site-visits/${id}`, { cache: "no-store" })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

interface PageProps {
  params: {
    id: string
  }
}

export default function SiteVisitDetailPage({ params }: PageProps) {
  const [visit, setVisit] = useState<SiteVisit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const data = await getSiteVisitById(params.id)
        if (!data) {
          setError("Site visit not found.")
          return
        }
        setVisit(data)
      } catch (err: any) {
        setError(err?.message || "Error fetching site visit")
      } finally {
        setLoading(false)
      }
    }

    fetchVisit()
  }, [params.id])

  const images = visit?.image_urls || []

  const formatDate = (d?: string) => {
    if (!d) return "TBA"
    try {
      return new Date(d).toLocaleDateString()
    } catch {
      return d
    }
  }

  const Img = ({ src, alt }: { src: string; alt?: string }) => (
    <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-sm">
      <img
        src={src}
        alt={alt || ""}
        className="w-full h-full object-cover"
        style={{ objectPosition: "50% 70%" }}
      />
    </div>
  )

  const renderList = (text?: string) => {
    if (!text) return null
    // support both \r\n and \n
    return (
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {text.split(/\r?\n/).map(
          (line, idx) =>
            line.trim() && (
              <li key={idx} className="leading-relaxed">
                {line}
              </li>
            )
        )}
      </ul>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading site visit details...</p>
      </div>
    )
  }
  if(!visit || error) {
    return notFound()
  }

  return (
    <div className="bg-gray-50 py-8">
      <main className="container mx-auto px-4 max-w-5xl space-y-8">
        {/* Back */}
        <div>
          <Link href="/activities/site-visit">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site Visits
            </Button>
          </Link>
        </div>

        {/* Title card */}
        <Card>
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {visit.title}
              </h1>
              <p className="text-gray-600 mt-1">{visit.location}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-medium text-gray-800">Date:</span>{" "}
                  {formatDate(visit.visit_date)}
                </div>
                {visit.duration && (
                  <div>
                    <span className="font-medium text-gray-800">Duration:</span>{" "}
                    {visit.duration}
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-800">
                    Participants:
                  </span>{" "}
                  {visit.max_participants ?? "N/A"}
                </div>
                {visit.category && (
                  <div>
                    <span className="font-medium text-gray-800">Category:</span>{" "}
                    {visit.category}
                  </div>
                )}
                {visit.registration_deadline && (
                  <div>
                    <span className="font-medium text-gray-800">
                      Registration Deadline:
                    </span>{" "}
                    {new Date(
                      visit.registration_deadline
                    ).toLocaleDateString()}
                  </div>
                )}
                {visit.status && (
                  <div>
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    {visit.status}
                  </div>
                )}
              </div>
              {visit.department && (
                <span className="inline-block mt-2 sm:mt-0 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {visit.department}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Images grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Img src={images[0]} alt={`${visit.title} - main`} />
            </div>
            {images[1] && <Img src={images[1]} alt={`${visit.title} - 2`} />}
            {images[2] && <Img src={images[2]} alt={`${visit.title} - 3`} />}
          </div>
        )}

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {visit.description}
              </p>
            </CardContent>
          </Card>

          {visit.highlights && (
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent>{renderList(visit.highlights)}</CardContent>
            </Card>
          )}

          {visit.learning_outcomes && (
            <Card>
              <CardHeader>
                <CardTitle>Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent>{renderList(visit.learning_outcomes)}</CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
