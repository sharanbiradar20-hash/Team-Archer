"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"
import { getEventCategoryColor } from "@/lib/utils"

const events = [
  {
    id: "1",
    title: "React Workshop: Advanced Hooks",
    category: "workshop",
    date: "2026-04-15T18:00:00Z",
    venue: "Tech Lab 101",
    mode: "offline",
    registered: 42,
    maxCapacity: 50,
  },
  {
    id: "2",
    title: "Hackathon: AI for Social Good",
    category: "hackathon",
    date: "2026-04-20T10:00:00Z",
    venue: "Virtual",
    mode: "online",
    registered: 78,
    maxCapacity: 100,
  },
  {
    id: "3",
    title: "Guest Talk: Building Scalable APIs",
    category: "talk",
    date: "2026-04-12T16:30:00Z",
    venue: "Auditorium A",
    mode: "offline",
    registered: 65,
    maxCapacity: 80,
  },
  {
    id: "4",
    title: "UI/UX Design Competition",
    category: "competition",
    date: "2026-04-25T09:00:00Z",
    venue: "Design Studio",
    mode: "hybrid",
    registered: 30,
    maxCapacity: 60,
  },
]

export default function UpcomingEventsStrip() {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-shrink-0 w-80 mr-6"
          >
            <Link
              href={`/events/${event.id}`}
              className="block glass rounded-2xl p-6 border border-border hover:border-accent-primary transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getEventCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <div className="flex items-center space-x-1 text-text-secondary text-sm">
                  <Clock className="w-4 h-4" />
                  <span>in 5 days</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 group-hover:text-accent-primary transition-colors">
                {event.title}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center text-text-secondary">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex items-center text-text-secondary">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>{event.venue}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-bg-card">{event.mode}</span>
                </div>
                <div className="flex items-center text-text-secondary">
                  <Users className="w-4 h-4 mr-3" />
                  <span>
                    {event.registered} / {event.maxCapacity} registered
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="w-full bg-bg-card rounded-full h-2">
                  <div
                    className="bg-accent-gradient h-2 rounded-full"
                    style={{ width: `${(event.registered / event.maxCapacity) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-text-secondary">Registration</span>
                  <span className="font-medium">
                    {Math.round((event.registered / event.maxCapacity) * 100)}% full
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}