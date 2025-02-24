import type { DashboardData } from '@/types/dashboard'

export const dashboardData: DashboardData = {
  academicPerformance: {
    overall: 87.5,
    subjects: [
      {
        subject: 'Mathematics',
        score: 92,
        classAverage: 85,
        improvement: 'excellent'
      },
      {
        subject: 'Science',
        score: 88,
        classAverage: 82,
        improvement: 'excellent'
      },
      {
        subject: 'English',
        score: 85,
        classAverage: 80,
        improvement: 'average'
      },
      {
        subject: 'Social Studies',
        score: 78,
        classAverage: 81,
        improvement: 'needs_improvement'
      }
    ]
  },
  extracurricular: [
    {
      category: 'Sports',
      count: 3,
      details: [
        {
          name: 'Inter-school Basketball Tournament',
          date: '2025-02-15',
          achievement: 'Runner-up'
        },
        {
          name: 'Annual Sports Day',
          date: '2025-01-20',
          achievement: 'First Place in 100m Sprint'
        },
        {
          name: 'Chess Competition',
          date: '2024-12-10'
        }
      ]
    },
    {
      category: 'Arts',
      count: 2,
      details: [
        {
          name: 'Annual Art Exhibition',
          date: '2025-02-01',
          achievement: 'Best Creative Work'
        },
        {
          name: 'School Cultural Fest',
          date: '2024-12-15'
        }
      ]
    }
  ],
  skillDevelopment: [
    {
      name: 'Coding',
      completionRate: 75,
      totalActivities: 20,
      completedActivities: 15
    },
    {
      name: 'Public Speaking',
      completionRate: 60,
      totalActivities: 10,
      completedActivities: 6
    },
    {
      name: 'Language Learning',
      completionRate: 85,
      totalActivities: 30,
      completedActivities: 25
    }
  ],
  discipline: {
    rating: 'excellent',
    teacherFeedback: [
      'Shows great leadership qualities',
      'Always punctual and well-behaved',
      'Helps fellow students'
    ],
    lastUpdated: '2025-03-01'
  },
  health: {
    activities: [
      {
        type: 'Physical Education',
        participationRate: 90,
        performance: 85,
        lastActivity: '2025-03-05'
      },
      {
        type: 'Yoga Sessions',
        participationRate: 75,
        performance: 80,
        lastActivity: '2025-03-04'
      },
      {
        type: 'Sports Activities',
        participationRate: 85,
        performance: 90,
        lastActivity: '2025-03-03'
      }
    ],
    overallScore: 85
  },
  tasks: {
    total: 25,
    completed: 18,
    pending: 7,
    upcoming: [
      {
        id: 'task1',
        title: 'Mathematics Assignment',
        subject: 'Mathematics',
        type: 'abl',
        startDate: '2025-03-10',
        endDate: '2025-03-15',
        status: 'assigned',
        priority: 'high'
      },
      {
        id: 'task2',
        title: 'Science Project',
        subject: 'Science',
        type: 'pbl',
        startDate: '2025-03-12',
        endDate: '2025-03-20',
        status: 'in_progress',
        priority: 'medium'
      }
    ]
  },
  attendance: {
    monthly: {
      present: 22,
      absent: 2,
      late: 1,
      total: 25
    },
    classAverage: 92
  }
}

export const getImprovementColor = (improvement: string) => {
  const colors = {
    excellent: 'bg-green-100 text-green-800',
    average: 'bg-yellow-100 text-yellow-800',
    needs_improvement: 'bg-red-100 text-red-800'
  }
  return colors[improvement as keyof typeof colors]
}

export const getDisciplineColor = (rating: string) => {
  const colors = {
    excellent: 'text-green-600',
    good: 'text-yellow-600',
    needs_improvement: 'text-red-600'
  }
  return colors[rating as keyof typeof colors]
}