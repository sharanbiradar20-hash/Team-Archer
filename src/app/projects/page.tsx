import { Search, Filter, Grid3x3, List, Star, Eye, Heart, TrendingUp, Calendar, Users } from "lucide-react"
import ProjectCard from "@/components/projects/ProjectCard"
import { Project } from "@/types"

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
    title: "Real-time Collaborative Whiteboard",
    description: "A multiplayer drawing board with real-time synchronization, multiple tools, and export functionality.",
    extended_description: "Built with WebSocket for real-time collaboration, this whiteboard supports multiple users drawing simultaneously with various tools and colors.",
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["TypeScript", "Next.js", "Socket.io", "Canvas API", "Redis"],
    team_members_names: ["Diana Prince", "Edward Wilson"],
    github_url: "https://github.com/clubnexus/collab-whiteboard",
    live_url: "https://collab-whiteboard.vercel.app",
    documentation_url: "https://docs.collab-whiteboard.vercel.app",
    domain: "Web Development",
    year: "2024",
    team_size: 2,
    is_featured: true,
    is_archived: false,
    likes_count: 89,
    created_by: "user2",
    created_at: "2024-01-20T14:00:00Z",
  },
  {
    id: "3",
    title: "Sustainable Energy Monitoring Dashboard",
    description: "Dashboard for monitoring solar panel efficiency, energy consumption, and carbon footprint reduction.",
    extended_description: "IoT sensors collect real-time data from solar panels which is visualized in an interactive dashboard with predictive analytics.",
    thumbnail_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["React", "D3.js", "Node.js", "IoT", "MongoDB"],
    team_members_names: ["Fiona Gallagher", "George Harris", "Hannah Lee"],
    github_url: "https://github.com/clubnexus/energy-monitor",
    live_url: "https://energy-dashboard.vercel.app",
    documentation_url: "https://docs.energy-monitor.vercel.app",
    domain: "IoT",
    year: "2024",
    team_size: 3,
    is_featured: false,
    is_archived: false,
    likes_count: 67,
    created_by: "user3",
    created_at: "2024-03-01T09:00:00Z",
  },
  {
    id: "4",
    title: "AR Campus Navigation System",
    description: "Augmented Reality app for indoor campus navigation with points of interest and accessibility features.",
    extended_description: "Uses ARCore and ARKit to provide indoor navigation for large campus buildings with accessibility features for visually impaired users.",
    thumbnail_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Unity", "C#", "ARKit", "ARCore", "Firebase"],
    team_members_names: ["Ian Miller", "Julia Chen"],
    github_url: "https://github.com/clubnexus/ar-campus",
    live_url: "https://ar-campus.vercel.app",
    documentation_url: "https://docs.ar-campus.vercel.app",
    domain: "AR/VR",
    year: "2023",
    team_size: 2,
    is_featured: true,
    is_archived: false,
    likes_count: 124,
    created_by: "user4",
    created_at: "2023-12-10T11:00:00Z",
  },
  {
    id: "5",
    title: "Blockchain-based Certificate Verification",
    description: "Decentralized system for issuing and verifying academic certificates using blockchain technology.",
    extended_description: "Smart contracts on Ethereum blockchain ensure tamper-proof certificate issuance and verification with IPFS for document storage.",
    thumbnail_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?w=800&auto=format&fit=crop"
    ],
    tech_stack: ["Solidity", "Ethereum", "React", "IPFS", "Web3.js"],
    team_members_names: ["Kevin Patel", "Lisa Wang", "Mike Rodriguez"],
    github_url: "https://github.com/clubnexus/certificate-chain",
    live_url: "https://cert-chain.vercel.app",
    documentation_url: "https://docs.certificate-chain.vercel.app",
    domain: "Blockchain",
    year: "2024",
    team_size: 3,
    is_featured: true,
    is_archived: false,
    likes_count: 156,
    created_by: "user5",
    created_at: "2024-01-05T08:00:00Z",
  },
  {
    id: "6",
    title: "Mental Health Chatbot with NLP",
    description: "AI chatbot providing mental health support, mood tracking, and coping strategies using natural language processing.",
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
  { id: "completed", label: "Completed", count: 5 },
  { id: "in_progress", label: "In Progress", count: 2 },
  { id: "planned", label: "Planned", count: 1 },
]

const technologies = [
  "React", "Python", "TypeScript", "Node.js", "Unity", "Blockchain", "AI/ML", "IoT", "AR/VR", "Mobile"
]

export default function ProjectsPage() {
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
                  className="w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-text-secondary">Total Projects</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-500">5</div>
                <div className="text-text-secondary">Completed</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-secondary">793</div>
                <div className="text-text-secondary">Total Likes</div>
              </div>
              <div className="bg-bg-secondary border border-border rounded-2xl p-6">
                <div className="text-3xl font-bold text-amber-500">4.2k</div>
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
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-primary transition-colors text-left"
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
                      className="px-3 py-1.5 text-sm bg-bg-primary border border-border rounded-lg hover:border-secondary transition-colors"
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
                  {[
                    { label: "Most Popular", icon: TrendingUp },
                    { label: "Most Liked", icon: Heart },
                    { label: "Most Viewed", icon: Eye },
                    { label: "Newest", icon: Calendar },
                    { label: "Top Rated", icon: Star },
                  ].map((option) => (
                    <button
                      key={option.label}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-bg-primary transition-colors text-left"
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
                  <button className="flex-1 py-2 px-4 rounded-lg bg-primary text-white flex items-center justify-center gap-2">
                    <Grid3x3 className="w-4 h-4" />
                    Grid
                  </button>
                  <button className="flex-1 py-2 px-4 rounded-lg bg-bg-primary border border-border flex items-center justify-center gap-2">
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
                <h2 className="text-2xl font-bold">Featured Projects</h2>
                <p className="text-text-secondary">Showing {mockProjects.length} projects</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
                  Submit Project
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {mockProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Empty State */}
            {mockProjects.length === 0 && (
              <div className="py-16 text-center border border-dashed border-border rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-bg-tertiary border border-border flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {mockProjects.length > 0 && (
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                <div className="text-text-secondary">
                  Showing 1-{mockProjects.length} of {mockProjects.length} projects
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-secondary text-white rounded-lg">1</button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
                    3
                  </button>
                  <button className="px-4 py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
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