import type { Task, CoScholasticTask, CoScholasticCategory, DomainType } from '../types/tasks'

export const scholasticTasks: Task[] = [
  {
    id: '1',
    title: 'Chapter 1 Peer Assessment',
    subject: 'Mathematics',
    type: 'abl',
    startDate: '2025-03-01',
    endDate: '2025-03-10',
    status: 'assigned',
    description: 'Complete peer assessment for Chapter 1 concepts',
    userId: 'user1'
  },
  {
    id: '2',
    title: 'Science Project',
    subject: 'Science',
    type: 'pbl',
    startDate: '2025-03-05',
    endDate: '2025-03-15',
    status: 'in_progress',
    description: 'Group project on renewable energy sources',
    userId: 'user1'
  },
  {
    id: '3',
    title: 'SAFAL Test 1',
    subject: 'English',
    type: 'safal',
    startDate: '2025-03-08',
    endDate: '2025-03-08',
    status: 'completed',
    description: 'First SAFAL assessment for English comprehension',
    userId: 'user1'
  }
]

export const coScholasticTasks: CoScholasticTask[] = [
  {
    id: '1',
    activity: 'Classical Dance Performance',
    category: 'fine_arts',
    proficiencyLevel: 'Proficient',
    status: 'completed',
    description: 'Annual day dance performance'
  },
  {
    id: '2',
    activity: 'Painting Exhibition',
    category: 'fine_arts',
    proficiencyLevel: 'Competition',
    evidence: ['competition_certificate.pdf'],
    status: 'completed',
    description: 'School art exhibition'
  },
  {
    id: '3',
    activity: 'Basketball Tournament',
    category: 'domains',
    domainType: 'sports_games',
    proficiencyLevel: 'Competition',
    status: 'not_completed',
    description: 'Inter-school basketball championship'
  },
  {
    id: '4',
    activity: 'Community Service Project',
    category: 'domains',
    domainType: 'ethical_empathy',
    proficiencyLevel: 'Proficient',
    status: 'completed',
    description: 'Local community cleanup initiative'
  },
  {
    id: '5',
    activity: 'Cultural Festival',
    category: 'domains',
    domainType: 'aesthetic_cultural',
    proficiencyLevel: 'Hobby',
    status: 'not_completed',
    description: 'Traditional art and culture showcase'
  },
  {
    id: '6',
    activity: 'Study Habits Workshop',
    category: 'domains',
    domainType: 'positive_habits',
    proficiencyLevel: 'Proficient',
    status: 'completed',
    description: 'Effective study techniques workshop'
  },
  {
    id: '7',
    activity: 'Leadership Program',
    category: 'domains',
    domainType: 'character_development',
    proficiencyLevel: 'Competition',
    status: 'not_completed',
    description: 'Student council leadership training'
  },
  {
    id: '8',
    activity: 'Mindfulness Sessions',
    category: 'domains',
    domainType: 'stress_anxiety',
    proficiencyLevel: 'Hobby',
    status: 'completed',
    description: 'Weekly meditation and stress management'
  }
]

export const taskStatusMap = {
  assigned: { label: 'Assigned', color: 'blue' },
  in_progress: { label: 'In Progress', color: 'yellow' },
  upcoming: { label: 'Upcoming', color: 'purple' },
  completed: { label: 'Completed', color: 'green' },
  for_review: { label: 'For Review', color: 'orange' }
} as const

export const coScholasticStatusMap = {
  completed: { label: 'Completed', color: 'green' },
  not_completed: { label: 'Not Completed', color: 'red' }
} as const

export const taskTypeMap = {
  all: { label: 'All Tasks', icon: 'DocumentTextIcon' },
  abl: { label: 'Activity Based Learning', icon: 'BeakerIcon' },
  pbl: { label: 'Project Based Learning', icon: 'RocketLaunchIcon' },
  safal: { label: 'SAFAL', icon: 'AcademicCapIcon' }
} as const

export const coScholasticCategoryMap: Record<CoScholasticCategory, { label: string, icon: string }> = {
  fine_arts: { label: 'Fine Arts', icon: 'PaintBrushIcon' },
  domains: { label: 'Domains', icon: 'FolderIcon' }
} as const

export const domainTypeMap: Record<DomainType, { label: string, icon: string }> = {
  sports_games: { label: 'Sports & Games', icon: 'TrophyIcon' },
  ethical_empathy: { label: 'Ethical and Empathy Development', icon: 'HeartIcon' },
  aesthetic_cultural: { label: 'Aesthetic and Cultural Development', icon: 'SparklesIcon' },
  positive_habits: { label: 'Positive Living Learning and Working Habits', icon: 'StarIcon' },
  character_development: { label: 'Character Development Index', icon: 'UserGroupIcon' },
  stress_anxiety: { label: 'Stress and Anxiety', icon: 'HandRaisedIcon' }
} as const