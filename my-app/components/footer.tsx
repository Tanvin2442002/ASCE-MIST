import { MapPin, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-accent/20 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ASCE Student Chapter</h3>
                <p className="text-sm opacity-80">MIST, Bangladesh</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Building the future of civil engineering through education, research, and professional development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>MIST Campus, Mirpur Cantonment, Dhaka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>asce@mist.ac.bd</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+880-2-8031101</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block hover:text-primary transition-colors">
                ASCE Global Website
              </Link>
              <Link href="#" className="block hover:text-primary transition-colors">
                MIST Official Site
              </Link>
              <Link href="#" className="block hover:text-primary transition-colors">
                Student Resources
              </Link>
              <Link href="#" className="block hover:text-primary transition-colors">
                Career Opportunities
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 ASCE Student Chapter - MIST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
