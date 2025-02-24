import type { ClassDetails, Activity, Announcement, Teacher, TimeTable, Subject, SurveyQuestion } from '@/types/classInfo'

export const classDetails: ClassDetails = {
  name: 'X-A',
  section: 'A',
  academicYear: '2024-25',
  classTeacher: 'Mrs. Sarah Johnson'
}

export const upcomingActivities: Activity[] = [
  {
    id: '1',
    title: 'Mathematics Assignment',
    type: 'assignment',
    subject: 'Mathematics',
    dueDate: '2025-03-15',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Science Project Presentation',
    type: 'project',
    subject: 'Science',
    dueDate: '2025-03-20',
    status: 'pending'
  },
  {
    id: '3',
    title: 'English Test',
    type: 'test',
    subject: 'English',
    dueDate: '2025-03-18',
    status: 'pending'
  }
]

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Parent Teacher Meeting',
    message: 'PTM scheduled for next Friday. All parents are requested to attend.',
    teacher: 'Mrs. Sarah Johnson',
    date: '2025-03-10'
  },
  {
    id: '2',
    title: 'Science Exhibition',
    message: 'Prepare your projects for the upcoming science exhibition.',
    teacher: 'Mr. Robert Smith',
    date: '2025-03-08'
  }
]

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Mrs. Sarah Johnson',
    subject: 'Mathematics',
    designation: 'Class Teacher',
    email: 'sarah.j@school.com'
  },
  {
    id: '2',
    name: 'Mr. Robert Smith',
    subject: 'Science',
    email: 'robert.s@school.com'
  },
  {
    id: '3',
    name: 'Ms. Emily Brown',
    subject: 'English',
    email: 'emily.b@school.com'
  }
]

export const timetable: TimeTable = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  periods: ['8:00 - 8:45', '8:45 - 9:30', '9:45 - 10:30', '10:30 - 11:15', '11:30 - 12:15', '12:15 - 1:00'],
  schedule: {
    'Monday': ['Mathematics', 'Science', 'Break', 'English', 'Social Studies', 'Physical Education'],
    'Tuesday': ['Science', 'Mathematics', 'Break', 'Hindi', 'Computer', 'Library'],
    'Wednesday': ['English', 'Science', 'Break', 'Mathematics', 'Art', 'Social Studies'],
    'Thursday': ['Mathematics', 'English', 'Break', 'Science', 'Music', 'Physical Education'],
    'Friday': ['Science', 'Mathematics', 'Break', 'English', 'Social Studies', 'Computer'],
    'Saturday': ['Mathematics', 'Science', 'Break', 'English', 'Club Activities', 'Sports']
  }
}

export const syllabus: Subject[] = [
  {
    subject: 'Mathematics',
    progress: 65,
    chapters: [
      { name: 'Real Numbers', status: 'completed' },
      { name: 'Polynomials', status: 'in_progress' },
      { name: 'Coordinate Geometry', status: 'not_started' },
      { name: 'Linear Equations', status: 'not_started' }
    ]
  },
  {
    subject: 'Science',
    progress: 70,
    chapters: [
      { name: 'Chemical Reactions', status: 'completed' },
      { name: 'Electricity', status: 'completed' },
      { name: 'Life Processes', status: 'in_progress' },
      { name: 'Environment', status: 'not_started' }
    ]
  },
  {
    subject: 'English',
    progress: 75,
    chapters: [
      { name: 'Prose', status: 'completed' },
      { name: 'Poetry', status: 'completed' },
      { name: 'Grammar', status: 'in_progress' },
      { name: 'Writing', status: 'in_progress' }
    ]
  }
]

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: '1',
    question: 'How well does the teacher explain concepts?',
    options: [
      'Very clearly and effectively',
      'Mostly clear with some gaps',
      'Sometimes unclear',
      'Often difficult to understand'
    ]
  },
  {
    id: '2',
    question: 'How interactive are the classes?',
    options: [
      'Highly interactive with regular student participation',
      'Moderately interactive',
      'Limited interaction',
      'Minimal student participation'
    ]
  },
  {
    id: '3',
    question: 'How well does the teacher handle student doubts?',
    options: [
      'Addresses all doubts thoroughly',
      'Addresses most doubts adequately',
      'Sometimes rushes through explanations',
      'Rarely addresses student doubts'
    ]
  },
  {
    id: '4',
    question: 'How would you rate the teaching methods used?',
    options: [
      'Very effective and engaging',
      'Generally effective',
      'Could be more engaging',
      'Need significant improvement'
    ]
  },
  {
    id: '5',
    question: 'How well is the course content covered?',
    options: [
      'Comprehensive coverage with examples',
      'Good coverage of main topics',
      'Basic coverage with some gaps',
      'Incomplete or rushed coverage'
    ]
  }
]

export const getStatusColor = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    not_started: 'bg-gray-100 text-gray-800',
    pending: 'bg-blue-100 text-blue-800'
  }
  return colors[status as keyof typeof colors]
}

export const getSubjectColor = (subject: string) => {
  const colors = {
    Mathematics: 'bg-blue-100 text-blue-800',
    Science: 'bg-green-100 text-green-800',
    English: 'bg-purple-100 text-purple-800',
    'Social Studies': 'bg-orange-100 text-orange-800',
    Hindi: 'bg-pink-100 text-pink-800',
    Computer: 'bg-indigo-100 text-indigo-800',
    'Physical Education': 'bg-red-100 text-red-800',
    Art: 'bg-yellow-100 text-yellow-800',
    Music: 'bg-teal-100 text-teal-800',
    Library: 'bg-gray-100 text-gray-800',
    'Club Activities': 'bg-violet-100 text-violet-800',
    Sports: 'bg-emerald-100 text-emerald-800',
    Break: 'bg-gray-100 text-gray-600'
  }
  return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}