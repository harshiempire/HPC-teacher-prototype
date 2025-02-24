<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('scholastic')

interface Task {
  id: string
  title: string
  subject?: string
  type: string
  startDate: string
  endDate: string
  status: 'pending' | 'completed'
}

interface CoScholasticTask {
  id: string
  activity: string
  domain: string
  proficiencyLevel: 'Hobby' | 'Proficient' | 'Competition'
  evidence?: string
  status: 'pending' | 'completed'
}

const scholasticTasks: Task[] = [
  {
    id: '1',
    title: 'Chapter 1 Peer Assessment',
    subject: 'Mathematics',
    type: 'Peer Assessment',
    startDate: '2025-03-01',
    endDate: '2025-03-10',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Science Project',
    subject: 'Science',
    type: 'Activity-Based Learning',
    startDate: '2025-03-05',
    endDate: '2025-03-15',
    status: 'pending'
  },
  {
    id: '3',
    title: 'SAFAL Test 1',
    subject: 'English',
    type: 'SAFAL MCQ',
    startDate: '2025-03-08',
    endDate: '2025-03-08',
    status: 'completed'
  }
]

const coScholasticTasks: CoScholasticTask[] = [
  {
    id: '1',
    activity: 'Classical Dance',
    domain: 'Fine Arts',
    proficiencyLevel: 'Proficient',
    status: 'pending'
  },
  {
    id: '2',
    activity: 'Painting',
    domain: 'Fine Arts',
    proficiencyLevel: 'Competition',
    evidence: 'competition_certificate.pdf',
    status: 'completed'
  }
]
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">My Tasks</h1>
    
    <!-- Tabs -->
    <div class="flex gap-4 mb-6">
      <button 
        @click="activeTab = 'scholastic'"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === 'scholastic' 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        Scholastic
      </button>
      <button 
        @click="activeTab = 'co-scholastic'"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === 'co-scholastic' 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        Co-Scholastic
      </button>
    </div>
    
    <!-- Scholastic Tasks -->
    <div v-if="activeTab === 'scholastic'" class="space-y-4">
      <div v-for="task in scholasticTasks" :key="task.id" 
           class="bg-white rounded-card border border-border p-6">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-medium">{{ task.title }}</h3>
            <p class="text-gray-600">{{ task.subject }} - {{ task.type }}</p>
            <div class="mt-2 text-sm text-gray-500">
              Due: {{ new Date(task.endDate).toLocaleDateString() }}
            </div>
          </div>
          <span 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ task.status.charAt(0).toUpperCase() + task.status.slice(1) }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Co-Scholastic Tasks -->
    <div v-if="activeTab === 'co-scholastic'" class="space-y-4">
      <div v-for="task in coScholasticTasks" :key="task.id" 
           class="bg-white rounded-card border border-border p-6">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-lg font-medium">{{ task.activity }}</h3>
            <p class="text-gray-600">{{ task.domain }}</p>
            <div class="mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ task.proficiencyLevel }}
              </span>
            </div>
            <div v-if="task.evidence" class="mt-2 text-sm text-primary">
              Evidence uploaded
            </div>
          </div>
          <span 
            :class="[
              'px-3 py-1 rounded-full text-sm font-medium',
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ task.status.charAt(0).toUpperCase() + task.status.slice(1) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>