"use client"

import { motion } from "framer-motion"
import { Megaphone, Bell, Calendar, Award, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const announcements = [
  {
    id: "1",
    title: "Hackathon Registration Open",
    description: "WebWeave26 Hackathon registrations are now open. Prize pool ₹50,000!",
    icon: Megaphone,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: "2",
    title: "New Challenge: AI‑Powered Chatbot",
    description: "Submit your solutions by April 25th. Winners get featured on our platform.",
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "3",
    title: "Workshop: Advanced Next.js 15",
    description: "Join us this Saturday for a hands‑on workshop with industry experts.",
    icon: Calendar,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    id: "4",
    title: "Leaderboard Reset",
    description: "Monthly leaderboard reset on May 1st. Climb the ranks now!",
    icon: Award,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: "5",
    title: "Club Recruitment Drive",
    description: "We're looking for core team members. Apply by April 18th.",
    icon: Bell,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
]

export default function AnnouncementTicker() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="glass rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-bg-card border border-border">
            <Megaphone className="w-6 h-6 text-accent-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Latest Announcements</h2>
            <p className="text-text-secondary">Stay updated with club news and opportunities</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {announcements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? "bg-accent-primary" : "bg-border"}`}
              aria-label={`Go to announcement ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-48 overflow-hidden rounded-xl">
        {announcements.map((announcement, idx) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: idx === activeIndex ? 1 : 0,
              x: idx === activeIndex ? 0 : 100,
            }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${announcement.bg} rounded-xl p-8 flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <announcement.icon className={`w-8 h-8 ${announcement.color}`} />
                  <span className="text-lg font-semibold">{announcement.title}</span>
                </div>
                <p className="text-text-primary text-xl md:text-2xl font-medium max-w-2xl">
                  {announcement.description}
                </p>
              </div>
              <div className="text-6xl opacity-10">
                <announcement.icon className={announcement.color} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">
                {idx + 1} of {announcements.length}
              </span>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-2 rounded-lg glass border border-border hover:bg-bg-card transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-2 rounded-lg bg-accent-gradient text-white hover:opacity-90 transition-opacity">
                  Get Notified
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {announcements.map((announcement, idx) => (
          <button
            key={announcement.id}
            onClick={() => setActiveIndex(idx)}
            className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors ${idx === activeIndex ? "border-accent-primary bg-bg-card" : "border-border hover:bg-bg-card"}`}
          >
            <div className={`p-2 rounded-lg ${announcement.bg}`}>
              <announcement.icon className={`w-5 h-5 ${announcement.color}`} />
            </div>
            <div className="text-left min-w-0">
              <p className="font-medium text-sm truncate">{announcement.title}</p>
              <p className="text-text-secondary text-xs truncate">{announcement.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}