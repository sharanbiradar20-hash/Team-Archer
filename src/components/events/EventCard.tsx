"use client"

import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Event } from "@/types"
import { cn, formatDate } from "@/lib/utils"
import { EVENT_CATEGORIES } from "@/lib/constants"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "unpublished":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hackathon":
        return "bg-purple-500/10 text-purple-500"
      case "workshop":
        return "bg-blue-500/10 text-blue-500"
      case "talk":
        return "bg-amber-500/10 text-amber-500"
      case "competition":
        return "bg-red-500/10 text-red-500"
      case "social":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const categoryLabel = EVENT_CATEGORIES.find(c => c.value === event.category)?.label || event.category

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-secondary transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getStatusColor(event.status)
        )}>
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      </div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white/20">
            {event.title.charAt(0)}
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            getCategoryColor(event.category)
          )}>
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-text-secondary text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-text-tertiary" />
            <span>{formatDate(event.event_date)}</span>
            {event.end_date && (
              <>
                <span className="text-text-tertiary">to</span>
                <span>{formatDate(event.end_date)}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-text-tertiary" />
            <span className="line-clamp-1">{event.venue}</span>
            <span className="text-text-tertiary">•</span>
            <span>{event.mode}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-text-tertiary" />
            <span>{event.registration_count} registered</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Registration</span>
            <span className="font-medium">{event.registration_count}/∞</span>
          </div>
          <div className="h-2 bg-bg-primary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((event.registration_count / 100) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
            Register Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}