"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"

interface SiteVisit {
  id: number
  title: string
  location: string
  date: string
  description: string
  image: string
  participants: number
  department?: string
}

const siteVisits: SiteVisit[] = [
  {
    id: 1,
    title: "Educational Visit to Padma Multipurpose Bridge",
    location: "Padma Bridge, Bangladesh",
    date: "December 15, 2022",
    description:
      "Students from the Civil Engineering department visited the iconic Padma Multipurpose Bridge to understand the engineering marvels and construction techniques used in this mega infrastructure project.",
    image: "/images/padma-bridge-visit.png",
    participants: 45,
    department: "Civil Engineering",
  },
  {
    id: 2,
    title: "Educational field visit to Hazrat Shahjalal International Airport Expansion Project",
    location: "Hazrat Shahjalal International Airport, Dhaka",
    date: "November 28, 2022",
    description:
      "A comprehensive site visit to observe the ongoing expansion project Phase-1 by Batch 18 to Batch 22 students, focusing on modern airport infrastructure and construction management.",
    image: "/airport-construction-site-with-students-in-safety-.jpg",
    participants: 38,
    department: "Civil Engineering",
  },
  {
    id: 3,
    title: "Metro Rail Construction Site Visit",
    location: "Dhaka Metro Rail Project, Dhaka",
    date: "October 20, 2022",
    description:
      "Students explored the construction techniques and engineering challenges involved in building Bangladesh's first metro rail system.",
    image: "/metro-rail-construction-site-with-engineering-stud.jpg",
    participants: 32,
    department: "Civil Engineering",
  },
  {
    id: 4,
    title: "Karnaphuli Tunnel Project Visit",
    location: "Karnaphuli Tunnel, Chittagong",
    date: "September 15, 2022",
    description:
      "An educational tour to understand underwater tunnel construction technology and the engineering solutions implemented in this groundbreaking project.",
    image: "/underwater-tunnel-construction-with-engineering-st.jpg",
    participants: 28,
    department: "Civil Engineering",
  },
  {
    id: 5,
    title: "Rooppur Nuclear Power Plant Site Visit",
    location: "Rooppur Nuclear Power Plant, Pabna",
    date: "August 25, 2022",
    description:
      "Students visited the construction site of Bangladesh's first nuclear power plant to learn about nuclear engineering and safety protocols.",
    image: "/nuclear-power-plant-construction-site-with-student.jpg",
    participants: 25,
    department: "Nuclear Engineering",
  },
  {
    id: 6,
    title: "Dhaka Elevated Expressway Construction Visit",
    location: "Dhaka Elevated Expressway, Dhaka",
    date: "July 18, 2022",
    description:
      "An insightful visit to observe the construction of the elevated expressway and understand urban infrastructure development challenges.",
    image: "/elevated-expressway-construction-with-civil-engine.jpg",
    participants: 35,
    department: "Civil Engineering",
  },
  {
    id: 7,
    title: "Bangabandhu Sheikh Mujib Railway Bridge Visit",
    location: "Jamuna River, Tangail",
    date: "June 22, 2022",
    description:
      "Students explored the engineering aspects of the dual-gauge railway bridge and its significance in Bangladesh's transportation network.",
    image: "/railway-bridge-construction-over-river-with-studen.jpg",
    participants: 30,
    department: "Civil Engineering",
  },
  {
    id: 8,
    title: "Matarbari Deep Sea Port Project Visit",
    location: "Matarbari, Cox's Bazar",
    date: "May 28, 2022",
    description:
      "A field visit to understand port engineering, marine construction techniques, and the strategic importance of deep sea ports.",
    image: "/deep-sea-port-construction-with-marine-engineering.jpg",
    participants: 22,
    department: "Naval Architecture & Marine Engineering",
  },
  {
    id: 9,
    title: "Dhaka Water Treatment Plant Visit",
    location: "Saidabad Water Treatment Plant, Dhaka",
    date: "April 15, 2022",
    description:
      "Students learned about water treatment processes, environmental engineering principles, and sustainable water management practices.",
    image: "/water-treatment-plant-with-environmental-engineeri.jpg",
    participants: 40,
    department: "Environmental Engineering",
  },
  {
    id: 10,
    title: "Bangabandhu Satellite Ground Station Visit",
    location: "Gazipur, Dhaka",
    date: "March 20, 2022",
    description: "An educational visit to understand satellite communication technology and ground station operations.",
    image: "/satellite-ground-station-with-telecommunications-s.jpg",
    participants: 18,
    department: "Electrical & Electronic Engineering",
  },
  {
    id: 11,
    title: "Dhaka-Chittagong Highway Expansion Project",
    location: "Dhaka-Chittagong Highway",
    date: "February 25, 2022",
    description:
      "Students observed highway construction techniques, traffic engineering solutions, and infrastructure development strategies.",
    image: "/highway-construction-project-with-transportation-e.jpg",
    participants: 33,
    department: "Civil Engineering",
  },
  {
    id: 12,
    title: "Payra Seaport Development Project Visit",
    location: "Payra Port, Patuakhali",
    date: "January 30, 2022",
    description:
      "A comprehensive site visit to understand seaport development, coastal engineering, and maritime infrastructure.",
    image: "/seaport-development-construction-with-coastal-engi.jpg",
    participants: 26,
    department: "Civil Engineering",
  },
]

const ITEMS_PER_PAGE = 10

export default function SiteVisitPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(siteVisits.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentVisits = siteVisits.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  return (
    <div className="bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">Site Visits</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
            Explore our educational field visits and site tours that provide hands-on learning experiences for students
            across various engineering disciplines. These visits bridge the gap between theoretical knowledge and
            practical application.
          </p>
        </div>

        {/* Site Visits Grid */}
        <div className="space-y-8 mb-12">
          {currentVisits.map((visit) => (
            <Link key={visit.id} href={`/activities/site-visit/${visit.id}`}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={visit.image || "/placeholder.svg"}
                      alt={visit.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-1/2 p-6 md:p-8">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 text-balance">{visit.title}</h2>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <span>{visit.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span>{visit.location}</span>
                        </div>
                      </div>

                      {visit.department && (
                        <div className="inline-block">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {visit.department}
                          </span>
                        </div>
                      )}

                      <p className="text-gray-700 leading-relaxed text-pretty">{visit.description}</p>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className="flex items-center gap-1 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 ${
                    currentPage === page
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 bg-transparent"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, siteVisits.length)} of {siteVisits.length} site visits
        </div>
      </main>
    </div>
  )
}
