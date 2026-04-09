"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogIn, LogOut, Home, Trophy, Users, Calendar, Image, Code, LayoutDashboard } from "lucide-react"
import { NAV_LINKS, SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  // In a real app, you would fetch user session here
  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data }) => setUser(data.user))
  // }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    toast.success("Signed out successfully")
    router.refresh()
  }

  const navItems = NAV_LINKS.map((link) => ({
    ...link,
    icon: getIcon(link.label),
  }))

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">{SITE_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                  "hover:bg-bg-card text-text-secondary hover:text-text-primary"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-card hover:bg-bg-card/80 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:bg-red-500/10 hover:border-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border hover:bg-bg-card transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent-gradient text-white hover:opacity-90 transition-opacity"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-bg-card transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-bg-card transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-bg-card hover:bg-bg-card/80 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg border border-border hover:bg-red-500/10 hover:border-red-500 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg border border-border hover:bg-bg-card transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-accent-gradient text-white hover:opacity-90 transition-opacity"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function getIcon(label: string) {
  switch (label.toLowerCase()) {
    case "home":
      return Home
    case "team":
      return Users
    case "events":
      return Calendar
    case "challenges":
      return Code
    case "projects":
      return LayoutDashboard
    case "gallery":
      return Image
    case "leaderboard":
      return Trophy
    case "dashboard":
      return LayoutDashboard
    default:
      return Home
  }
}