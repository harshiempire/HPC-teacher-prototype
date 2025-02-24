import { z } from 'zod'
import { departmentList } from '@/stores/notices'

export type NoticeCategory = 'event' | 'examination' | 'emergency' | 'announcement'
export type NoticePriority = 'low' | 'medium' | 'high'
export type Department = typeof departmentList[number]

export interface Notice {
  id: string
  title: string
  description: string
  category: NoticeCategory
  date: string
  time?: string
  venue?: string
  priority: NoticePriority
  attachments?: string[]
  author: string
  department: Department
  expiresAt?: string
  isRead?: boolean
}

export const noticeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['event', 'examination', 'emergency', 'announcement']),
  date: z.string(),
  time: z.string().optional(),
  venue: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  attachments: z.array(z.string()).optional(),
  author: z.string(),
  department: z.enum(departmentList),
  expiresAt: z.string().optional(),
  isRead: z.boolean().optional()
})