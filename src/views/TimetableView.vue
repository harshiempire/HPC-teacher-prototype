<script setup lang="ts">
import { studentSchedules } from '@/stores/timetable'
import type { TeacherTimeSlot } from '@/types/timetable'

const currentStudent = studentSchedules[0]
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const timeSlots = [
  '8:00 - 8:45',
  '8:45 - 9:30',
  '9:45 - 10:30',
  '10:30 - 11:15',
  '11:30 - 12:15',
  '12:15 - 1:00'
]

const getSubjectColor = (subject: string) => {
  const colors = {
    'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
    'Science': 'bg-green-100 text-green-800 border-green-200',
    'English': 'bg-purple-100 text-purple-800 border-purple-200',
    'Social Studies': 'bg-orange-100 text-orange-800 border-orange-200',
    'Hindi': 'bg-pink-100 text-pink-800 border-pink-200',
    'Computer': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Physical Education': 'bg-red-100 text-red-800 border-red-200',
    'Art': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Music': 'bg-teal-100 text-teal-800 border-teal-200',
    'Library': 'bg-gray-100 text-gray-800 border-gray-200',
    'Club Activities': 'bg-violet-100 text-violet-800 border-violet-200',
    'Sports': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Break': 'bg-gray-100 text-gray-600 border-gray-200'
  }
  return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
}

const getSlotForDayAndTime = (day: string, timeIndex: number): TeacherTimeSlot | undefined => {
  return currentStudent.timetable.schedule[day]?.[timeIndex]
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">My Timetable</h1>
      <p class="text-gray-600">{{ currentStudent.name }}</p>
    </div>

    <!-- Timetable Grid -->
    <div class="bg-white rounded-card border border-border overflow-hidden">
      <div class="grid" style="grid-template-columns: 100px repeat(6, 1fr);">
        <!-- Time Header -->
        <div class="bg-gray-50 border-b border-r border-border p-4">
          <span class="font-medium text-gray-600">Time</span>
        </div>
        
        <!-- Days Header -->
        <div 
          v-for="day in days" 
          :key="day"
          class="bg-gray-50 border-b border-r last:border-r-0 border-border p-4"
        >
          <span class="font-medium text-gray-600">{{ day }}</span>
        </div>

        <!-- Time Slots and Classes -->
        <template v-for="(time, timeIndex) in timeSlots" :key="time">
          <!-- Time Column -->
          <div class="border-b border-r border-border p-2 flex items-center justify-center">
            <span class="text-sm text-gray-600">{{ time }}</span>
          </div>

          <!-- Class Slots -->
          <div 
            v-for="day in days" 
            :key="`${day}-${time}`"
            class="border-b border-r last:border-r-0 border-border p-2"
          >
            <div v-if="getSlotForDayAndTime(day, timeIndex)" class="space-y-1">
              <div :class="[
                'px-2 py-1 rounded-lg text-sm font-medium border',
                getSubjectColor(getSlotForDayAndTime(day, timeIndex)!.subject)
              ]">
                {{ getSlotForDayAndTime(day, timeIndex)!.subject }}
              </div>
              <div class="text-xs text-gray-600 px-2">
                {{ getSlotForDayAndTime(day, timeIndex)!.teacherName }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>