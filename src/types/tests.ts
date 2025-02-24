export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  selectedAnswer?: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface PracticeTest {
  id: string
  subject: string
  chapters: string[]
  totalQuestions: number
  timeLimit: number // in minutes
  questionDistribution: QuestionDistribution
  questions: Question[]
  status: 'not_started' | 'in_progress' | 'completed'
  score?: number
  startedAt?: string
  completedAt?: string
  createdAt: string
}

export interface TestConfig {
  subject: string
  chapters: string[]
  totalQuestions: number
  timeLimit: number
  questionDistribution: QuestionDistribution
}

export interface SubjectChapter {
  subject: string
  chapters: string[]
}

export interface QuestionDistribution {
  easy: number
  medium: number
  hard: number
}

// Mock data structure for available subjects and chapters
export const availableSubjects: SubjectChapter[] = [
  {
    subject: 'Mathematics',
    chapters: [
      'Numbers and Operations',
      'Algebra',
      'Geometry',
      'Data Handling',
      'Mensuration'
    ]
  },
  {
    subject: 'Science',
    chapters: [
      'Matter and Materials',
      'Living World',
      'Natural Phenomena',
      'Energy',
      'Environment'
    ]
  },
  {
    subject: 'English',
    chapters: [
      'Reading Comprehension',
      'Grammar',
      'Writing',
      'Literature',
      'Vocabulary'
    ]
  }
]