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
import { dashboardData, getImprovementColor, getDisciplineColor } from '@/stores/dashboard'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const performanceData = {
  labels: dashboardData.academicPerformance.subjects.map(s => s.subject),
  datasets: [
    {
      label: 'Your Score',
      data: dashboardData.academicPerformance.subjects.map(s => s.score),
      borderColor: '#0447A8',
      tension: 0.4
    },
    {
      label: 'Class Average',
      data: dashboardData.academicPerformance.subjects.map(s => s.classAverage),
      borderColor: '#9CA3AF',
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

const getAttendancePercentage = () => {
  const { present, total } = dashboardData.attendance.monthly
  return Math.round((present / total) * 100)
}

const getTaskCompletionRate = () => {
  const { completed, total } = dashboardData.tasks
  return Math.round((completed / total) * 100)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Student Dashboard</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Academic Performance -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Academic Performance</h2>
        <div class="text-3xl font-semibold text-primary mb-6">
          {{ dashboardData.academicPerformance.overall }}%
        </div>
        <div class="h-64 mb-6">
          <Line :data="performanceData" :options="chartOptions" />
        </div>
        <div class="space-y-4">
          <div v-for="subject in dashboardData.academicPerformance.subjects" 
               :key="subject.subject"
               class="flex items-center justify-between"
          >
            <span>{{ subject.subject }}</span>
            <span :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              getImprovementColor(subject.improvement)
            ]">
              {{ subject.improvement.replace('_', ' ').charAt(0).toUpperCase() + 
                 subject.improvement.slice(1).replace('_', ' ') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tasks Overview -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Tasks Overview</h2>
        <div class="text-3xl font-semibold text-primary mb-6">
          {{ getTaskCompletionRate() }}% Complete
        </div>
        <div class="space-y-6">
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-2xl font-semibold">{{ dashboardData.tasks.total }}</div>
              <div class="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold text-green-600">
                {{ dashboardData.tasks.completed }}
              </div>
              <div class="text-sm text-gray-600">Completed</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-semibold text-yellow-600">
                {{ dashboardData.tasks.pending }}
              </div>
              <div class="text-sm text-gray-600">Pending</div>
            </div>
          </div>

          <div>
            <h3 class="font-medium mb-3">Upcoming Tasks</h3>
            <div class="space-y-3">
              <div v-for="task in dashboardData.tasks.upcoming" 
                   :key="task.id"
                   class="p-3 border rounded-lg"
              >
                <div class="font-medium">{{ task.title }}</div>
                <div class="text-sm text-gray-600">{{ task.subject }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  Due: {{ new Date(task.endDate).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Extracurricular Activities -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Extracurricular Activities</h2>
        <div class="space-y-6">
          <div v-for="activity in dashboardData.extracurricular" 
               :key="activity.category"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium">{{ activity.category }}</h3>
              <span class="text-sm text-gray-600">{{ activity.count }} Activities</span>
            </div>
            <div class="space-y-3">
              <div v-for="detail in activity.details" 
                   :key="detail.name"
                   class="p-3 border rounded-lg"
              >
                <div class="font-medium">{{ detail.name }}</div>
                <div class="flex items-center justify-between mt-2 text-sm">
                  <span class="text-gray-600">
                    {{ new Date(detail.date).toLocaleDateString() }}
                  </span>
                  <span v-if="detail.achievement" 
                        class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                  >
                    {{ detail.achievement }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Development -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Skill Development</h2>
        <div class="space-y-6">
          <div v-for="skill in dashboardData.skillDevelopment" 
               :key="skill.name"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium">{{ skill.name }}</h3>
              <span class="text-sm text-gray-600">
                {{ skill.completedActivities }}/{{ skill.totalActivities }} Activities
              </span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary"
                :style="`width: ${skill.completionRate}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Discipline & Behavior -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Discipline & Behavior</h2>
        <div class="text-2xl font-semibold mb-6" 
             :class="getDisciplineColor(dashboardData.discipline.rating)"
        >
          {{ dashboardData.discipline.rating.charAt(0).toUpperCase() + 
             dashboardData.discipline.rating.slice(1).replace('_', ' ') }}
        </div>
        <div class="space-y-4">
          <div v-for="feedback in dashboardData.discipline.teacherFeedback" 
               :key="feedback"
               class="p-3 bg-gray-50 rounded-lg"
          >
            {{ feedback }}
          </div>
        </div>
        <div class="text-sm text-gray-600 mt-4">
          Last updated: {{ new Date(dashboardData.discipline.lastUpdated).toLocaleDateString() }}
        </div>
      </div>

      <!-- Health & Wellness -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Health & Wellness</h2>
        <div class="text-3xl font-semibold text-primary mb-6">
          {{ dashboardData.health.overallScore }}% Active
        </div>
        <div class="space-y-6">
          <div v-for="activity in dashboardData.health.activities" 
               :key="activity.type"
               class="p-4 border rounded-lg"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-medium">{{ activity.type }}</h3>
              <span class="text-sm text-gray-600">
                {{ activity.participationRate }}% Participation
              </span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
              <div 
                class="h-full bg-green-500"
                :style="`width: ${activity.performance}%`"
              ></div>
            </div>
            <div class="text-sm text-gray-600">
              Last activity: {{ new Date(activity.lastActivity).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance -->
      <div class="bg-white rounded-card border border-border p-6">
        <h2 class="text-lg font-medium mb-4">Attendance Record</h2>
        <div class="text-3xl font-semibold text-primary mb-6">
          {{ getAttendancePercentage() }}% Present
        </div>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="text-center p-4 bg-green-100 rounded-lg">
            <div class="text-2xl font-semibold text-green-800">
              {{ dashboardData.attendance.monthly.present }}
            </div>
            <div class="text-sm text-green-600">Present</div>
          </div>
          <div class="text-center p-4 bg-red-100 rounded-lg">
            <div class="text-2xl font-semibold text-red-800">
              {{ dashboardData.attendance.monthly.absent }}
            </div>
            <div class="text-sm text-red-600">Absent</div>
          </div>
          <div class="text-center p-4 bg-yellow-100 rounded-lg">
            <div class="text-2xl font-semibold text-yellow-800">
              {{ dashboardData.attendance.monthly.late }}
            </div>
            <div class="text-sm text-yellow-600">Late</div>
          </div>
        </div>
        <div class="text-sm text-gray-600">
          Class Average: {{ dashboardData.attendance.classAverage }}%
        </div>
      </div>
    </div>
  </div>
</template>