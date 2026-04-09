import { Trophy, Filter, Search, Clock, Users, Target, TrendingUp } from "lucide-react"
import { CHALLENGE_DIFFICULTIES, CHALLENGE_CATEGORIES } from "@/lib/constants"
import ChallengeCard from "@/components/challenges/ChallengeCard"
import { Challenge } from "@/types"

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
    scoring_rules: {
      functionality: 40,
      code_quality: 30,
      ui_ux: 20,
      documentation: 10,
    },
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
    scoring_rules: {
      accuracy: 50,
      performance: 30,
      code_quality: 20,
    },
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
    scoring_rules: {
      design: 40,
      responsiveness: 30,
      interactivity: 20,
      accessibility: 10,
    },
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
    scoring_rules: {
      functionality: 40,
      security: 30,
      documentation: 20,
      performance: 10,
    },
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
    scoring_rules: {
      innovation: 40,
      security: 30,
      usability: 20,
      documentation: 10,
    },
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
    scoring_rules: {
      functionality: 40,
      ui_ux: 30,
      performance: 20,
      offline_support: 10,
    },
    tags: ["React Native", "Expo", "Firebase", "Health APIs"],
    created_by: null,
    created_at: "2024-03-10T10:00:00Z",
    updated_at: "2024-03-10T10:00:00Z",
  },
]

export default function ChallengesPage() {
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <button className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24</div>
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
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Difficulty</h4>
                      <div className="space-y-2">
                        {CHALLENGE_DIFFICULTIES.map((diff) => (
                          <label key={diff.value} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                            <input type="checkbox" className="rounded border-border" />
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full bg-${diff.color}-500`} />
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
                            <input type="checkbox" className="rounded border-border" />
                            <span>{cat.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Status</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="checkbox" className="rounded border-border" defaultChecked />
                          <span className="text-green-500">● Active</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="checkbox" className="rounded border-border" />
                          <span className="text-red-500">● Ended</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="checkbox" className="rounded border-border" />
                          <span className="text-gray-500">● Draft</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Deadline</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="radio" name="deadline" className="rounded-full border-border" />
                          <span>This Week</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="radio" name="deadline" className="rounded-full border-border" />
                          <span>This Month</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-bg-primary">
                          <input type="radio" name="deadline" className="rounded-full border-border" defaultChecked />
                          <span>Any Time</span>
                        </label>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium">
                      Apply Filters
                    </button>
                    <button className="w-full py-2 border border-border rounded-lg hover:bg-bg-secondary transition-colors">
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-xl p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp size={20} />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Your Rank</span>
                      <span className="font-semibold text-primary">#42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Points Earned</span>
                      <span className="font-semibold text-secondary">1,250</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Submissions</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Badges</span>
                      <span className="font-semibold text-amber-500">3</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-colors">
                    View Dashboard
                  </button>
                </div>
              </div>
            </aside>

            {/* Challenges Grid */}
            <main className="lg:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold">All Challenges</h2>
                  <p className="text-text-secondary">Showing {mockChallenges.length} challenges</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select className="px-4 py-2 rounded-lg bg-bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-secondary">
                    <option>Sort by: Deadline (Soonest)</option>
                    <option>Sort by: Difficulty</option>
                    <option>Sort by: Popularity</option>
                    <option>Sort by: Points</option>
                  </select>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Grid View
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border bg-bg-secondary">
                    List View
                  </button>
                </div>
              </div>

              {mockChallenges.length === 0 ? (
                <div className="text-center py-16">
                  <Target className="w-16 h-16 mx-auto text-text-tertiary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                  <p className="text-text-secondary">Try adjusting your filters or check back later for new challenges.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockChallenges.map((challenge) => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-secondary text-white">1</button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    3
                  </button>
                  <span className="px-2">...</span>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    8
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-border hover:bg-bg-secondary transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}