// User Types
export interface User {
  id: string
  username: string
  email: string
  avatar_url?: string
  reputation: number
  verified: boolean
  bio?: string
  expertise_tags?: string[]
  badges?: Badge[]
  followers_count: number
  following_count: number
  debates_count: number
  arguments_count: number
  created_at: string
  last_login?: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  earned_at: string
}

// Debate Types
export interface Debate {
  id: string
  title: string
  description: string
  creator: User
  status: 'active' | 'closed' | 'archived'
  visibility: 'public' | 'private' | 'unlisted'
  type: 'oxford' | 'lincoln-douglas' | 'free-form'
  tags: string[]
  participants: User[]
  arguments_count: number
  views_count: number
  created_at: string
  updated_at: string
  rules?: DebateRules
  featured: boolean
}

export interface DebateRules {
  max_arguments_per_user?: number
  time_limit?: number
  moderation_level: 'none' | 'light' | 'strict'
  allow_anonymous: boolean
  require_citations: boolean
}

// Argument Types
export interface Argument {
  id: string
  debate_id: string
  author: User
  parent_id?: string
  type: 'claim' | 'evidence' | 'counter' | 'support'
  content: string
  citations?: Citation[]
  images?: string[]
  position: { x: number; y: number }
  ratings: ArgumentRating[]
  average_rating: number
  replies_count: number
  ai_analysis?: AIAnalysis
  created_at: string
  updated_at: string
  edited: boolean
}

export interface Citation {
  id: string
  url: string
  title: string
  description?: string
  source_type: 'academic' | 'news' | 'website' | 'book' | 'other'
}

export interface ArgumentRating {
  id: string
  rater: User
  argument_id: string
  score: number
  criteria: {
    logic: number
    evidence: number
    relevance: number
    clarity: number
  }
  feedback?: string
  created_at: string
}

// AI Analysis Types
export interface AIAnalysis {
  fallacies: Fallacy[]
  fact_check: FactCheck
  tone_analysis: ToneAnalysis
  strength_score: number
  suggestions: string[]
}

export interface Fallacy {
  type: string
  confidence: number
  explanation: string
  text_excerpt: string
}

export interface FactCheck {
  claims: FactClaim[]
  overall_credibility: number
}

export interface FactClaim {
  claim: string
  verdict: 'true' | 'false' | 'partially_true' | 'unverifiable'
  confidence: number
  sources: string[]
}

export interface ToneAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral'
  emotion: string
  formality: number
  respectfulness: number
}

// Connection Types
export interface Connection {
  id: string
  source_argument_id: string
  target_argument_id: string
  type: 'supports' | 'opposes' | 'clarifies' | 'questions'
  strength: number
  created_by: User
  created_at: string
}

// Notification Types
export interface Notification {
  id: string
  user_id: string
  type: 'argument_reply' | 'debate_invite' | 'rating_received' | 'badge_earned' | 'mention'
  title: string
  message: string
  data?: any
  read: boolean
  created_at: string
}

// Search Types
export interface SearchResult {
  debates: Debate[]
  arguments: Argument[]
  users: User[]
  total_count: number
}

export interface SearchFilters {
  query?: string
  type?: 'debates' | 'arguments' | 'users'
  tags?: string[]
  date_range?: {
    start: string
    end: string
  }
  sort_by?: 'relevance' | 'date' | 'popularity' | 'rating'
  sort_order?: 'asc' | 'desc'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    message: string
    details?: any
  }
  meta?: {
    pagination?: {
      page: number
      limit: number
      total: number
      total_pages: number
    }
    timestamp: string
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirm_password: string
}

export interface ForgotPasswordForm {
  email: string
}

export interface ResetPasswordForm {
  token: string
  password: string
  confirm_password: string
}

export interface CreateDebateForm {
  title: string
  description: string
  type: 'oxford' | 'lincoln-douglas' | 'free-form'
  tags: string[]
  visibility: 'public' | 'private' | 'unlisted'
  rules: DebateRules
}

export interface CreateArgumentForm {
  content: string
  type: 'claim' | 'evidence' | 'counter' | 'support'
  parent_id?: string
  citations?: Omit<Citation, 'id'>[]
  images?: File[]
}

// Component Props Types
export interface DebateCardProps {
  debate: Debate
  showActions?: boolean
  compact?: boolean
}

export interface ArgumentNodeProps {
  argument: Argument
  selected?: boolean
  onSelect?: (argument: Argument) => void
  onEdit?: (argument: Argument) => void
  onDelete?: (argument: Argument) => void
}

export interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showBadge?: boolean
  showTooltip?: boolean
}

// Graph Types
export interface GraphNode {
  id: string
  argument: Argument
  x: number
  y: number
  connections: GraphConnection[]
}

export interface GraphConnection {
  id: string
  source: string
  target: string
  type: 'supports' | 'opposes' | 'clarifies' | 'questions'
  strength: number
}

export interface GraphViewport {
  x: number
  y: number
  zoom: number
}

// Admin Types
export interface AdminStats {
  users: {
    total: number
    active_today: number
    new_this_week: number
  }
  debates: {
    total: number
    active: number
    created_today: number
  }
  arguments: {
    total: number
    created_today: number
    average_rating: number
  }
  moderation: {
    pending_reports: number
    flagged_content: number
  }
}

export interface ModerationReport {
  id: string
  reporter: User
  reported_content_type: 'argument' | 'debate' | 'user'
  reported_content_id: string
  reason: string
  description: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  created_at: string
  reviewed_by?: User
  reviewed_at?: string
}