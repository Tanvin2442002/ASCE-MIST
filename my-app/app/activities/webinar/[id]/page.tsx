"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample webinar data (same as in main page)
const webinars = [
  {
    id: 1,
    title: "Digital Transformation in Civil Engineering",
    date: "March 15, 2024",
    time: "3:00 PM - 4:30 PM",
    speaker: "Dr. Sarah Johnson",
    organization: "MIT Civil Engineering",
    image: "/images/digital-transformation-webinar.jpg",
    speakerImage: "/images/digital-transformation-speaker.jpg",
    audienceImage: "/images/digital-transformation-audience.jpg",
    description:
      "Exploring how digital technologies are revolutionizing the civil engineering industry, from BIM to AI-powered design tools.",
    fullDescription:
      "This comprehensive webinar explored the transformative impact of digital technologies on civil engineering practices. Dr. Sarah Johnson from MIT Civil Engineering presented cutting-edge research on Building Information Modeling (BIM), artificial intelligence applications in structural design, and the integration of IoT sensors in infrastructure monitoring. The session covered practical implementation strategies for engineering firms looking to embrace digital transformation, including case studies from major infrastructure projects that have successfully integrated these technologies. Participants gained insights into the future of civil engineering practice and the skills needed to thrive in an increasingly digital landscape.",
    objectives: [
      "Understanding the current state of digital transformation in civil engineering",
      "Learning about BIM implementation and its benefits",
      "Exploring AI applications in structural design and analysis",
      "Discovering IoT integration for infrastructure monitoring",
      "Developing strategies for digital adoption in engineering firms",
    ],
    videoUrl: "https://example.com/webinar-video-1",
  },
  // Add more webinar data as needed...
]

interface WebinarDetailPageProps {
  params: {
    id: string
  }
}

export default function WebinarDetailPage({ params }: WebinarDetailPageProps) {
  const webinarId = Number.parseInt(params.id)
  const webinar = webinars.find((w) => w.id === webinarId)

  if (!webinar) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Webinar Not Found</h1>
          <Link href="/activities/webinar">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Webinars</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/activities/webinar" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Webinars
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">Webinar: {webinar.title}</h1>
          <p className="text-gray-600 text-lg">
            Date: {webinar.date} | Time: {webinar.time}
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <img
            src={webinar.image || "/placeholder.svg"}
            alt={webinar.title}
            className="w-full max-w-4xl mx-auto h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-gray-600 mt-2 text-sm">
            Webinar session with participants and faculty members
          </p>
        </div>

        {/* Speaker Information */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Speaker Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{webinar.speaker}</h3>
                <p className="text-gray-700 mb-2">{webinar.organization}</p>
                <p className="text-gray-600 leading-relaxed">{webinar.description}</p>
              </div>
              <div>
                <img
                  src={webinar.speakerImage || "/images/default-speaker.jpg"}
                  alt={`${webinar.speaker} presenting`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-center text-gray-600 mt-2 text-sm">{webinar.speaker} during the presentation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <img
              src={webinar.speakerImage || "/images/default-speaker.jpg"}
              alt="Speaker presentation"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">Interactive presentation session</p>
          </div>
          <div>
            <img
              src={webinar.audienceImage || "/images/default-audience.jpg"}
              alt="Webinar participants"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">Engaged participants during Q&A session</p>
          </div>
        </div>

        {/* Webinar Objectives */}
        {webinar.objectives && (
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
              <ul className="space-y-2">
                {webinar.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Description */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Webinar</h2>
            <p className="text-gray-700 leading-relaxed">{webinar.fullDescription || webinar.description}</p>
          </CardContent>
        </Card>

        {/* Watch Webinar Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            onClick={() => window.open(webinar.videoUrl, "_blank")}
          >
            Watch Webinar Recording
          </Button>
        </div>
      </div>
    </div>
  )
}
