"use client"

import { Mic, Briefcase, MessageCircle, Globe } from "lucide-react"
import { motion } from "framer-motion"

interface Speaker {
  name: string
  role: string
  bio: string
  photo_url: string
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
}

interface EventSpeakersProps {
  speakers: Speaker[] | null
}

export default function EventSpeakers({ speakers }: EventSpeakersProps) {
  if (!speakers || speakers.length === 0) {
    return null
  }

  return (
    <div className="bg-bg-secondary rounded-2xl border border-border p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-secondary/10">
          <Mic className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Featured Speakers</h2>
          <p className="text-text-secondary">Industry experts and thought leaders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-bg-primary rounded-xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            {/* Speaker Image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                  {speaker.name.charAt(0)}
                </div>
              </div>
            </div>

            {/* Speaker Info */}
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                <p className="text-secondary font-medium">{speaker.role}</p>
              </div>

              <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                {speaker.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {speaker.linkedin_url && (
                  <a
                    href={speaker.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
                  >
                    <Briefcase className="w-4 h-4" />
                  </a>
                )}
                {speaker.twitter_url && (
                  <a
                    href={speaker.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {speaker.website_url && (
                  <a
                    href={speaker.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Speaker Session Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-xl border border-border">
        <h4 className="font-semibold mb-3">Speaker Sessions</h4>
        <div className="space-y-3">
          {speakers.map((speaker, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-bg-primary">
              <div>
                <p className="font-medium">{speaker.name}</p>
                <p className="text-sm text-text-secondary">Keynote: "Future of Technology in Education"</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">Day 1 • 10:00 AM</p>
                <p className="text-xs text-text-tertiary">Main Stage</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}