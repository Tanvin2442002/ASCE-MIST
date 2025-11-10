"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, MoreHorizontal, ChevronDown } from "lucide-react"
import Link from "next/link"

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Activities", href: "/activities" },
  { name: "Achievements", href: "/achievements" },
  { name: "Membership", href: "/membership" },
  { name: "Publication", href: "/publication" },
  { name: "Committee", href: "/committee" },
  { name: "Contact", href: "/contact" },
]

const activitiesDropdown = [
  { name: "Site Visit", href: "/activities/site-visit" },
  { name: "Seminar", href: "/activities/seminar" },
  { name: "Webinar", href: "/activities/webinar" },
  { name: "Upcoming Events", href: "/activities/upcoming-events" },
  { name: "Social Events", href: "/activities/social-events" },
  { name: "Announcement", href: "/activities/announcement" },
]

interface NavigationProps {
  currentPath?: string
}

export default function Navigation({ currentPath = "/" }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false)

  const activitiesRef = useRef<HTMLDivElement>(null)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const mobileActivitiesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedInsideDesktopActivities = activitiesRef.current?.contains(target)
      const clickedInsideMobileActivities = mobileActivitiesRef.current?.contains(target)
      const clickedInsideDesktopMenu = desktopMenuRef.current?.contains(target)

      // Only close Activities if the click is outside BOTH desktop and mobile Activities containers
      if (!clickedInsideDesktopActivities && !clickedInsideMobileActivities) {
        setIsActivitiesOpen(false)
      }

      // Close the desktop overflow menu if clicked outside it
      if (!clickedInsideDesktopMenu) {
        setIsDesktopMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDesktopMenu = () => {
    setIsDesktopMenuOpen(!isDesktopMenuOpen)
  }

  const toggleActivities = () => {
    setIsActivitiesOpen(!isActivitiesOpen)
  }

  const primaryLinks = navigationLinks.slice(0, 5)
  const secondaryLinks = navigationLinks.slice(5)

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-[110]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <img src="/LOGO.jpg" alt="ASCE MIST" className="object-contain w-12 h-12" />
            <div>
              <h1 className="font-bold text-lg md:text-xl text-gray-900">ASCE STUDENT CHAPTER, MIST</h1>
              <p className="text-xl md:text-xl text-gray-600 hidden sm:block">
                Military Institute of Science and Technology
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {primaryLinks.map((link) => {
                if (link.name === "Activities") {
                  return (
                    <div key={link.name} className="relative" ref={activitiesRef}>
                      <button
                        onClick={toggleActivities}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative flex items-center space-x-1 ${
                          currentPath?.startsWith(link.href) ? "text-green-700" : "text-gray-700 hover:text-green-700"
                        } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                          currentPath?.startsWith(link.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${isActivitiesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isActivitiesOpen && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-[110]">
                          {activitiesDropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`block px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                                currentPath === item.href ? "text-green-700" : "text-gray-700 hover:text-green-700"
                              } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                                currentPath === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                              }`}
                              onClick={() => setIsActivitiesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative ${
                      currentPath === link.href ? "text-green-700" : "text-gray-700 hover:text-green-700"
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                      currentPath === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Dropdown Menu */}
            <div className="hidden lg:block relative" ref={desktopMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDesktopMenu}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-700 hover:bg-green-50"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

              {isDesktopMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                        currentPath === link.href ? "text-green-700" : "text-gray-700 hover:text-green-700"
                      } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                        currentPath === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                      }`}
                      onClick={() => setIsDesktopMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 relative z-[110]">
            <nav className="flex flex-col space-y-1 pt-4">
              {navigationLinks.map((link) => {
                if (link.name === "Activities") {
                  return (
                    <div key={link.name} ref={mobileActivitiesRef}>
                      <button
                        onClick={toggleActivities}
                        className={`w-full text-left px-3 py-3 text-sm font-medium rounded-md transition-all duration-300 relative flex items-center justify-between ${
                          currentPath?.startsWith(link.href) ? "text-green-700" : "text-gray-700 hover:text-green-700"
                        } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                          currentPath?.startsWith(link.href) ? "after:w-full" : "after:w-0 hover:after:w-full"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${isActivitiesOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isActivitiesOpen && (
                        <div className="ml-4 mt-1 space-y-1 relative z-[110]">
                          {activitiesDropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative ${
                                currentPath === item.href ? "text-green-700" : "text-gray-600 hover:text-green-700"
                              } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                                currentPath === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                              }`}
                              onClick={() => {
                                setIsActivitiesOpen(false)
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-3 text-sm font-medium rounded-md transition-all duration-300 relative ${
                      currentPath === link.href ? "text-green-700" : "text-gray-700 hover:text-green-700"
                    } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-green-600 after:transition-all after:duration-300 ${
                      currentPath === link.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
