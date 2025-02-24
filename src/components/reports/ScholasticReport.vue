<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Mock data
const performanceData = {
  labels: ['FA1', 'FA2', 'SA1', 'FA3', 'FA4', 'SA2'],
  datasets: [
    {
      label: 'Mathematics',
      data: [85, 88, 92, 87, 90, 94],
      borderColor: '#2563eb',
      tension: 0.4
    },
    {
      label: 'Science',
      data: [82, 85, 88, 90, 87, 89],
      borderColor: '#16a34a',
      tension: 0.4
    },
    {
      label: 'English',
      data: [88, 85, 90, 92, 89, 91],
      borderColor: '#dc2626',
      tension: 0.4
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  },
  scales: {
    y: {
      min: 0,
      max: 100
    }
  }
}

// Updated activity completion data structure
const activityCompletion = {
  Mathematics: {
    total: 15,
    completed: 12,
    pending: 3
  },
  Science: {
    total: 18,
    completed: 15,
    pending: 3
  },
  English: {
    total: 12,
    completed: 11,
    pending: 1
  }
}

const subjectWiseScores = [
  {
    subject: 'Mathematics',
    scores: [
      { type: 'FA1', score: 85 },
      { type: 'FA2', score: 88 },
      { type: 'SA1', score: 92 },
      { type: 'FA3', score: 87 },
      { type: 'FA4', score: 90 },
      { type: 'SA2', score: 94 },
      { type: 'SAFAL', score: 91 }
    ],
    activities: [
      { name: 'Problem Solving', selfScore: 4, peerScore: 4, teacherScore: 5, level: 'Advanced' },
      { name: 'Project Work', selfScore: 5, peerScore: 4, teacherScore: 5, level: 'Advanced' },
      { name: 'Class Participation', selfScore: 4, peerScore: 3, teacherScore: 4, level: 'Proficient' }
    ]
  },
  {
    subject: 'Science',
    scores: [
      { type: 'FA1', score: 82 },
      { type: 'FA2', score: 85 },
      { type: 'SA1', score: 88 },
      { type: 'FA3', score: 90 },
      { type: 'FA4', score: 87 },
      { type: 'SA2', score: 89 },
      { type: 'SAFAL', score: 86 }
    ],
    activities: [
      { name: 'Lab Work', selfScore: 5, peerScore: 5, teacherScore: 5, level: 'Advanced' },
      { name: 'Research Project', selfScore: 4, peerScore: 4, teacherScore: 4, level: 'Proficient' },
      { name: 'Scientific Model', selfScore: 3, peerScore: 4, teacherScore: 4, level: 'Proficient' }
    ]
  },
  {
    subject: 'English',
    scores: [
      { type: 'FA1', score: 88 },
      { type: 'FA2', score: 85 },
      { type: 'SA1', score: 90 },
      { type: 'FA3', score: 92 },
      { type: 'FA4', score: 89 },
      { type: 'SA2', score: 91 },
      { type: 'SAFAL', score: 89 }
    ],
    activities: [
      { name: 'Creative Writing', selfScore: 5, peerScore: 4, teacherScore: 5, level: 'Advanced' },
      { name: 'Presentation', selfScore: 4, peerScore: 4, teacherScore: 4, level: 'Proficient' },
      { name: 'Reading Analysis', selfScore: 4, peerScore: 3, teacherScore: 4, level: 'Proficient' }
    ]
  }
]

const mcqTests = [
  { name: 'Unit Test 1', score: 18, total: 20, percentage: 90 },
  { name: 'Unit Test 2', score: 17, total: 20, percentage: 85 },
  { name: 'Unit Test 3', score: 19, total: 20, percentage: 95 }
]

// Updated star rating function to only show filled stars
const getStarRating = (score: number) => {
  return '★'.repeat(score)
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Advanced':
      return 'bg-green-100 text-green-800'
    case 'Proficient':
      return 'bg-blue-100 text-blue-800'
    case 'Beginner':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <!-- Subject-wise Scores -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Subject-wise Performance</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">Subject</th>
              <th v-for="type in ['FA1', 'FA2', 'SA1', 'FA3', 'FA4', 'SA2', 'SAFAL']" 
                  :key="type"
                  class="text-center py-3 px-4"
              >
                {{ type }}
              </th>
              <th class="text-center py-3 px-4">Average</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjectWiseScores" 
                :key="subject.subject"
                class="border-b"
            >
              <td class="py-3 px-4 font-medium">{{ subject.subject }}</td>
              <td v-for="score in subject.scores" 
                  :key="score.type"
                  class="text-center py-3 px-4"
              >
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-sm',
                    score.score >= 90 ? 'bg-green-100 text-green-800' :
                    score.score >= 80 ? 'bg-blue-100 text-blue-800' :
                    score.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ score.score }}
                </span>
              </td>
              <td class="text-center py-3 px-4 font-medium">
                {{ Math.round(subject.scores.reduce((acc, curr) => acc + curr.score, 0) / subject.scores.length) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  <div class="space-y-6">
    <!-- Performance Overview -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Performance Growth Trend</h2>
      <div class="h-80">
        <Line :data="performanceData" :options="chartOptions" />
      </div>
    </div>

    <!-- Activity Completion -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Activity Completion Rate</h2>
      <div class="space-y-4">
        <div v-for="(data, subject) in activityCompletion" 
             :key="subject"
             class="border rounded-lg p-4"
        >
          <h3 class="font-medium mb-3">{{ subject }}</h3>
          <div class="flex items-center gap-8">
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary"
                  :style="`width: ${(data.completed / data.total) * 100}%`"
                ></div>
              </div>
            </div>
            <div class="flex gap-6 text-sm">
              <div>
                <span class="font-medium">{{ data.completed }}</span> Completed
              </div>
              <div>
                <span class="font-medium">{{ data.pending }}</span> Pending
              </div>
              <div>
                <span class="font-medium">{{ data.total }}</span> Total
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Assessment -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Activity Assessment</h2>
      <div class="space-y-6">
        <div v-for="subject in subjectWiseScores" :key="subject.subject">
          <h3 class="font-medium mb-3">{{ subject.subject }}</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 px-4">Activity</th>
                  <th class="text-center py-3 px-4">Self Assessment</th>
                  <th class="text-center py-3 px-4">Peer Assessment</th>
                  <th class="text-center py-3 px-4">Teacher Assessment</th>
                  <th class="text-center py-3 px-4">Level</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="activity in subject.activities" 
                    :key="activity.name"
                    class="border-b"
                >
                  <td class="py-3 px-4">{{ activity.name }}</td>
                  <td class="text-center py-3 px-4">
                    <div class="flex items-center justify-center gap-4">
                      <span class="text-yellow-500">{{ getStarRating(activity.selfScore) }}</span>
                      <span class="font-medium">{{ activity.selfScore }}/5</span>
                    </div>
                  </td>
                  <td class="text-center py-3 px-4">
                    <div class="flex items-center justify-center gap-4">
                      <span class="text-yellow-500">{{ getStarRating(activity.peerScore) }}</span>
                      <span class="font-medium">{{ activity.peerScore }}/5</span>
                    </div>
                  </td>
                  <td class="text-center py-3 px-4">
                    <div class="flex items-center justify-center gap-4">
                      <span class="text-yellow-500">{{ getStarRating(activity.teacherScore) }}</span>
                      <span class="font-medium">{{ activity.teacherScore }}/5</span>
                    </div>
                  </td>
                  <td class="text-center py-3 px-4">
                    <span :class="['px-2 py-1 rounded-full text-xs font-medium', getLevelColor(activity.level)]">
                      {{ activity.level }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    

    <!-- MCQ Test Scores -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">MCQ Test Scores</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">Test Name</th>
              <th class="text-center py-3 px-4">Score</th>
              <th class="text-center py-3 px-4">Total</th>
              <th class="text-center py-3 px-4">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="test in mcqTests" 
                :key="test.name"
                class="border-b"
            >
              <td class="py-3 px-4">{{ test.name }}</td>
              <td class="text-center py-3 px-4">{{ test.score }}</td>
              <td class="text-center py-3 px-4">{{ test.total }}</td>
              <td class="text-center py-3 px-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-sm',
                    test.percentage >= 90 ? 'bg-green-100 text-green-800' :
                    test.percentage >= 80 ? 'bg-blue-100 text-blue-800' :
                    test.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  ]"
                >
                  {{ test.percentage }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>