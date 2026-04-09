"use client"

import { motion } from "framer-motion"
import { Star, Code2, ExternalLink, Users, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const projects = [
  {
    id: "1",
    title: "EcoTrack – Carbon Footprint Tracker",
    description: "A mobile app that helps users track and reduce their carbon footprint with gamified challenges.",
    tech: ["React Native", "Firebase", "Node.js", "MongoDB"],
    likes: 124,
    views: 560,
    teamSize: 4,
    year: "2025",
    isFeatured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://ecotrack.demo",
  },
  {
    id: "2",
    title: "MediChain – Blockchain for Medical Records",
    description: "Decentralized system for secure, interoperable medical records using Ethereum smart contracts.",
    tech: ["Solidity", "React", "IPFS", "Hardhat"],
    likes: 89,
    views: 420,
    teamSize: 3,
    year: "2024",
    isFeatured: true,
    githubUrl: "https://github.com",
    liveUrl: "https://medichain.demo",
  },
  {
    id: "3",
    title: "Voice‑Based Home Automation",
    description: "Voice‑controlled home automation system using NLP and IoT with real‑time dashboard.",
    tech: ["Python", "FastAPI", "React", "Raspberry Pi"],
    likes: 67,
    views: 310,
    teamSize: 5,
    year: "2025",
    isFeatured: false,
    githubUrl: "https://github.com",
    liveUrl: "https://voicehome.demo",
  },
]

export default function FeaturedProjects() {
  const [liked, setLiked] = useState<string[]>([])

  const toggleLike = (id: string) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex-shrink-0 w-96 mr-6"
          >
            <div className="glass rounded-2xl p-6 border border-border hover:border-accent-primary transition-colors h-full">
              {project.isFeatured && (
                <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">
                  <Star className="w-3 h-3" />
                  <span>Featured</span>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">{project.year} • Team of {project.teamSize}</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLike(project.id)}
                      className="flex items-center space-x-1 text-text-secondary hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${liked.includes(project.id) ? "fill-red-500 text-red-500" : ""}`} />
                      <span>{project.likes + (liked.includes(project.id) ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center space-x-1 text-text-secondary">
                      <Eye className="w-5 h-5" />
                      <span>{project.views}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full bg-bg-card border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-card border border-border hover:bg-bg-card/80 transition-colors"
                  >
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent-gradient text-white hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-accent-primary hover:text-accent-secondary font-medium"
                >
                  View details →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}