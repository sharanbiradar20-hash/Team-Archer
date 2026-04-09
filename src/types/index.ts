export type UserRole = "visitor" | "member" | "admin"
export type EventStatus = "draft" | "published" | "unpublished"
export type EventCategory = "workshop" | "hackathon" | "talk" | "competition" | "social"
export type ChallengeDifficulty = "easy" | "medium" | "hard"
export type ChallengeCategory = "ui_ux" | "full_stack" | "api_design" | "open_innovation"
export type ChallengeStatus = "active" | "ended" | "draft"
export type SubmissionStatus = "pending" | "reviewed" | "graded"
export type RankBadge = "newbie" | "contributor" | "expert" | "legend"

export interface Profile {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  github_url: string | null
  linkedin_url: string | null
  tech_stack: string[]
  role: UserRole
  rank: RankBadge
  total_score: number
  is_banned: boolean
  notification_preferences: {
    email: boolean
    events: boolean
    challenges: boolean
  }
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  profile_id: string | null
  name: string
  photo_url: string | null
  designation: string
  hierarchy_level: number
  batch_year: string | null
  domain: string | null
  skills: string[]
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  is_alumni: boolean
  display_order: number
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  banner_image_url: string | null
  event_date: string
  end_date: string | null
  venue: string
  mode: string
  category: EventCategory
  status: EventStatus
  schedule: any
  speakers: any
  faqs: any
  registration_count: number
  results: any
  gallery_album_id: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  user_id: string
  registered_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  problem_statement: string
  difficulty: ChallengeDifficulty
  category: ChallengeCategory
  status: ChallengeStatus
  deadline: string
  scoring_rules: any
  tags: string[]
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  challenge_id: string
  user_id: string
  github_url: string
  live_url: string | null
  score: number | null
  feedback: string | null
  status: SubmissionStatus
  submitted_at: string
  graded_at: string | null
}

export interface Project {
  id: string
  title: string
  description: string
  extended_description: string | null
  thumbnail_url: string | null
  screenshots: string[]
  tech_stack: string[]
  team_members_names: string[]
  github_url: string | null
  live_url: string | null
  documentation_url: string | null
  domain: string | null
  year: string | null
  team_size: number
  is_featured: boolean
  is_archived: boolean
  likes_count: number
  created_by: string | null
  created_at: string
}

export interface ProjectLike {
  id: string
  project_id: string
  user_id: string
  created_at: string
}

export interface GalleryAlbum {
  id: string
  title: string
  event_name: string | null
  event_date: string | null
  cover_image_url: string | null
  created_by: string | null
  created_at: string
}

export interface GalleryImage {
  id: string
  album_id: string
  image_url: string
  caption: string | null
  display_order: number
  uploaded_by: string | null
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  is_active: boolean
  created_by: string | null
  created_at: string
}

export interface AuditLog {
  id: string
  admin_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  details: any
  created_at: string
}