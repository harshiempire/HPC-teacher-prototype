import type { Task } from './tasks'

export interface PerformanceMetric {
  subject: string
  score: number
  classAverage: number
  improvement: 'needs_improvement' | 'average' | 'excellent'
}

export interface SkillProgress {
  name: string
  completionRate: number
  totalActivities: number
  completedActivities: number
}

export interface ActivityParticipation {
  category: string
  count: number
  details: {
    name: string
    date: string
    achievement?: string
  }[]
}

export interface DisciplineRating {
  rating: 'excellent' | 'good' | 'needs_improvement'
  teacherFeedback: string[]
  lastUpdated: string
}

export interface HealthActivity {
  type: string
  participationRate: number
  performance: number
  lastActivity: string
}

export interface DashboardData {
  academicPerformance: {
    overall: number
    subjects: PerformanceMetric[]
  }
  extracurricular: ActivityParticipation[]
  skillDevelopment: SkillProgress[]
  discipline: DisciplineRating
  health: {
    activities: HealthActivity[]
    overallScore: number
  }
  tasks: {
    total: number
    completed: number
    pending: number
    upcoming: Task[]
  }
  attendance: {
    monthly: {
      present: number
      absent: number
      late: number
      total: number
    }
    classAverage: number
  }
}