export const SITE_NAME = "ClubNexus"
export const SITE_DESCRIPTION = "A Centralised Platform for College Technical Clubs"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Events", href: "/events" },
  { label: "Challenges", href: "/challenges" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Dashboard", href: "/dashboard", auth: true },
]

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Events", href: "/admin/events" },
  { label: "Challenges", href: "/admin/challenges" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Team", href: "/admin/team" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Users", href: "/admin/users" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Audit Log", href: "/admin/audit" },
]

export const EVENT_CATEGORIES = [
  { value: "workshop", label: "Workshop" },
  { value: "hackathon", label: "Hackathon" },
  { value: "talk", label: "Talk" },
  { value: "competition", label: "Competition" },
  { value: "social", label: "Social" },
]

export const CHALLENGE_DIFFICULTIES = [
  { value: "easy", label: "Easy", color: "green" },
  { value: "medium", label: "Medium", color: "yellow" },
  { value: "hard", label: "Hard", color: "red" },
]

export const CHALLENGE_CATEGORIES = [
  { value: "ui_ux", label: "UI/UX" },
  { value: "full_stack", label: "Full Stack" },
  { value: "api_design", label: "API Design" },
  { value: "open_innovation", label: "Open Innovation" },
]

export const RANK_BADGES = {
  newbie: { label: "Newbie", color: "gray", threshold: 0 },
  contributor: { label: "Contributor", color: "blue", threshold: 100 },
  expert: { label: "Expert", color: "purple", threshold: 500 },
  legend: { label: "Legend", color: "amber", threshold: 1000 },
}

export const TECH_STACK_OPTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
  "Python", "Django", "Flask", "Java", "Spring", "C#", ".NET",
  "Go", "Rust", "PHP", "Laravel", "Ruby", "Rails",
  "Vue", "Angular", "Svelte", "Tailwind CSS", "Bootstrap",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP",
  "GraphQL", "REST", "WebSocket", "WebRTC",
]

export const DOMAIN_OPTIONS = [
  "Web Development", "Mobile Development", "AI/ML", "Data Science",
  "Cybersecurity", "DevOps", "Cloud Computing", "Blockchain",
  "IoT", "AR/VR", "Game Development", "UI/UX Design",
]

export const BATCH_YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "Alumni"]