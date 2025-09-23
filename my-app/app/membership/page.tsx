import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ExternalLink, UserPlus } from "lucide-react"

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join ASCE @ MIST</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Become part of the premier civil engineering student organization at Military Institute of Science and
            Technology. Connect with fellow engineers, participate in professional development, and build your career
            network.
          </p>
        </div>

        {/* Membership Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Network</h3>
              <p className="text-gray-600">
                Connect with industry professionals, alumni, and fellow students in civil engineering.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Development</h3>
              <p className="text-gray-600">Access exclusive workshops, seminars, and career guidance opportunities.</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Exposure</h3>
              <p className="text-gray-600">
                Participate in site visits, technical presentations, and industry partnerships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Join Us?</h2>

              {/* Become a Member Button */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current MIST Students</h3>
                <p className="text-gray-600 mb-6">
                  Join the ASCE Student Chapter at MIST and become part of our engineering community.
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe0xuFrGvs5FFmGOeql3iXLP-E1Fh3C9h7hW_i43gJDPfzRvQ/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Become a Member
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* ASCE National Membership Button */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Not an ASCE Member Yet?</h3>
                <p className="text-gray-600 mb-6">
                  Join the American Society of Civil Engineers nationally to access exclusive resources, publications,
                  and professional development opportunities.
                </p>
                <a
                  href="https://www.asce.org/membership/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg bg-transparent"
                  >
                    Join ASCE Nationally
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            For questions about membership or our activities, feel free to contact us through our official channels. We
            welcome all civil engineering students who are passionate about professional development and community
            building.
          </p>
        </div>
      </main>
    </div>
  )
}
