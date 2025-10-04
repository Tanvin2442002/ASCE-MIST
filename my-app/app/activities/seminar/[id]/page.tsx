"use client"

import React, { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, User, Play, ExternalLink } from "lucide-react"

// const BA = process.env.NEXT_PUBLIC_BACKEND
interface Seminar {
  id: string
  title: string
  date: string
  time: string | null
  speaker: string | null
  designation: string | null
  location: string | null
  attendees: number | null
  image: string | null
  additional_images?: { url: string; caption: string }[] | string
  description: string | null
  full_description: string | null
  video_url: string | null
  objectives?: string[]
}

interface SeminarDetailPageProps {
  params: { id: string } | Promise<{ id: string }>
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND 

async function getSeminar(id: string): Promise<Seminar | null> {
  if (!BACKEND) return null

  try {
    // prefer single-item endpoint
    try {
      const singleRes = await fetch(`${BACKEND}/seminars/${id}`, { cache: "no-store" })
      if (singleRes.ok) {
        const singleData = (await singleRes.json()) as Seminar
        return singleData
      }
      // if 404 or other, fall through to list fetch
    } catch {
      // ignore and fallback to list fetch
    }

    const res = await fetch(`${BACKEND}/seminars`, { cache: "no-store" })
    if (!res.ok) return null
    const seminars: Seminar[] = await res.json()
    return seminars.find((s) => s.id === id) || null
  } catch {
    return null
  }
}

export default function SeminarDetailPage({ params }: SeminarDetailPageProps) {
  const [seminar, setSeminar] = useState<Seminar | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [id, setId] = useState<string | null>(null)

  // Safely unwrap params (supports both plain object and Promise)
  useEffect(() => {
    let mounted = true

    const resolveParams = async () => {
      try {
        const p = params as any
        const resolved = typeof p?.then === "function" ? await p : p
        if (mounted) setId(resolved?.id ?? null)
      } catch {
        if (mounted) setId(null)
      }
    }

    resolveParams()

    return () => {
      mounted = false
    }
  }, [params])

  useEffect(() => {
    if (!id) return

    let mounted = true

    const fetchSeminar = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getSeminar(id)
        if (!mounted) return

        if (!data) {
          setSeminar(null)
          setError("Seminar not found.")
          return
        }

        // ✅ Handle additional_images parsing safely (exact snippet you asked for)
        if (data && typeof data.additional_images === "string") {
          try {
            data.additional_images = JSON.parse(data.additional_images)
          } catch {
            data.additional_images = []
          }
        }

        setSeminar(data)
      } catch (err: any) {
        setError(err?.message || "Error fetching seminar")
        setSeminar(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchSeminar()

    return () => {
      mounted = false
    }
  }, [id])


  // Normalized array for rendering additional images (guaranteed array)
  const additionalImages: { url: string; caption?: string }[] = (() => {
    if (!seminar || !seminar.additional_images) return []
    if (Array.isArray(seminar.additional_images)) return seminar.additional_images
    if (typeof seminar.additional_images === "string") {
      try {
        const parsed = JSON.parse(seminar.additional_images)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  })()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading seminar details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        {/* <p>not foundddd</p> */}
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  if (!seminar) {
    // If fetch completed but no seminar found, show notFound page
    notFound()
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Link href="/activities/seminar">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seminars
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">{seminar.title}</h1>
          <div className="flex items-center justify-center text-gray-600 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-lg">
              Date: {seminar.date ? new Date(seminar.date).toLocaleDateString() : ""}{" "}
              {seminar.time && `• ${seminar.time}`}
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <img
            src={seminar.image || "/placeholder.svg"}
            alt={seminar.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-sm text-gray-600 mt-2">Seminar participants and faculty members</p>
        </div>

        {/* Speaker Info and Watch Button */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center mb-2">
                <User className="w-5 h-5 mr-2 text-gray-600" />
                <span className="font-semibold text-lg">{seminar.speaker ?? "TBA"}</span>
              </div>
              <p className="text-gray-600 ml-7">{seminar.designation ?? ""}</p>
              <div className="flex items-center mt-2 ml-7">
                <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-gray-600">{seminar.location ?? ""}</span>
              </div>
            </div>
            {seminar.video_url && (
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <a href={seminar.video_url} target="_blank" rel="noopener noreferrer">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Seminar
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Additional Images */}
        {additionalImages.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {additionalImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={img.caption || `additional-${index + 1}`}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
                {img.caption && <p className="text-center text-sm text-gray-600 mt-2">{img.caption}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Seminar Objectives */}
        {seminar.objectives && seminar.objectives.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seminar Objectives</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {seminar.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Description */}
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {seminar.full_description || seminar.description}
          </p>
        </div>

        {/* Watch Button (Bottom) */}
        {seminar.video_url && (
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
              <a href={seminar.video_url} target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 mr-2" />
                Watch Full Seminar
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
