"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, Award, Users, ExternalLink, Calendar, User } from "lucide-react"
import { useState, useEffect } from "react"

export default function PublicationPage() {
  const [publications, setPublications] = useState([])

  // Placeholder for fetching publications from API
  useEffect(() => {
    // TODO: Fetch publications from API
    // fetch('/api/public/publications')
    //   .then(res => res.json())
    //   .then(data => setPublications(data))
    setPublications([]) // Empty for now
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600/20 backdrop-blur-sm border border-green-500/30 mb-8">
              <BookOpen className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-100 to-white">
              Publications
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Advancing civil engineering knowledge through research, innovation, and scholarly contributions to the
              field
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Publication Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Journal Articles</h3>
              <p className="text-3xl font-bold text-blue-600 mb-1">0</p>
              <p className="text-sm text-gray-500">Published papers</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conference Papers</h3>
              <p className="text-3xl font-bold text-purple-600 mb-1">0</p>
              <p className="text-sm text-gray-500">Presentations</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Technical Reports</h3>
              <p className="text-3xl font-bold text-green-600 mb-1">0</p>
              <p className="text-sm text-gray-500">Research reports</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Collaborations</h3>
              <p className="text-3xl font-bold text-orange-600 mb-1">0</p>
              <p className="text-sm text-gray-500">Joint research</p>
            </CardContent>
          </Card>
        </div>

        {/* Papers Showcase Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Published Papers</h2>
              <p className="text-gray-600">Explore our latest research contributions and scholarly work</p>
            </div>
          </div>

          {publications.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Papers Published Yet</h3>
                <p className="text-gray-500">
                  Check back soon for our latest research publications and scholarly contributions.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications.map((paper: any) => (
                <Card
                  key={paper.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {paper.type || "Journal Article"}
                      </span>
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {paper.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <User className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{paper.authors}</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{paper.abstract}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">{paper.publication_date}</span>
                      <ExternalLink className="h-4 w-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50" />
              <CardContent className="relative p-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-blue-100 mb-8">
                  <BookOpen className="h-12 w-12 text-green-700" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">Building Our Research Portfolio</h2>

                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Our publications section is currently under development. We are actively working on research projects
                  and scholarly contributions that will be featured here soon.
                </p>

                {/* Research Focus Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🏗️</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Structural Engineering</h3>
                        <p className="text-sm text-gray-600">
                          Earthquake-resistant design, high-rise structures, and innovative materials
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🌱</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Sustainable Infrastructure</h3>
                        <p className="text-sm text-gray-600">
                          Green building practices, renewable materials, and eco-friendly design
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">💧</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Water Resources</h3>
                        <p className="text-sm text-gray-600">
                          Flood management, coastal engineering, and water treatment systems
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 text-left shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🚗</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Transportation Engineering</h3>
                        <p className="text-sm text-gray-600">
                          Traffic management, smart mobility, and infrastructure planning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Interested in Contributing?</h3>
                  <p className="text-gray-600 mb-6">
                    We welcome research collaborations and scholarly contributions from our members. If you have
                    published work or ongoing research, we would love to feature it here.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Submit Your Research
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    <a
                      href="/membership"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 border-2 border-gray-200"
                    >
                      Join Our Chapter
                    </a>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Publication Guidelines</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Learn about our standards for research quality, citation formats, and submission requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Research Mentorship</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Connect with faculty advisors and senior members for guidance on your research projects.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Research Awards</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore opportunities for research grants, scholarships, and recognition programs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
