"use client"

import { useState, useMemo } from "react"
import { Trophy, Filter, Search, Clock, Users, Target, TrendingUp, Grid3X3, List, X } from "lucide-react"
import { CHALLENGE_DIFFICULTIES, CHALLENGE_CATEGORIES } from "@/lib/constants"
import ChallengeCard from "@/components/challenges/ChallengeCard"
import { Challenge } from "@/types"
import { toast } from "sonner"

// Mock data - will be replaced with Supabase query
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Real-time Chat Application",
    description: "Build a real-time chat application with WebSocket support, user authentication, and message persistence.",
    problem_statement: "Create a full-stack chat application that supports multiple rooms, file sharing, and real-time notifications.",
    difficulty: "medium",
    category: "full_stack",
    status: "active",
    deadline: "2024-06-30T23:59:59Z",
    scoring_rules: { functionality: 40, code_quality: 30, ui_ux: 20, documentation: 10 },
    tags: ["WebSocket", "React", "Node.js", "MongoDB"],
    created_by: null,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "AI-Powered Image Classifier",
    description: "Develop an image classification model using TensorFlow.js that runs entirely in the browser.",
    problem_statement: "Implement a convolutional neural network that can classify images from the CIFAR-10 dataset with >85% accuracy.",
    difficulty: "hard",
    category: "open_innovation",
    status: "active",
    deadline: "2024-07-15T23:59:59Z",
    scoring_rules: { accuracy: 50, performance: 30, code_quality: 20 },
    tags: ["TensorFlow.js", "Machine Learning", "Computer Vision"],
    created_by: null,
    created_at: "2024-02-10T09:30:00Z",
    updated_at: "2024-02-10T09:30:00Z",
  },
  {
    id: "3",
    title: "Responsive Dashboard UI",
    description: "Design and implement a responsive admin dashboard with interactive charts and data visualization.",
    problem_statement: "Create a dashboard that displays analytics data using Recharts, with dark/light mode toggle and mobile responsiveness.",
    difficulty: "easy",
    category: "ui_ux",
    status: "active",
    deadline: "2024-05-31T23:59:59Z",
    scoring_rules: { design: 40, responsiveness: 30, interactivity: 20, accessibility: 10 },
    tags: ["React", "Tailwind CSS", "Recharts", "Responsive Design"],
    created_by: null,
    created_at: "2024-03-01T11:00:00Z",
    updated_at: "2024-03-01T11:00:00Z",
  },
  {
    id: "4",
    title: "REST API for E-commerce",
    description: "Build a comprehensive REST API for an e-commerce platform with product management, cart, and order processing.",
    problem_statement: "Implement a secure REST API with JWT authentication, role-based access control, and comprehensive error handling.",
    difficulty: "medium",
    category: "api_design",
    status: "active",
    deadline: "2024-06-20T23:59:59Z",
    scoring_rules: { functionality: 40, security: 30, documentation: 20, performance: 10 },
    tags: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"],
    created_by: null,
    created_at: "2024-02-20T14:00:00Z",
    updated_at: "2024-02-20T14:00:00Z",
  },
  {
    id: "5",
    title: "Blockchain Voting System",
    description: "Create a decentralized voting system using blockchain technology for transparent and tamper-proof elections.",
    problem_statement: "Implement a smart contract for voting and a frontend interface for voters to cast their ballots securely.",
    difficulty: "hard",
    category: "open_innovation",
    status: "ended",
    deadline: "2024-04-15T23:59:59Z",
    scoring_rules: { innovation: 40, security: 30, usability: 20, documentation: 10 },
    tags: ["Blockchain", "Solidity", "Web3.js", "Ethereum"],
    created_by: null,
    created_at: "2024-01-05T08:00:00Z",
    updated_at: "2024-01-05T08:00:00Z",
  },
  {
    id: "6",
    title: "Mobile Fitness Tracker",
    description: "Develop a cross-platform mobile app for tracking workouts, nutrition, and fitness goals.",
    problem_statement: "Build a React Native app with offline support, push notifications, and integration with health APIs.",
    difficulty: "medium",
    category: "ui_ux",
    status: "active",
    deadline: "2024-07-10T23:59:59Z",
    scoring_rules: { functionality: 40, ui_ux: 30, performance: 20, offline_support: 10 },
    tags: ["React Native", "Expo", "Firebase", "Health APIs"],
    created_by: null,
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z",
  },
]

const ITEMS_PER_PAGE = 4

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["active"])
  const [sortBy, setSortBy] = useState("deadline")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const toggleFilter = (arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSelectedDifficulties([])
    setSelectedCategories([])
    setSelectedStatuses([])
    setSearchQuery("")
    setCurrentPage(1)
  }

  const filteredChallenges = useMemo(() => {
    let result = [...mockChallenges]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (selectedDifficulties.length > 0) {
      result = result.filter(c => selectedDifficulties.includes(c.difficulty))
    }

    if (selectedCategories.length > 0) {
      result = result.filter(c => selectedCategories.includes(c.category))
    }

    if (selectedStatuses.length > 0) {
      result = result.filter(c => selectedStatuses.includes(c.status))
    }

    switch (sortBy) {
      case "deadline":
        result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        break
      case "difficulty":
        const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
        result.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty])
        break
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [searchQuery, selectedDifficulties, selectedCategories, selectedStatuses, sortBy])

  const totalPages = Math.ceil(filteredChallenges.length / ITEMS_PER_PAGE)
  const paginatedChallenges = filteredChallenges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const activeFiltersCount = selectedDifficulties.length + selectedCategories.length + selectedStatuses.length

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Trophy className="w-5 h-5" />
              <span className="font-medium">Technical Challenges</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Level Up Your <span className="text-secondary">Skills</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Participate in coding challenges, build real-world projects, and climb the leaderboard.
              Earn points, badges, and recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search challenges by title, tags, or description..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <X className="w-4 h-4 text-text-tertiary" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{filteredChallenges.filter(c => c.status === "active").length}</div>
              <div className="text-text-secondary">Active Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">156</div>
              <div className="text-text-secondary">Total Submissions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">42</div>
              <div className="text-text-secondary">Participants This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500 mb-2">5K</div>
              <div className="text-text-secondary">Points Awarded</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                <div className="bg-bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Filter size={20} />
                    Filter Challenges
                    {activeFiltersCount > 0 && (
                      <span className="ml-auto text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Difficulty</h4>
                      <div className="space-y-2">
                        {CHALLENGE_DIFFICULTIES.map((diff) => (
                          <label key={diff.value} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                            <input
                              type="checkbox"
                              className="rounded border-border"
                              checked={selectedDifficulties.includes(diff.value)}
                              onChange={() => toggleFilter(selectedDifficulties, diff.value, setSelectedDifficulties)}
                            />
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                diff.color === 'green' ? 'bg-green-500' :
                                diff.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                              <span>{diff.label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Category</h4>
                      <div className="space-y-2">
                        {CHALLENGE_CATEGORIES.map((cat) => (
                          <label key={cat.value} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                            <input
                              type="checkbox"
                              className="rounded border-border"
                              checked={selectedCategories.includes(cat.value)}
                              onChange={() => toggleFilter(selectedCategories, cat.value, setSelectedCategories)}
                            />
                            <span>{cat.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Status</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={selectedStatuses.includes("active")}
                            onChange={() => toggleFilter(selectedStatuses, "active", setSelectedStatuses)}
                          />
                          <span className="text-green-500">● Active</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input
                            type="checkbox"
                            className="rounded border-border"
                            checked={selectedStatuses.includes("ended")}
                            onChange={() => toggleFilter(selectedStatuses, "ended", setSelectedStatuses)}
                          />
                          <span className="text-red-500">● Ended</span>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={() => toast.success("✓ Filters applied successfully")}
                      className="w-full py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={clearFilters}
                      className="w-full py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Challenges Grid */}
            <main className="lg:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold">All Challenges</h2>
                  <p className="text-text-secondary">Showing {filteredChallenges.length} challenges</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="deadline">Sort by: Deadline (Soonest)</option>
                    <option value="difficulty">Sort by: Difficulty</option>
                    <option value="name">Sort by: Name</option>
                  </select>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg border border-border transition-colors ${viewMode === "grid" ? "bg-secondary text-white border-secondary" : "hover:bg-bg-secondary"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg border border-border transition-colors ${viewMode === "list" ? "bg-secondary text-white border-secondary" : "hover:bg-bg-secondary"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {paginatedChallenges.length === 0 ? (
                <div className="text-center py-16">
                  <Target className="w-16 h-16 mx-auto text-text-tertiary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                  <p className="text-text-secondary mb-4">Try adjusting your filters or check back later for new challenges.</p>
                  <button onClick={clearFilters} className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
                  {viewMode === "grid" ? (
                    paginatedChallenges.map((challenge) => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))
                  ) : (
                    paginatedChallenges.map((challenge) => (
                      <div key={challenge.id} className="bg-bg-secondary rounded-xl border border-border p-4 flex flex-col md:flex-row gap-4 hover:border-secondary/50 transition-colors">
                        <div className="md:w-16 flex items-start">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-primary">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${challenge.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{challenge.status}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${challenge.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' : challenge.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>{challenge.difficulty}</span>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">{challenge.category.replace('_', ' ')}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{challenge.title}</h3>
                          <p className="text-text-secondary text-sm line-clamp-1 mb-2">{challenge.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {challenge.tags.slice(0, 3).map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-bg-primary text-text-secondary border border-border">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="md:w-32 flex flex-col items-end justify-between">
                          <div className="text-right">
                            <div className="text-sm text-text-secondary">Deadline</div>
                            <div className="font-medium text-sm">{new Date(challenge.deadline).toLocaleDateString()}</div>
                          </div>
                          <a href={`/challenges/${challenge.id}`} className="text-secondary hover:text-secondary/80 font-medium text-sm">View Details →</a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-secondary text-white"
                            : "border border-border hover:bg-bg-secondary"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}