<script setup lang="ts">
import {
  FlagIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  PaintBrushIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'

interface JourneyEvent {
  id: string
  type: 'goal' | 'self_test' | 'abl' | 'fa' | 'sa' | 'co_scholastic' | 'event' | 'achievement'
  title: string
  date: string
  description: string
  status: 'completed' | 'in_progress' | 'upcoming'
  score?: number
  badge?: string
}

const journeyEvents: JourneyEvent[] = [
  {
    id: '1',
    type: 'goal',
    title: 'Academic Goals Set',
    date: '2024-06-15',
    description: 'Set personal academic goals for the year',
    status: 'completed'
  },
  {
    id: '2',
    type: 'self_test',
    title: 'Mathematics Diagnostic Test',
    date: '2024-07-01',
    description: 'Initial assessment of mathematical concepts',
    status: 'completed',
    score: 85
  },
  {
    id: '3',
    type: 'abl',
    title: 'Science Project: Renewable Energy',
    date: '2024-07-15',
    description: 'Group project on solar and wind energy',
    status: 'completed',
    score: 92
  },
  {
    id: '4',
    type: 'fa',
    title: 'FA1 - English',
    date: '2024-08-01',
    description: 'First formative assessment in English',
    status: 'completed',
    score: 88
  },
  {
    id: '5',
    type: 'co_scholastic',
    title: 'Classical Dance Performance',
    date: '2024-08-15',
    description: 'Annual day cultural program',
    status: 'completed',
    badge: 'Gold'
  },
  {
    id: '6',
    type: 'event',
    title: 'Science Exhibition',
    date: '2024-09-01',
    description: 'School-level science project exhibition',
    status: 'completed'
  },
  {
    id: '7',
    type: 'sa',
    title: 'SA1 - All Subjects',
    date: '2024-09-15',
    description: 'First term summative assessment',
    status: 'completed',
    score: 90
  },
  {
    id: '8',
    type: 'achievement',
    title: 'Mathematics Olympiad',
    date: '2024-10-01',
    description: 'District level mathematics competition',
    status: 'completed',
    badge: 'First Place'
  },
  {
    id: '9',
    type: 'fa',
    title: 'FA3 - Science',
    date: '2024-10-15',
    description: 'Third formative assessment in Science',
    status: 'in_progress'
  },
  {
    id: '10',
    type: 'abl',
    title: 'Literature Analysis Project',
    date: '2024-11-01',
    description: 'Analysis of Shakespeare\'s works',
    status: 'upcoming'
  }
]

const getEventIcon = (type: JourneyEvent['type']) => {
  const icons = {
    goal: FlagIcon,
    self_test: DocumentTextIcon,
    abl: ClipboardDocumentListIcon,
    fa: DocumentTextIcon,
    sa: DocumentCheckIcon,
    co_scholastic: PaintBrushIcon,
    event: SparklesIcon,
    achievement: TrophyIcon
  }
  return icons[type]
}

const getEventColor = (type: JourneyEvent['type']) => {
  const colors = {
    goal: 'bg-purple-100 text-purple-800 border-purple-200',
    self_test: 'bg-blue-100 text-blue-800 border-blue-200',
    abl: 'bg-green-100 text-green-800 border-green-200',
    fa: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    sa: 'bg-orange-100 text-orange-800 border-orange-200',
    co_scholastic: 'bg-pink-100 text-pink-800 border-pink-200',
    event: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    achievement: 'bg-red-100 text-red-800 border-red-200'
  }
  return colors[type]
}

const getEventLabel = (type: JourneyEvent['type']) => {
  const labels = {
    goal: 'Goal Setting',
    self_test: 'Self Test',
    abl: 'Activity Based Learning',
    fa: 'Formative Assessment',
    sa: 'Summative Assessment',
    co_scholastic: 'Co-Scholastic',
    event: 'Event',
    achievement: 'Achievement'
  }
  return labels[type]
}

const getStatusColor = (status: JourneyEvent['status']) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    upcoming: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Academic Journey</h1>

    <!-- Journey Legend -->
    <div class="bg-white rounded-card border border-border p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">Journey Types</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="type in ['goal', 'self_test', 'abl', 'fa', 'sa', 'co_scholastic', 'event', 'achievement']" 
             :key="type"
             class="flex items-center gap-2"
        >
          <div :class="['w-3 h-3 rounded-full', getEventColor(type as JourneyEvent['type']).split(' ')[0]]"></div>
          <span class="text-sm">{{ getEventLabel(type as JourneyEvent['type']) }}</span>
        </div>
      </div>
    </div>

    <!-- Journey Timeline -->
    <div class="bg-white rounded-card border border-border p-6">
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <!-- Timeline Events -->
        <div class="space-y-8">
          <div v-for="event in journeyEvents" 
               :key="event.id"
               class="relative flex gap-8 items-start"
          >
            <!-- Event Icon -->
            <div 
              :class="[
                'relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2',
                getEventColor(event.type)
              ]"
            >
              <component :is="getEventIcon(event.type)" class="h-8 w-8" />
            </div>

            <!-- Event Content -->
            <div class="flex-1 bg-gray-50 rounded-lg p-4">
              <div class="flex items-start justify-between mb-2">
                <div>
                  <h3 class="font-medium">{{ event.title }}</h3>
                  <p class="text-sm text-gray-600">{{ event.description }}</p>
                </div>
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(event.status)
                  ]"
                >
                  {{ event.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
                </span>
              </div>

              <div class="flex items-center gap-4 text-sm">
                <div class="text-gray-600">
                  {{ new Date(event.date).toLocaleDateString() }}
                </div>
                <div v-if="event.score !== undefined" class="font-medium">
                  Score: {{ event.score }}%
                </div>
                <div v-if="event.badge" 
                     class="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
                >
                  {{ event.badge }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>