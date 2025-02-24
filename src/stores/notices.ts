import type { Notice, NoticeCategory } from '@/types/notice'

export const notices: Notice[] = [
  {
    id: '1',
    title: 'Annual Sports Day',
    description: 'Annual Sports Day will be held on March 15th, 2025. All students are required to participate in at least one event.',
    category: 'event',
    date: '2025-03-15',
    time: '09:00 AM',
    venue: 'School Sports Ground',
    priority: 'medium',
    author: 'Sports Department',
    department: 'Sports'
  },
  {
    id: '2',
    title: 'First Term Examination Schedule',
    description: 'First term examinations will commence from March 20th, 2025. Detailed schedule is attached.',
    category: 'examination',
    date: '2025-03-20',
    priority: 'high',
    author: 'Examination Department',
    department: 'Academics',
    attachments: ['exam_schedule.pdf']
  },
  {
    id: '3',
    title: 'Weather Advisory: Heavy Rain',
    description: 'Due to heavy rain forecast, all outdoor activities are suspended until further notice.',
    category: 'emergency',
    date: '2025-03-10',
    priority: 'high',
    author: 'Principal\'s Office',
    department: 'Administration',
    expiresAt: '2025-03-12'
  },
  {
    id: '4',
    title: 'New Library Resources',
    description: 'New digital resources have been added to the library. Students can access them through their portal.',
    category: 'announcement',
    date: '2025-03-08',
    priority: 'low',
    author: 'Library Department',
    department: 'Library'
  },
  {
    id: '5',
    title: 'Cultural Program',
    description: 'Annual cultural program featuring dance, music, and drama performances.',
    category: 'event',
    date: '2025-03-25',
    time: '05:30 PM',
    venue: 'School Auditorium',
    priority: 'medium',
    author: 'Cultural Committee',
    department: 'Cultural'
  },
  {
    id: '6',
    title: 'Science Exhibition',
    description: 'Inter-house science exhibition showcasing student projects.',
    category: 'event',
    date: '2025-04-05',
    time: '10:00 AM',
    venue: 'School Science Block',
    priority: 'medium',
    author: 'Science Department',
    department: 'Science'
  }
]

export const categoryInfo = {
  event: {
    label: 'Events',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'School and extracurricular events'
  },
  examination: {
    label: 'Examinations',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Test and assessment schedules'
  },
  emergency: {
    label: 'Emergency',
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Urgent notices and alerts'
  },
  announcement: {
    label: 'Announcements',
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'General school announcements'
  }
}

export const priorityInfo = {
  low: {
    label: 'Low Priority',
    color: 'bg-gray-100 text-gray-800'
  },
  medium: {
    label: 'Medium Priority',
    color: 'bg-yellow-100 text-yellow-800'
  },
  high: {
    label: 'High Priority',
    color: 'bg-red-100 text-red-800'
  }
}

export const departmentList = [
  'Academics',
  'Administration',
  'Cultural',
  'Library',
  'Science',
  'Sports'
] as const

export const filterNotices = (
  notices: Notice[],
  category: NoticeCategory | 'all',
  searchQuery: string,
  sortBy: 'date' | 'priority'
): Notice[] => {
  let filtered = [...notices]

  // Category filter
  if (category !== 'all') {
    filtered = filtered.filter(notice => notice.category === category)
  }

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(notice =>
      notice.title.toLowerCase().includes(query) ||
      notice.description.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
  })

  return filtered
}