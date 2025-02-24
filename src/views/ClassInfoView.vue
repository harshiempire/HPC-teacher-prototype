<script setup lang="ts">
import { ref } from 'vue'
import {
  AcademicCapIcon,
  ClockIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  MegaphoneIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import {
  classDetails,
  upcomingActivities,
  announcements,
  teachers,
  timetable,
  syllabus,
  surveyQuestions,
  getStatusColor,
  getSubjectColor
} from '@/stores/classInfo'

// Active tab state
const activeTab = ref('overview')

// Survey state
const selectedTeacher = ref('')
const surveyResponses = ref<Record<string, string>>({})

const submitSurvey = () => {
  // Here you would typically submit the survey responses to your backend
  console.log('Survey submitted:', surveyResponses.value)
  // Reset form
  surveyResponses.value = {}
  selectedTeacher.value = ''
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-semibold">Class Information</h1>
        <p class="text-gray-600">{{ classDetails.name }} | Academic Year {{ classDetails.academicYear }}</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex gap-4 mb-6">
      <button 
        v-for="tab in ['overview', 'timetable', 'syllabus', 'survey']"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'flex items-center gap-2 px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === tab 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        <component :is="{
          overview: AcademicCapIcon,
          timetable: ClockIcon,
          syllabus: BookOpenIcon,
          survey: ClipboardDocumentCheckIcon
        }[tab]" class="h-5 w-5" />
        <span>{{ tab.charAt(0).toUpperCase() + tab.slice(1) }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- Class Overview -->
      <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Upcoming Activities -->
        <div class="bg-white rounded-card border border-border p-6">
          <h2 class="text-lg font-medium mb-4">Upcoming Activities</h2>
          <div class="space-y-4">
            <div v-for="activity in upcomingActivities" 
                 :key="activity.id"
                 class="flex items-start justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 class="font-medium">{{ activity.title }}</h3>
                <p class="text-sm text-gray-600">{{ activity.subject }}</p>
                <p class="text-sm text-gray-500 mt-1">
                  Due: {{ new Date(activity.dueDate).toLocaleDateString() }}
                </p>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusColor(activity.status)
              ]">
                {{ activity.status.charAt(0).toUpperCase() + activity.status.slice(1) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Announcements -->
        <div class="bg-white rounded-card border border-border p-6">
          <h2 class="text-lg font-medium mb-4">Announcements</h2>
          <div class="space-y-4">
            <div v-for="announcement in announcements" 
                 :key="announcement.id"
                 class="p-4 border rounded-lg"
            >
              <div class="flex items-start gap-3">
                <MegaphoneIcon class="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-medium">{{ announcement.title }}</h3>
                  <p class="text-gray-600 mt-1">{{ announcement.message }}</p>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>By: {{ announcement.teacher }}</span>
                    <span>{{ new Date(announcement.date).toLocaleDateString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Teachers -->
        <div class="bg-white rounded-card border border-border p-6">
          <h2 class="text-lg font-medium mb-4">Teachers</h2>
          <div class="space-y-4">
            <div v-for="teacher in teachers" 
                 :key="teacher.id"
                 class="flex items-center justify-between p-3 border rounded-lg"
            >
              <div class="flex items-center gap-3">
                <UserIcon class="h-5 w-5 text-gray-400" />
                <div>
                  <div class="font-medium">{{ teacher.name }}</div>
                  <div class="text-sm text-gray-600">{{ teacher.subject }}</div>
                  <div class="text-sm text-gray-500">{{ teacher.email }}</div>
                </div>
              </div>
              <span v-if="teacher.designation" 
                    class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
              >
                {{ teacher.designation }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Timetable -->
      <div v-if="activeTab === 'timetable'" class="bg-white rounded-card border border-border p-6">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th class="py-3 px-4 text-left font-medium text-gray-600">Time</th>
                <th v-for="day in timetable.days" 
                    :key="day"
                    class="py-3 px-4 text-left font-medium text-gray-600"
                >
                  {{ day }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(time, index) in timetable.periods" 
                  :key="time"
                  class="border-t"
              >
                <td class="py-3 px-4 text-sm text-gray-600">{{ time }}</td>
                <td v-for="day in timetable.days" 
                    :key="day"
                    class="py-2 px-4"
                >
                  <span 
                    :class="[
                      'inline-block px-3 py-1 rounded-full text-sm',
                      getSubjectColor(timetable.schedule[day][index])
                    ]"
                  >
                    {{ timetable.schedule[day][index] }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Syllabus -->
      <div v-if="activeTab === 'syllabus'" class="space-y-6">
        <div v-for="subject in syllabus" 
             :key="subject.subject"
             class="bg-white rounded-card border border-border p-6"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-medium">{{ subject.subject }}</h2>
              <p class="text-gray-600">{{ subject.progress }}% Completed</p>
            </div>
            <div class="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary"
                :style="`width: ${subject.progress}%`"
              ></div>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="chapter in subject.chapters" 
                 :key="chapter.name"
                 class="flex items-center justify-between p-4 border rounded-lg"
            >
              <div class="flex items-center gap-3">
                <BookOpenIcon class="h-5 w-5 text-gray-400" />
                <span>{{ chapter.name }}</span>
              </div>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                getStatusColor(chapter.status)
              ]">
                {{ chapter.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Teacher Survey -->
      <div v-if="activeTab === 'survey'" class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-6">Teacher Feedback Survey</h2>
        
        <form @submit.prevent="submitSurvey" class="space-y-6">
          <!-- Teacher Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Select Teacher
            </label>
            <select 
              v-model="selectedTeacher"
              required
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="">Choose a teacher</option>
              <option v-for="teacher in teachers" 
                      :key="teacher.id"
                      :value="teacher.id"
              >
                {{ teacher.name }} - {{ teacher.subject }}
              </option>
            </select>
          </div>

          <!-- Survey Questions -->
          <div v-if="selectedTeacher" class="space-y-6">
            <div v-for="question in surveyQuestions" 
                 :key="question.id"
                 class="border rounded-lg p-4"
            >
              <label class="block font-medium mb-3">{{ question.question }}</label>
              
              <div class="space-y-2">
                <label 
                  v-for="(option, index) in question.options"
                  :key="index"
                  class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  :class="{ 'border-primary bg-primary/5': surveyResponses[question.id] === option }"
                >
                  <input
                    type="radio"
                    :name="question.id"
                    :value="option"
                    v-model="surveyResponses[question.id]"
                    class="text-primary focus:ring-primary"
                  >
                  <span>{{ option }}</span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              class="px-6 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>