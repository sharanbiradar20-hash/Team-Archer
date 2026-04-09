import { Trophy, Clock, Users, Target, Code, BookOpen, Share2, Bookmark, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Challenge, Submission } from "@/types"
import { formatDate } from "@/lib/utils"
import ChallengeSubmissionForm from "@/components/challenges/ChallengeSubmissionForm"
import ChallengeLeaderboard from "@/components/challenges/ChallengeLeaderboard"
import ChallengeResources from "@/components/challenges/ChallengeResources"

// Mock data - will be replaced with Supabase query
const mockChallenge: Challenge = {
  id: "1",
  title: "Real-time Chat Application",
  description: "Build a real-time chat application with WebSocket support, user authentication, and message persistence.",
  problem_statement: `Create a full-stack chat application that supports:
- Real-time messaging using WebSockets
- User authentication and authorization
- Multiple chat rooms/channels
- File sharing (images, documents)
- Message history and search
- Online/offline status indicators
- Push notifications for new messages

The application should be scalable, secure, and provide a smooth user experience.`,
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
  tags: ["WebSocket", "React", "Node.js", "MongoDB", "Authentication", "Real-time"],
  created_by: null,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
}

// Mock resources data
const mockResources = [
  {
    id: "1",
    title: "WebSocket Documentation",
    description: "Complete guide to WebSocket API and implementation",
    type: "documentation" as const,
    url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket",
    fileSize: "2.3 MB",
    downloads: 124,
  },
  {
    id: "2",
    title: "React + Node.js Starter Kit",
    description: "Pre-configured project with authentication and real-time setup",
    type: "starter_code" as const,
    url: "https://github.com/clubnexus/chat-app-starter",
    fileSize: "15.7 MB",
    downloads: 89,
  },
  {
    id: "3",
    title: "Real-time Chat Tutorial",
    description: "Step-by-step video guide building a chat application",
    type: "video" as const,
    url: "https://youtube.com/watch?v=example",
    downloads: 56,
  },
  {
    id: "4",
    title: "Authentication Best Practices",
    description: "Article on secure authentication implementation",
    type: "article" as const,
    url: "https://blog.clubnexus.dev/auth-best-practices",
    downloads: 42,
  },
  {
    id: "5",
    title: "Socket.IO Debug Tool",
    description: "Browser extension for debugging WebSocket connections",
    type: "tool" as const,
    url: "https://chrome.google.com/socketio-debug",
    downloads: 31,
  },
  {
    id: "6",
    title: "MongoDB Schema Design",
    description: "Guide to designing efficient database schemas for chat apps",
    type: "documentation" as const,
    url: "https://docs.mongodb.com/chat-schema",
    fileSize: "1.8 MB",
    downloads: 67,
  },
]

// Mock submissions data
const mockSubmissions = [
  {
    id: "1",
    challenge_id: "1",
    user_id: "user1",
    github_url: "https://github.com/alice/chat-app",
    live_url: "https://chat-app-alice.vercel.app",
    score: 92,
    feedback: "Excellent implementation with great UI/UX",
    status: "graded" as const,
    submitted_at: "2024-03-15T14:30:00Z",
    graded_at: "2024-03-16T10:15:00Z",
    user: {
      id: "user1",
      full_name: "Alice Johnson",
      avatar_url: null,
      rank: "Expert",
    },
  },
  {
    id: "2",
    challenge_id: "1",
    user_id: "user2",
    github_url: "https://github.com/bob/realtime-chat",
    live_url: "https://bob-chat.herokuapp.com",
    score: 85,
    feedback: "Good functionality, needs better documentation",
    status: "graded" as const,
    submitted_at: "2024-03-10T09:45:00Z",
    graded_at: "2024-03-11T16:20:00Z",
    user: {
      id: "user2",
      full_name: "Bob Smith",
      avatar_url: null,
      rank: "Advanced",
    },
  },
  {
    id: "3",
    challenge_id: "1",
    user_id: "user3",
    github_url: "https://github.com/charlie/web-chat",
    live_url: null,
    score: 78,
    feedback: "Solid implementation, room for improvement in code quality",
    status: "graded" as const,
    submitted_at: "2024-03-05T18:20:00Z",
    graded_at: "2024-03-07T11:30:00Z",
    user: {
      id: "user3",
      full_name: "Charlie Brown",
      avatar_url: null,
      rank: "Intermediate",
    },
  },
  {
    id: "4",
    challenge_id: "1",
    user_id: "user4",
    github_url: "https://github.com/diana/chat-solution",
    live_url: "https://diana-chat.netlify.app",
    score: 95,
    feedback: "Outstanding work with excellent documentation",
    status: "graded" as const,
    submitted_at: "2024-03-18T11:10:00Z",
    graded_at: "2024-03-19T09:45:00Z",
    user: {
      id: "user4",
      full_name: "Diana Prince",
      avatar_url: null,
      rank: "Expert",
    },
  },
  {
    id: "5",
    challenge_id: "1",
    user_id: "user5",
    github_url: "https://github.com/edward/chat-app",
    live_url: null,
    score: null,
    feedback: null,
    status: "pending" as const,
    submitted_at: "2024-03-20T16:45:00Z",
    graded_at: null,
    user: {
      id: "user5",
      full_name: "Edward Wilson",
      avatar_url: null,
      rank: "Beginner",
    },
  },
  {
    id: "6",
    challenge_id: "1",
    user_id: "user6",
    github_url: "https://github.com/fiona/chat-project",
    live_url: "https://fiona-chat.vercel.app",
    score: 88,
    feedback: "Great UI design, good real-time implementation",
    status: "graded" as const,
    submitted_at: "2024-03-12T13:15:00Z",
    graded_at: "2024-03-13T14:50:00Z",
    user: {
      id: "user6",
      full_name: "Fiona Gallagher",
      avatar_url: null,
      rank: "Advanced",
    },
  },
]

interface ChallengePageProps {
  params: Promise<{ id: string }>
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { id } = await params
  
  // In real implementation, fetch challenge from Supabase
  // const challenge = await getChallengeById(id)
  const challenge = mockChallenge
  
  if (!challenge) {
    notFound()
  }

  const isActive = challenge.status === "active"
  const totalPoints = challenge.scoring_rules && typeof challenge.scoring_rules === 'object'
    ? Object.values(challenge.scoring_rules as Record<string, number>).reduce((sum: number, val: number) => sum + val, 0)
    : 100

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/challenges"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Challenges
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-bg-primary" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                      <Trophy className="w-4 h-4" />
                      <span>{totalPoints} Points</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-medium">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span className="capitalize">{challenge.difficulty}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium">
                      <span className="capitalize">{challenge.category.replace('_', ' ')}</span>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      isActive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current" />
                      <span className="capitalize">{challenge.status}</span>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{challenge.title}</h1>
                  <p className="text-xl text-text-secondary mb-8">{challenge.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {challenge.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg text-sm bg-bg-secondary text-text-secondary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Clock className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Deadline</p>
                        <p className="font-semibold">{formatDate(challenge.deadline)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Submissions</p>
                        <p className="font-semibold">24</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Target className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Success Rate</p>
                        <p className="font-semibold">68%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-bg-secondary rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Trophy className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Top Score</p>
                        <p className="font-semibold">92/100</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="bg-bg-secondary rounded-2xl border border-border p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Problem Statement</h2>
                      <p className="text-text-secondary">Detailed requirements and specifications</p>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-text-primary bg-bg-primary p-6 rounded-lg border border-border">
                      {challenge.problem_statement}
                    </pre>
                  </div>
                </div>

                {/* Scoring Rules */}
                {challenge.scoring_rules && typeof challenge.scoring_rules === 'object' && (
                  <div className="bg-bg-secondary rounded-2xl border border-border p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Target className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Scoring Rubric</h2>
                        <p className="text-text-secondary">How your submission will be evaluated</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(challenge.scoring_rules as Record<string, number>).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 rounded-lg bg-bg-primary border border-border">
                          <div>
                            <h4 className="font-semibold capitalize">{key.replace('_', ' ')}</h4>
                            <p className="text-sm text-text-secondary">Evaluation criteria for this category</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-secondary">{value}</div>
                            <div className="text-sm text-text-secondary">points</div>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-primary/10 border border-border">
                        <div>
                          <h4 className="font-semibold">Total Points</h4>
                          <p className="text-sm text-text-secondary">Maximum achievable score</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">{totalPoints}</div>
                          <div className="text-sm text-text-secondary">points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources & Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ChallengeResources resources={mockResources} challengeId={challenge.id} />
                  <ChallengeLeaderboard submissions={mockSubmissions} challengeId={challenge.id} />
                </div>
              </div>

              {/* Sidebar - Submission Form */}
              <div className="lg:w-1/3">
                <div className="sticky top-24 space-y-6">
                  <ChallengeSubmissionForm
                    challengeId={challenge.id}
                    challengeTitle={challenge.title}
                    isActive={isActive}
                    deadline={challenge.deadline}
                  />

                  {/* Quick Actions */}
                  <div className="bg-bg-secondary rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full py-3 border border-border rounded-lg hover:bg-bg-primary transition-colors font-medium flex items-center justify-center gap-2">
                        <Code className="w-5 h-5" />
                        Fork Starter Code
                      </button>
                      <button className="w-full py-3 border border-border rounded-lg hover:bg-bg-primary transition-colors font-medium flex items-center justify-center gap-2">
                        <Bookmark className="w-5 h-5" />
                        Save Challenge
                      </button>
                      <button className="w-full py-3 border border-border rounded-lg hover:bg-bg-primary transition-colors font-medium flex items-center justify-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share Challenge
                      </button>
                    </div>
                  </div>

                  {/* Status Alert */}
                  <div className={`p-6 rounded-2xl border ${
                    isActive 
                      ? "bg-green-500/10 border-green-500/20" 
                      : "bg-red-500/10 border-red-500/20"
                  }`}>
                    <div className="flex items-start gap-3">
                      {isActive ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-semibold mb-1">
                          {isActive ? "Challenge Active" : "Challenge Ended"}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {isActive 
                            ? `Submissions accepted until ${formatDate(challenge.deadline)}`
                            : "This challenge is no longer accepting submissions"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}