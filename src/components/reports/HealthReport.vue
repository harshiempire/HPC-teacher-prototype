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
const healthMetrics = {
  bmi: {
    current: 21.5,
    history: [20.8, 21.0, 21.2, 21.5],
    status: 'normal'
  },
  height: {
    value: 165,
    unit: 'cm'
  },
  weight: {
    value: 58,
    unit: 'kg'
  }
}

const mentalHealth = {
  stress: {
    level: 'low',
    score: 3
  },
  anxiety: {
    level: 'moderate',
    score: 5
  },
  mood: {
    level: 'positive',
    score: 8
  }
}

const screenings = [
  {
    type: 'Vision',
    date: '2025-01-15',
    result: 'Normal',
    notes: '20/20 vision in both eyes'
  },
  {
    type: 'Hearing',
    date: '2025-01-15',
    result: 'Normal',
    notes: 'No significant issues detected'
  },
  {
    type: 'Dental',
    date: '2024-12-10',
    result: 'Follow-up',
    notes: 'Regular cleaning recommended'
  },
  {
    type: 'Skin',
    date: '2024-12-10',
    result: 'Normal',
    notes: 'No concerns'
  }
]

const moodData = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  datasets: [
    {
      label: 'Stress Level',
      data: [4, 5, 3, 4, 3, 3],
      borderColor: '#dc2626',
      tension: 0.4
    },
    {
      label: 'Anxiety Level',
      data: [6, 5, 5, 4, 5, 5],
      borderColor: '#9333ea',
      tension: 0.4
    },
    {
      label: 'Mood Score',
      data: [7, 6, 8, 7, 8, 8],
      borderColor: '#16a34a',
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
      max: 10
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Physical Metrics -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Physical Health Metrics</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="border rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">BMI</div>
          <div class="text-2xl font-medium">{{ healthMetrics.bmi.current }}</div>
          <div 
            :class="[
              'mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              healthMetrics.bmi.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            {{ healthMetrics.bmi.status.charAt(0).toUpperCase() + healthMetrics.bmi.status.slice(1) }}
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Height</div>
          <div class="text-2xl font-medium">
            {{ healthMetrics.height.value }} {{ healthMetrics.height.unit }}
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <div class="text-sm text-gray-600 mb-1">Weight</div>
          <div class="text-2xl font-medium">
            {{ healthMetrics.weight.value }} {{ healthMetrics.weight.unit }}
          </div>
        </div>
      </div>
    </div>

    <!-- Mental Health Tracking -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Mental Health Tracking</h2>
      <div class="h-80 mb-6">
        <Line :data="moodData" :options="chartOptions" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="(metric, key) in mentalHealth" 
             :key="key"
             class="border rounded-lg p-4"
        >
          <div class="text-sm text-gray-600 mb-1">
            {{ key.charAt(0).toUpperCase() + key.slice(1) }}
          </div>
          <div class="flex items-center justify-between">
            <div 
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                metric.level === 'low' ? 'bg-green-100 text-green-800' :
                metric.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                metric.level === 'positive' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              ]"
            >
              {{ metric.level.charAt(0).toUpperCase() + metric.level.slice(1) }}
            </div>
            <div class="text-lg font-medium">{{ metric.score }}/10</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Health Screenings -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Health Screenings</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">Screening Type</th>
              <th class="text-left py-3 px-4">Date</th>
              <th class="text-left py-3 px-4">Result</th>
              <th class="text-left py-3 px-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="screening in screenings" 
                :key="screening.type"
                class="border-b"
            >
              <td class="py-3 px-4 font-medium">{{ screening.type }}</td>
              <td class="py-3 px-4">{{ new Date(screening.date).toLocaleDateString() }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    screening.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ screening.result }}
                </span>
              </td>
              <td class="py-3 px-4 text-gray-600">{{ screening.notes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>