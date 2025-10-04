"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAdminAuthenticated, getAdminEmail, logoutAdmin } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import { LogOut, User, Home, FileText, Award, Megaphone, MapPin, Video, Users } from "lucide-react"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export { AdminLayout }
export default AdminLayout

function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      if (isAdminAuthenticated()) {
        setIsAuthenticated(true)
        setAdminEmail(getAdminEmail())
      } else {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin/login")
  }

  const navigationItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: Home },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    { href: "/admin/achievements", label: "Achievements", icon: Award },
    { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { href: "/admin/site-visits", label: "Site Visits", icon: MapPin },
    { href: "/admin/webinars", label: "Webinars", icon: Video },
    { href: "/admin/seminars", label: "Seminars", icon: Users },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-lg font-bold text-slate-900">ASCE @ MIST</h1>
          <p className="text-sm text-slate-600">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <User className="w-4 h-4" />
            <span className="truncate">{adminEmail}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {navigationItems.find((item) => item.href === pathname)?.label || "Admin"}
              </h2>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
