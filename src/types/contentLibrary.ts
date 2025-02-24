export type ResourceType = 'textbook' | 'workbook' | 'worksheet' | 'flashcard' | 'mindmap' | 'simulation' | 'video' | 'podcast' | 'document' | 'audio' | 'image'

export interface Resource {
  id: string
  title: string
  type: ResourceType
  format: string
  description?: string
  url: string
  thumbnail?: string
  likes: number
  views: number
  uploadedBy?: string
  uploadedAt: string
  school?: string
}

export interface Chapter {
  id: string
  name: string
  resources: {
    textbooks: Resource[]
    workbooks: Resource[]
    worksheets: Resource[]
    flashcards: Resource[]
    mindmaps: Resource[]
    simulations: Resource[]
    videos: Resource[]
    podcasts: Resource[]
  }
}

export interface Subject {
  id: string
  name: string
  chapters: Chapter[]
}

export interface GlobalContent {
  id: string
  title: string
  type: ResourceType
  format: string
  url: string
  uploadedBy: string
  school: string
  uploadedAt: string
  likes: number
  views: number
}

export interface Topic {
  id: string
  name: string
  resources: Resource[]
}

export interface Category {
  id: string
  name: string
  topics: Topic[]
}