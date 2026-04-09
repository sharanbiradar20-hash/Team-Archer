"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Calendar, Code, Trophy } from "lucide-react"
import Link from "next/link"

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl glass p-8 md:p-12 lg:p-16">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-secondary/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-bg-card border border-border mb-6">
            <Trophy className="w-4 h-4 text-accent-primary" />
            <span className="text-sm font-medium">WebWeave26 Hackathon Project</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="gradient-text">Centralized Hub</span>
            <br />
            for College Technical Clubs
          </h1>

          <p className="text-xl text-text-secondary mb-10 max-w-2xl">
            Replace fragmented WhatsApp groups, Google Forms, and social media pages with a single,
            polished platform for events, challenges, projects, and team collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-accent-gradient text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Join Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl glass border border-border font-semibold hover:bg-bg-card transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Explore Events</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-bg-card border border-border">
                <Users className="w-6 h-6 text-accent-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-text-secondary text-sm">Active Members</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-bg-card border border-border">
                <Calendar className="w-6 h-6 text-accent-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-text-secondary text-sm">Events Hosted</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-bg-card border border-border">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">30+</p>
                <p className="text-text-secondary text-sm">Challenges</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-bg-card border border-border">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">100+</p>
                <p className="text-text-secondary text-sm">Projects Showcased</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}