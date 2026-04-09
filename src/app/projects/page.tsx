"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Grid3x3, List, Star, Eye, Heart, TrendingUp, Calendar, Users } from "lucide-react"
import ProjectCard from "@/components/projects/ProjectCard"
import { Project } from "@/types"
import { toast } from "sonner"
import Link from "next/link"

// Mock data - will be replaced with Supabase query
const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description: "An intelligent tool that analyzes code quality, suggests improvements, and detects potential bugs using machine learning.",
    extended_description: "This project uses transformer models to analyze code patterns and provide actionable feedback. It integrates with popular IDEs and version control systems.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL"],
    team_members_names: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
    github_url: "https://github.com/clubnexus/code-review-ai",
    live_url: "https://code-review-ai.vercel.app",
    documentation_url: "https://docs.code-review-ai.vercel.app",
    domain: "AI/ML",
    year: "2024",
    team_size: 3,
    is_featured: true,
    is_archived: false,
    likes_count: 142,
    created_by: "user1",
    created_at: "2024-02-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Campus Navigation AR",
    description: "Augmented reality campus navigation app that helps students find buildings, classrooms, and facilities.",
    extended_description: "Uses AR overlays to guide students through campus with real-time directions and building information.",
    thumbnail_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["React Native", "ARKit", "ARCore", "TypeScript", "Firebase"],
    team_members_names: ["Diana Prince", "Edward Norton"],
    github_url: "https://github.com/clubnexus/campus-ar-nav",
    live_url: "https://campus-ar.vercel.app",
    documentation_url: "https://docs.campus-ar.vercel.app",
    domain: "AR/VR",
    year: "2024",
    team_size: 2,
    is_featured: false,
    is_archived: false,
    likes_count: 89,
    created_by: "user2",
    created_at: "2024-01-20T14:00:00Z",
  },
  {
    id: "3",
    title: "Distributed Task Scheduler",
    description: "A scalable task scheduling system using distributed computing principles for managing cloud workflows.",
    extended_description: "Implements distributed consensus and task queue management with fault tolerance and horizontal scaling capability.",
    thumbnail_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Go", "gRPC", "Redis", "Docker", "Kubernetes"],
    team_members_names: ["Frank Castle", "Grace Hopper", "Henry Ford"],
    github_url: "https://github.com/clubnexus/task-scheduler",
    live_url: "https://task-scheduler.vercel.app",
    documentation_url: "https://docs.task-scheduler.vercel.app",
    domain: "Web Development",
    year: "2023",
    team_size: 3,
    is_featured: false,
    is_archived: false,
    likes_count: 67,
    created_by: "user3",
    created_at: "2023-11-10T09:00:00Z",
  },
  {
    id: "4",
    title: "Blockchain Voting Platform",
    description: "Secure and transparent voting platform built on blockchain technology for student body elections.",
    extended_description: "Leverages Ethereum smart contracts for tamper-proof voting with full transparency and anonymity guarantees.",
    thumbnail_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Solidity", "React", "ethers.js", "Hardhat", "IPFS"],
    team_members_names: ["Ivy Lee", "Jack Ma", "Karen Wright", "Leo Messi"],
    github_url: "https://github.com/clubnexus/blockchain-voting",
    live_url: "https://blockchain-voting.vercel.app",
    documentation_url: "https://docs.blockchain-voting.vercel.app",
    domain: "Blockchain",
    year: "2024",
    team_size: 4,
    is_featured: true,
    is_archived: false,
    likes_count: 156,
    created_by: "user4",
    created_at: "2024-03-01T11:00:00Z",
  },
  {
    id: "5",
    title: "IoT Smart Classroom",
    description: "Automated classroom management system with IoT sensors controlling lighting, temperature, and attendance.",
    extended_description: "Uses ESP32 sensors and a centralized dashboard for real-time monitoring and automated control of classroom environments.",
    thumbnail_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["ESP32", "MQTT", "React", "Node.js", "InfluxDB"],
    team_members_names: ["Maria Garcia", "Nathan Brown"],
    github_url: "https://github.com/clubnexus/smart-classroom",
    live_url: "https://smart-classroom.vercel.app",
    documentation_url: "https://docs.smart-classroom.vercel.app",
    domain: "IoT",
    year: "2023",
    team_size: 2,
    is_featured: false,
    is_archived: true,
    likes_count: 103,
    created_by: "user5",
    created_at: "2023-10-05T08:00:00Z",
  },
  {
    id: "6",
    title: "Mental Health Chatbot",
    description: "AI-powered mental health support chatbot that provides empathetic conversations and professional resources.",
    extended_description: "Uses transformer models for empathetic conversation and integrates with mental health resources and crisis hotlines.",
    thumbnail_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Python", "Transformers", "FastAPI", "React", "PostgreSQL"],
    team_members_names: ["Nancy Taylor", "Oliver Scott"],
    github_url: "https://github.com/clubnexus/mental-health-chatbot",
    live_url: "https://mindful-chat.vercel.app",
    documentation_url: "https://docs.mental-health-chatbot.vercel.app",
    domain: "AI/ML",
    year: "2024",
    team_size: 2,
    is_featured: false,
    is_archived: false,
    likes_count: 78,
    created_by: "user6",
    created_at: "2024-02-28T13:00:00Z",
  },
  {
    id: "7",
    title: "Smart Agriculture IoT System",
    description: "IoT system for monitoring soil moisture, temperature, and automating irrigation for precision farming.",
    extended_description: "Low-cost IoT sensors connected to a cloud dashboard that provides real-time analytics and automated irrigation control.",
    thumbnail_url: "https://images.unsplash.com/photo-1586771107445-d3ca888129fc?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1586771107445-d3ca888129fc?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Arduino", "Python", "React", "MQTT", "InfluxDB"],
    team_members_names: ["Peter Kim", "Quinn Lewis", "Rachel Green"],
    github_url: "https://github.com/clubnexus/smart-agriculture",
    live_url: "https://smart-farm.vercel.app",
    documentation_url: "https://docs.smart-agriculture.vercel.app",
    domain: "IoT",
    year: "2023",
    team_size: 3,
    is_featured: true,
    is_archived: false,
    likes_count: 92,
    created_by: "user7",
    created_at: "2023-11-15T09:00:00Z",
  },
  {
    id: "8",
    title: "Virtual Reality Chemistry Lab",
    description: "Immersive VR environment for conducting chemistry experiments safely with realistic simulations.",
    extended_description: "VR application that simulates chemistry lab experiments with realistic physics and chemical reactions for educational purposes.",
    thumbnail_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Unity", "C#", "SteamVR", "Blender", "Firebase"],
    team_members_names: ["Sam Wilson", "Tina Roberts"],
    github_url: "https://github.com/clubnexus/vr-chemistry-lab",
    live_url: "https://vr-chem-lab.vercel.app",
    documentation_url: "https://docs.vr-chemistry-lab.vercel.app",
    domain: "AR/VR",
    year: "2024",
    team_size: 2,
    is_featured: false,
    is_archived: false,
    likes_count: 45,
    created_by: "user8",
    created_at: "2024-03-10T10:00:00Z",
  },
]

const categories = [
  { id: "all", label: "All Projects", count: 8 },
  { id: "featured", label: "Featured", count: 3 },
  { id: "active", label: "Active", count: 7 },
  { id: "archived", label: "Archived", count: 1 },
]

const technologies = [
  "React", "Python", "TypeScript", "Node.js", "Unity", "Blockchain", "AI/ML", "IoT", "AR/VR", "Mobile"
]

type SortOption = "popular" | "liked" | "viewed" | "newest" | "rated"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    )
    setCurrentPage(1)
  }

  const filteredProjects = useMemo(() => {
    let projects = [...mockProjects]

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech_stack.some(t => t.toLowerCase().includes(q)) ||
        (p.domain && p.domain.toLowerCase().includes(q))
      )
    }

    // Category filter
    if (selectedCategory === "featured") {
      projects = projects.filter(p => p.is_featured)
    } else if (selectedCategory === "active") {
      projects = projects.filter(p => !p.is_archived)
    } else if (selectedCategory === "archived") {
      projects = projects.filter(p => p.is_archived)
    }

    // Tech filter
    if (selectedTechs.length > 0) {
      projects = projects.filter(p =>
        selectedTechs.some(tech =>
          p.tech_stack.some(t => t.toLowerCase().includes(tech.toLowerCase())) ||
          (p.domain && p.domain.toLowerCase().includes(tech.toLowerCase()))
        )
      )
    }

    // Sort
    switch (sortBy) {
      case "liked":
        projects.sort((a, b) => b.likes_count - a.likes_count)
        break
      case "viewed":
        projects.sort((a, b) => (b.likes_count * 6) - (a.likes_count * 6))
        break
      case "newest":
        projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "rated":
        projects.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
        break
      default:
        projects.sort((a, b) => b.likes_count - a.likes_count)
    }

    return projects
  }, [searchQuery, selectedCategory, selectedTechs, sortBy])

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Project <span className="text-secondary">Showcase</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-3xl mx-auto">
              Explore innovative projects built by our community. From AI applications to blockchain solutions, 
              discover what our members are creating.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search projects by title, technology, or description..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-primary">{mockProjects.length}</div>
                <div className="text-text-secondary">Total Projects</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-500">{mockProjects.filter(p => !p.is_archived).length}</div>
                <div className="text-text-secondary">Active</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-secondary">{mockProjects.reduce((s, p) => s + p.likes_count, 0)}</div>
                <div className="text-text-secondary">Total Likes</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-amber-500">{(mockProjects.reduce((s, p) => s + p.likes_count * 6, 0) / 1000).toFixed(1)}k</div>
                <div className="text-text-secondary">Total Views</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => { setSelectedCategory(category.id); setCurrentPage(1) }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                        selectedCategory === category.id
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "hover:bg-bg-primary"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="px-2 py-1 text-xs bg-bg-tertiary rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
                        selectedTechs.includes(tech)
                          ? "bg-secondary/10 text-secondary border-secondary/30"
                          : "bg-bg-primary border-border hover:border-secondary"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                <div className="space-y-2">
                  {([
                    { label: "Most Popular", value: "popular" as SortOption, icon: TrendingUp },
                    { label: "Most Liked", value: "liked" as SortOption, icon: Heart },
                    { label: "Most Viewed", value: "viewed" as SortOption, icon: Eye },
                    { label: "Newest", value: "newest" as SortOption, icon: Calendar },
                    { label: "Top Rated", value: "rated" as SortOption, icon: Star },
                  ]).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        sortBy === option.value
                          ? "bg-secondary/10 text-secondary"
                          : "hover:bg-bg-primary"
                      }`}
                    >
                      <option.icon className="w-4 h-4 text-text-secondary" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">View</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-bg-primary border border-border hover:bg-bg-tertiary"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-bg-primary border border-border hover:bg-bg-tertiary"
                    }`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedCategory === "all" ? "All" : selectedCategory === "featured" ? "Featured" : selectedCategory === "active" ? "Active" : "Archived"} Projects
                </h2>
                <p className="text-text-secondary">Showing {filteredProjects.length} projects</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toast.success("Navigate to submit a new project")}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors"
                >
                  Submit Project
                </button>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-border rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-bg-tertiary border border-border flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-6">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedTechs([]); setSortBy("popular") }}
                  className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProjects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="bg-bg-secondary rounded-xl border border-border p-4 flex flex-col md:flex-row gap-4 hover:border-secondary/50 transition-colors">
                      <div className="md:w-1/4">
                        <div className="relative h-32 md:h-full overflow-hidden rounded-lg">
                          <img
                            src={project.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {project.is_featured && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">Featured</span>}
                            {project.domain && <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">{project.domain}</span>}
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">{project.year}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                          <p className="text-text-secondary text-sm line-clamp-2 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech_stack.slice(0, 4).map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-xs bg-bg-primary text-text-secondary border border-border">{tech}</span>
                            ))}
                            {project.tech_stack.length > 4 && <span className="px-2 py-0.5 rounded text-xs bg-bg-primary text-text-secondary border border-border">+{project.tech_stack.length - 4}</span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{project.likes_count}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.likes_count * 6}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.team_size}</span>
                          </div>
                          <span className="text-secondary hover:text-secondary/80 font-medium text-sm">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                <div className="text-text-secondary">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-secondary text-white"
                          : "border border-border hover:bg-bg-secondary transition-colors"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}