"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Briefcase, MessageCircle, Mail, Award, Filter, X } from "lucide-react"
import { DOMAIN_OPTIONS, BATCH_YEARS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const teamMembers = [
  {
    id: "1",
    name: "Alex Chen",
    designation: "Club President",
    hierarchyLevel: 1,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    batchYear: "2025",
    domain: "Web Development",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "2",
    name: "Priya Sharma",
    designation: "Technical Lead",
    hierarchyLevel: 2,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    batchYear: "2025",
    domain: "AI/ML",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "3",
    name: "Marcus Lee",
    designation: "Events Coordinator",
    hierarchyLevel: 2,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    batchYear: "2024",
    domain: "Cybersecurity",
    skills: ["Kali Linux", "Wireshark", "Cryptography", "Ethical Hacking"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "4",
    name: "Sofia Rodriguez",
    designation: "Design Lead",
    hierarchyLevel: 2,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    batchYear: "2026",
    domain: "UI/UX Design",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "5",
    name: "Jordan Taylor",
    designation: "Outreach Manager",
    hierarchyLevel: 3,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    batchYear: "2025",
    domain: "DevOps",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "6",
    name: "Dr. Anil Kumar",
    designation: "Faculty Advisor",
    hierarchyLevel: 1,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
    batchYear: "Alumni",
    domain: "Computer Science",
    skills: ["Research", "Mentorship", "Algorithms", "Networking"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: null,
    isAlumni: true,
  },
  {
    id: "7",
    name: "Riya Patel",
    designation: "Content Creator",
    hierarchyLevel: 3,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya",
    batchYear: "2026",
    domain: "Digital Media",
    skills: ["Video Editing", "Social Media", "Copywriting", "SEO"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
  {
    id: "8",
    name: "Kevin Wang",
    designation: "Blockchain Lead",
    hierarchyLevel: 2,
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
    batchYear: "2024",
    domain: "Blockchain",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    isAlumni: false,
  },
]

const hierarchyLabels: Record<number, string> = {
  1: "Leadership",
  2: "Core Team",
  3: "Members",
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null)
  const [showAlumni, setShowAlumni] = useState(false)
  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [batchFilter, setBatchFilter] = useState<string>("all")

  const filteredMembers = teamMembers.filter((member) => {
    if (!showAlumni && member.isAlumni) return false
    if (domainFilter !== "all" && member.domain !== domainFilter) return false
    if (batchFilter !== "all" && member.batchYear !== batchFilter) return false
    return true
  })

  const groupedMembers = filteredMembers.reduce(
    (acc, member) => {
      const level = member.hierarchyLevel
      if (!acc[level]) acc[level] = []
      acc[level].push(member)
      return acc
    },
    {} as Record<number, typeof teamMembers>
  )

  const levels = Object.keys(groupedMembers)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <>
      {/* Filters */}
      <div className="glass rounded-2xl p-6 border border-border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-text-secondary" />
              <span className="font-medium">Filters</span>
            </div>
            <button
              onClick={() => setShowAlumni(!showAlumni)}
              className={cn(
                "px-4 py-2 rounded-lg border transition-colors",
                showAlumni
                  ? "bg-accent-primary/10 border-accent-primary text-accent-primary"
                  : "bg-bg-card border-border hover:border-accent-primary"
              )}
            >
              {showAlumni ? "Hide Alumni" : "Show Alumni"}
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 rounded-lg bg-bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent-primary"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
            >
              <option value="all">All Domains</option>
              {DOMAIN_OPTIONS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 rounded-lg bg-bg-card border border-border focus:outline-none focus:ring-2 focus:ring-accent-primary"
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
            >
              <option value="all">All Batches</option>
              {BATCH_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="space-y-16">
        {levels.map((level) => (
          <div key={level}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-xl bg-bg-card border border-border">
                <Award className="w-6 h-6 text-accent-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{hierarchyLabels[level]}</h2>
                <p className="text-text-secondary">
                  {level === 1
                    ? "Strategic leadership and vision"
                    : level === 2
                    ? "Domain experts and operational leads"
                    : "Active contributors and club members"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupedMembers[level].map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass rounded-2xl p-6 border border-border hover:border-accent-primary transition-all cursor-pointer group"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden border-4 border-border group-hover:border-accent-primary transition-colors">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {member.isAlumni && (
                      <div className="absolute top-0 right-0 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                        Alumni
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-center mb-2 group-hover:text-accent-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-text-secondary text-center mb-4">{member.designation}</p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="px-3 py-1 text-xs rounded-full bg-bg-card border border-border">
                      {member.domain}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-bg-card border border-border">
                      {member.batchYear}
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Code2 className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Briefcase className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitterUrl && (
                      <a
                        href={member.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      className="p-2 rounded-lg hover:bg-bg-card transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = `mailto:${member.name.toLowerCase().replace(" ", ".")}@example.com`
                      }}
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-accent-primary">
                    <img
                      src={selectedMember.photoUrl}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{selectedMember.name}</h3>
                    <p className="text-xl text-accent-secondary">{selectedMember.designation}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-3 py-1 text-sm rounded-full bg-bg-card border border-border">
                        {selectedMember.domain}
                      </span>
                      <span className="px-3 py-1 text-sm rounded-full bg-bg-card border border-border">
                        {selectedMember.batchYear}
                      </span>
                      {selectedMember.isAlumni && (
                        <span className="px-3 py-1 text-sm rounded-full bg-purple-500/10 text-purple-400 border border-purple-500">
                          Alumni
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-3 rounded-xl hover:bg-bg-card transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-bg-card border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Contact & Social</h4>
                  <div className="flex items-center space-x-4">
                    {selectedMember.githubUrl && (
                      <a
                        href={selectedMember.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-card border border-border hover:border-accent-primary transition-colors"
                      >
                        <Code2 className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {selectedMember.linkedinUrl && (
                      <a
                        href={selectedMember.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-card border border-border hover:border-accent-primary transition-colors"
                      >
                        <Briefcase className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {selectedMember.twitterUrl && (
                      <a
                        href={selectedMember.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-bg-card border border-border hover:border-accent-primary transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Twitter</span>
                      </a>
                    )}
                    <button
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent-gradient text-white hover:opacity-90 transition-opacity"
                      onClick={() =>
                        (window.location.href = `mailto:${selectedMember.name.toLowerCase().replace(" ", ".")}@example.com`)
                      }
                    >
                      <Mail className="w-5 h-5" />
                      <span>Send Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">About</h4>
                  <p className="text-text-secondary">
                    {selectedMember.name} is a passionate {selectedMember.domain.toLowerCase()}{" "}
                    professional with expertise in {selectedMember.skills.slice(0, 2).join(" and ")}.
                    As {selectedMember.designation.toLowerCase()}, they contribute significantly to
                    the club's growth and mentor junior members.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
