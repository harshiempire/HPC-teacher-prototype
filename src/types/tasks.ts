export type TaskStatus = 'assigned' | 'in_progress' | 'upcoming' | 'completed' | 'for_review'
export type CoScholasticStatus = 'completed' | 'not_completed'
export type TaskType = 'all' | 'abl' | 'pbl' | 'safal'
export type CoScholasticCategory = 'fine_arts' | 'domains'
export type DomainType = 'sports_games' | 'ethical_empathy' | 'aesthetic_cultural' | 'positive_habits' | 'character_development' | 'stress_anxiety'
export type ProficiencyLevel = 'Hobby' | 'Proficient' | 'Competition'
export type DomainProficiencyLevel = 'not_at_all' | 'just_a_little' | 'pretty_much' | 'very_much'
export type AssessmentStatus = 'pending' | 'reviewed' | 'approved'
export type ScholasticAssessmentStatus = 'self_assessment_pending' | 'peer_review_pending' | 'teacher_review_pending' | 'completed'

export interface Competency {
  id: string
  name: string
  parameters: Parameter[]
  weightage: number
  taxonomyLevel?: string
}

export interface Parameter {
  id: string
  name: string
  levels: AssessmentLevel[]
  selectedLevel?: number
}

export interface AssessmentLevel {
  level: number
  marks: number
  description: string
}

export interface ScholasticAssessment {
  competencies: Competency[]
  status: ScholasticAssessmentStatus
  selfAssessment?: CompetencyAssessment
  peerAssessment?: CompetencyAssessment
  teacherAssessment?: CompetencyAssessment
  feedback?: {
    peer?: string
    teacher?: string
  }
  submittedAt?: string
  peerReviewedAt?: string
  teacherReviewedAt?: string
  totalMarks?: number
  earnedMarks?: number
  assignedPeerReviewerId?: string
}

export interface CompetencyAssessment {
  competencies: Record<string, Record<string, number>>
  comments?: string
}

export interface DomainActivity {
  id: string
  name: string
  description: string
  studentAssessment?: DomainProficiencyLevel
  teacherAssessment?: DomainProficiencyLevel
}

export interface DomainAssessment {
  activities: DomainActivity[]
  status: 'pending' | 'reviewed'
  submittedAt?: string
  reviewedAt?: string
}

export interface Task {
  id: string
  title: string
  subject?: string
  type: TaskType
  startDate: string
  endDate: string
  status: TaskStatus
  description?: string
  scholasticAssessment?: ScholasticAssessment
  userId?: string
  priority?: 'high' | 'medium' | 'low'
}

export interface CoScholasticTask {
  id: string
  activity: string
  category: CoScholasticCategory
  domainType?: DomainType
  proficiencyLevel?: ProficiencyLevel
  evidence?: string[]
  status: CoScholasticStatus
  description?: string
  assessmentStatus?: AssessmentStatus
  reflection?: string
  domainAssessment?: DomainAssessment
}

export interface Evidence {
  id: string
  fileUrl: string
  fileType: string
  fileName: string
}

export interface ProficiencyRubric {
  level: ProficiencyLevel
  description: string
  requirements: string[]
  evidenceRequired: boolean
}