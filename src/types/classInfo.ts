export interface ClassDetails {
  name: string
  section: string
  academicYear: string
  classTeacher: string
}

export interface Activity {
  id: string
  title: string
  type: 'assignment' | 'project' | 'test'
  subject: string
  dueDate: string
  status: 'pending' | 'completed'
}

export interface Announcement {
  id: string
  title: string
  message: string
  teacher: string
  date: string
}

export interface Teacher {
  id: string
  name: string
  subject: string
  designation?: string
  email: string
}

export interface TimeTable {
  days: string[]
  periods: string[]
  schedule: Record<string, string[]>
}

export interface Chapter {
  name: string
  status: 'completed' | 'in_progress' | 'not_started'
}

export interface Subject {
  subject: string
  progress: number
  chapters: Chapter[]
}

export interface SurveyQuestion {
  id: string
  question: string
  options: string[]
}