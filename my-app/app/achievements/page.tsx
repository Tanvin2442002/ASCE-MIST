"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample achievements data
const achievements = [
  {
    id: 1,
    title: "Best Student Chapter Award 2024",
    category: "Chapter Excellence",
    date: "2024-03-15",
    description:
      "Recognized as the Best ASCE Student Chapter in Bangladesh for outstanding activities and member engagement.",
    image: "/images/best-chapter-award.jpg",
    awardedBy: "ASCE International",
    level: "National",
  },
  {
    id: 2,
    title: "Outstanding Community Service Project",
    category: "Community Service",
    date: "2024-02-20",
    description: "Awarded for the flood relief infrastructure project that helped 500+ families in rural Bangladesh.",
    image: "/images/community-service-award.jpg",
    awardedBy: "Bangladesh Engineering Council",
    level: "National",
  },
  {
    id: 3,
    title: "Innovation in Sustainable Engineering",
    category: "Innovation",
    date: "2024-01-10",
    description: "Recognition for developing eco-friendly concrete solutions using local waste materials.",
    image: "/images/innovation-award.jpg",
    awardedBy: "Green Engineering Society",
    level: "International",
  },
  {
    id: 4,
    title: "Student Leadership Excellence",
    category: "Leadership",
    date: "2023-12-05",
    description:
      "Awarded to chapter president for exceptional leadership in organizing technical events and workshops.",
    image: "/images/leadership-award.jpg",
    awardedBy: "MIST Administration",
    level: "Institutional",
  },
  {
    id: 5,
    title: "Best Technical Paper Presentation",
    category: "Research",
    date: "2023-11-18",
    description: "First place in national student paper competition for research on earthquake-resistant structures.",
    image: "/images/technical-paper-award.jpg",
    awardedBy: "Bangladesh Earthquake Society",
    level: "National",
  },
  {
    id: 6,
    title: "Outstanding Volunteer Service",
    category: "Volunteer Service",
    date: "2023-10-25",
    description:
      "Recognition for 200+ hours of volunteer service in disaster relief and community development projects.",
    image: "/images/volunteer-award.jpg",
    awardedBy: "National Volunteer Association",
    level: "National",
  },
  {
    id: 7,
    title: "Excellence in Academic Performance",
    category: "Academic",
    date: "2023-09-12",
    description: "Collective recognition for maintaining highest GPA among all student organizations at MIST.",
    image: "/images/academic-excellence.jpg",
    awardedBy: "MIST Academic Council",
    level: "Institutional",
  },
  {
    id: 8,
    title: "Best Engineering Design Competition",
    category: "Competition",
    date: "2023-08-30",
    description: "First place in inter-university bridge design competition with innovative cable-stayed design.",
    image: "/images/design-competition.jpg",
    awardedBy: "Engineering Design Council",
    level: "National",
  },
  {
    id: 9,
    title: "Outstanding Event Organization",
    category: "Event Management",
    date: "2023-07-14",
    description: "Excellence award for organizing the largest student engineering conference in Bangladesh.",
    image: "/images/event-organization.jpg",
    awardedBy: "Conference Management Board",
    level: "National",
  },
  {
    id: 10,
    title: "Environmental Impact Recognition",
    category: "Environment",
    date: "2023-06-22",
    description: "Awarded for implementing campus-wide water conservation project reducing usage by 30%.",
    image: "/images/environmental-award.jpg",
    awardedBy: "Environmental Protection Agency",
    level: "National",
  },
  {
    id: 11,
    title: "Student Mentorship Excellence",
    category: "Mentorship",
    date: "2023-05-08",
    description: "Recognition for establishing successful peer mentoring program for junior engineering students.",
    image: "/images/mentorship-award.jpg",
    awardedBy: "Student Development Council",
    level: "Institutional",
  },
  {
    id: 12,
    title: "Technology Innovation Award",
    category: "Technology",
    date: "2023-04-16",
    description: "Awarded for developing mobile app for structural health monitoring using IoT sensors.",
    image: "/images/technology-award.jpg",
    awardedBy: "Tech Innovation Hub",
    level: "International",
  },
]

const ITEMS_PER_PAGE = 10

export default function AchievementsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(achievements.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAchievements = achievements.slice(startIndex, endIndex)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Chapter Excellence": "bg-purple-100 text-purple-800",
      "Community Service": "bg-blue-100 text-blue-800",
      Innovation: "bg-green-100 text-green-800",
      Leadership: "bg-yellow-100 text-yellow-800",
      Research: "bg-red-100 text-red-800",
      "Volunteer Service": "bg-indigo-100 text-indigo-800",
      Academic: "bg-pink-100 text-pink-800",
      Competition: "bg-orange-100 text-orange-800",
      "Event Management": "bg-teal-100 text-teal-800",
      Environment: "bg-emerald-100 text-emerald-800",
      Mentorship: "bg-violet-100 text-violet-800",
      Technology: "bg-cyan-100 text-cyan-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      International: "bg-gold-100 text-gold-800 border-gold-200",
      National: "bg-silver-100 text-silver-800 border-silver-200",
      Institutional: "bg-bronze-100 text-bronze-800 border-bronze-200",
    }
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Celebrating our journey of excellence, innovation, and service to the engineering community. These
            achievements reflect our commitment to academic excellence and community impact.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <Link href={`/achievements/${achievement.id}`} className="block">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={achievement.image || "/placeholder.svg"}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getLevelColor(achievement.level)} border`}>{achievement.level}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(achievement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {achievement.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Awarded by: {achievement.awardedBy}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-900 border-gray-400 hover:bg-gray-50 hover:border-gray-500 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-gray-900 border-gray-300 hover:bg-gray-50"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "text-gray-900 border-gray-300 hover:bg-gray-50"
                }
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-gray-900 border-gray-300 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
