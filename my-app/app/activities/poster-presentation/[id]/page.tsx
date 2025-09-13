import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample poster presentation data (same as in main page)
const posterPresentations = [
  {
    id: 1,
    title: "Innovative Concrete Mix Design for High-Rise Buildings",
    date: "April 20, 2024",
    presenter: "Md. Rafiqul Islam",
    department: "Civil Engineering, MIST",
    category: "Structural Engineering",
    image: "/images/concrete-mix-poster.jpg",
    posterImage: "/images/concrete-mix-poster-full.jpg",
    presentationImage: "/images/concrete-mix-presentation.jpg",
    description:
      "Research on developing high-strength concrete mixtures optimized for tall building construction in Bangladesh's climate.",
    fullDescription:
      "This comprehensive research project focused on developing innovative concrete mix designs specifically tailored for high-rise building construction in Bangladesh's tropical climate. The study investigated various admixtures, local materials, and curing techniques to achieve optimal strength and durability. The research included extensive laboratory testing, field trials, and performance analysis under different environmental conditions. The findings contribute significantly to sustainable construction practices and cost-effective building solutions for the region.",
    methodology: [
      "Literature review of existing concrete mix designs",
      "Material characterization and selection",
      "Laboratory testing of various mix proportions",
      "Strength and durability analysis",
      "Field validation and performance monitoring",
    ],
    results: [
      "Achieved 25% increase in compressive strength",
      "Improved workability and reduced segregation",
      "Enhanced durability against tropical weather conditions",
      "Cost reduction of 15% compared to conventional mixes",
    ],
  },
  // Add more poster data as needed...
]

interface PosterDetailPageProps {
  params: {
    id: string
  }
}

export default function PosterDetailPage({ params }: PosterDetailPageProps) {
  const posterId = Number.parseInt(params.id)
  const poster = posterPresentations.find((p) => p.id === posterId)

  if (!poster) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Poster Not Found</h1>
          <Link href="/activities/poster-presentation">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Poster Presentations</Button>
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
          href="/activities/poster-presentation"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Poster Presentations
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {poster.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Poster Presentation: {poster.title}
          </h1>
          <p className="text-gray-600 text-lg">Date: {poster.date}</p>
        </div>

        {/* Main Poster Image */}
        <div className="mb-8">
          <img
            src={poster.image || "/placeholder.svg"}
            alt={poster.title}
            className="w-full max-w-4xl mx-auto h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-gray-600 mt-2 text-sm">Research poster presentation display</p>
        </div>

        {/* Presenter Information */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Presenter Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{poster.presenter}</h3>
                <p className="text-gray-700 mb-2">{poster.department}</p>
                <p className="text-gray-600 leading-relaxed">{poster.description}</p>
              </div>
              <div>
                <img
                  src={poster.presentationImage || "/images/default-presentation.jpg"}
                  alt={`${poster.presenter} presenting`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-center text-gray-600 mt-2 text-sm">{poster.presenter} presenting the research</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Images */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <img
              src={poster.posterImage || "/images/default-poster.jpg"}
              alt="Full poster display"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">Complete poster presentation layout</p>
          </div>
          <div>
            <img
              src={poster.presentationImage || "/images/default-presentation.jpg"}
              alt="Presentation session"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <p className="text-center text-gray-600 mt-2 text-sm">Interactive discussion with evaluators</p>
          </div>
        </div>

        {/* Research Methodology */}
        {poster.methodology && (
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Methodology</h2>
              <ul className="space-y-2">
                {poster.methodology.map((method, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{method}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Key Results */}
        {poster.results && (
          <Card className="mb-8 bg-white">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Results</h2>
              <ul className="space-y-2">
                {poster.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Abstract */}
        <Card className="mb-8 bg-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Abstract</h2>
            <p className="text-gray-700 leading-relaxed">{poster.fullDescription || poster.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
