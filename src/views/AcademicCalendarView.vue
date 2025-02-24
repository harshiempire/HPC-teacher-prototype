<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, isToday, addMonths, subMonths, parseISO } from 'date-fns'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  ViewColumnsIcon
} from '@heroicons/vue/24/outline'

interface CalendarEvent {
  id: string
  title: string
  type: 'exam' | 'assignment' | 'holiday' | 'event' | 'ptm'
  date: string
  endDate?: string
  description?: string
  subject?: string
  examType?: 'FA' | 'SA' | 'Finals' | 'SAFAL'
  class?: string
  status?: 'upcoming' | 'completed'
}

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mathematics FA1',
    type: 'exam',
    date: '2025-03-10',
    subject: 'Mathematics',
    examType: 'FA',
    class: 'X-A',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Science Project Submission',
    type: 'assignment',
    date: '2025-03-15',
    subject: 'Science',
    class: 'X-A',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Holi',
    type: 'holiday',
    date: '2025-03-25',
    description: 'National Holiday'
  },
  {
    id: '4',
    title: 'Parent Teacher Meeting',
    type: 'ptm',
    date: '2025-03-20',
    description: 'Term 1 Progress Discussion'
  },
  {
    id: '5',
    title: 'Annual Sports Day',
    type: 'event',
    date: '2025-03-18',
    description: 'School Annual Sports Event'
  }
]

// State
const currentDate = ref(new Date())
const viewMode = ref<'month' | 'week'>('month')
const showFilters = ref(false)
const selectedClass = ref('X-A')
const selectedSubject = ref('')
const selectedEventType = ref('')

// Filter options
const classes = ['X-A', 'X-B', 'X-C']
const subjects = ['Mathematics', 'Science', 'English', 'Social Studies']
const eventTypes = [
  { value: 'exam', label: 'Exams' },
  { value: 'holiday', label: 'Holidays' },
  { value: 'event', label: 'Events' },
  { value: 'ptm', label: 'PTM' }
]

// Calendar navigation
const navigateMonth = (direction: 'prev' | 'next') => {
  currentDate.value = direction === 'next' 
    ? addMonths(currentDate.value, 1)
    : subMonths(currentDate.value, 1)
}

// Calendar data
const calendarDays = computed(() => {
  const start = viewMode.value === 'month'
    ? startOfWeek(startOfMonth(currentDate.value))
    : startOfWeek(currentDate.value)
  
  const end = viewMode.value === 'month'
    ? endOfWeek(endOfMonth(currentDate.value))
    : endOfWeek(currentDate.value)

  return eachDayOfInterval({ start, end })
})

// Filtered events
const filteredEvents = computed(() => {
  return events.filter(event => {
    if (selectedClass.value && event.class && event.class !== selectedClass.value) return false
    if (selectedSubject.value && event.subject && event.subject !== selectedSubject.value) return false
    if (selectedEventType.value && event.type !== selectedEventType.value) return false
    return true
  })
})

// Get events for a specific day
const getEventsForDay = (date: Date) => {
  return filteredEvents.value.filter(event => 
    format(parseISO(event.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  )
}

// Event type styling
const getEventTypeStyle = (type: CalendarEvent['type']) => {
  const styles = {
    exam: 'bg-red-100 text-red-800 border-red-200',
    assignment: 'bg-blue-100 text-blue-800 border-blue-200',
    holiday: 'bg-green-100 text-green-800 border-green-200',
    event: 'bg-purple-100 text-purple-800 border-purple-200',
    ptm: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  return styles[type]
}

const getDayClasses = (day: Date) => {
  return [
    'h-32 p-2 border border-border',
    {
      'bg-gray-50': !isSameMonth(day, currentDate.value),
      'bg-blue-50': isToday(day),
      'rounded-tl-lg': day === calendarDays.value[0],
      'rounded-tr-lg': day === calendarDays.value[6],
      'rounded-bl-lg': day === calendarDays.value[calendarDays.value.length - 7],
      'rounded-br-lg': day === calendarDays.value[calendarDays.value.length - 1]
    }
  ]
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Academic Calendar</h1>
      
      <div class="flex items-center gap-4">
        <!-- View Toggle -->
        <div class="flex items-center gap-2 bg-white rounded-lg border border-border p-1">
          <button 
            @click="viewMode = 'month'"
            :class="[
              'flex items-center gap-1 px-3 py-1.5 rounded',
              viewMode === 'month' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <CalendarDaysIcon class="h-5 w-5" />
            <span>Month</span>
          </button>
          <button 
            @click="viewMode = 'week'"
            :class="[
              'flex items-center gap-1 px-3 py-1.5 rounded',
              viewMode === 'week' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            <ViewColumnsIcon class="h-5 w-5" />
            <span>Week</span>
          </button>
        </div>

        <!-- Filter Button -->
        <button
          @click="showFilters = !showFilters"
          class="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          <AdjustmentsHorizontalIcon class="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>
    </div>

    <!-- Filters Panel -->
    <div v-if="showFilters" class="bg-white rounded-lg border border-border p-4 mb-6">
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Class</label>
          <select 
            v-model="selectedClass"
            class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">All Classes</option>
            <option v-for="cls in classes" :key="cls" :value="cls">{{ cls }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select 
            v-model="selectedSubject"
            class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">All Subjects</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select 
            v-model="selectedEventType"
            class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
          >
            <option value="">All Types</option>
            <option v-for="type in eventTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Calendar Header -->
    <div class="bg-white rounded-t-lg border border-border">
      <div class="flex items-center justify-between p-4">
        <h2 class="text-lg font-medium">
          {{ format(currentDate, 'MMMM yyyy') }}
        </h2>
        <div class="flex items-center gap-2">
          <button
            @click="navigateMonth('prev')"
            class="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeftIcon class="h-5 w-5" />
          </button>
          <button
            @click="navigateMonth('next')"
            class="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRightIcon class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Weekday Headers -->
      <div class="grid grid-cols-7 border-t border-border">
        <div 
          v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
          :key="day"
          class="py-2 text-center text-sm font-medium text-gray-600"
        >
          {{ day }}
        </div>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="bg-white rounded-b-lg border-x border-b border-border">
      <div class="grid grid-cols-7">
        <div 
          v-for="day in calendarDays" 
          :key="format(day, 'yyyy-MM-dd')"
          :class="getDayClasses(day)"
        >
          <div class="flex items-start justify-between">
            <span 
              :class="[
                'inline-flex items-center justify-center w-7 h-7 rounded-full text-sm',
                isToday(day) ? 'bg-primary text-white' : 
                !isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-900'
              ]"
            >
              {{ format(day, 'd') }}
            </span>
          </div>

          <!-- Events for the day -->
          <div class="mt-1 space-y-1">
            <div 
              v-for="event in getEventsForDay(day)"
              :key="event.id"
              :class="[
                'px-2 py-1 text-xs rounded-lg truncate',
                getEventTypeStyle(event.type)
              ]"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>