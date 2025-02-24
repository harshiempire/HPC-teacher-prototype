<script setup lang="ts">
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'

const studentInfo = {
  name: 'John Doe',
  class: 'X-A',
  rollNo: '2023001',
  admissionNo: 'ADM2023001',
  academicYear: '2024-25'
}

const downloadProgressCard = () => {
  // In a real application, this would generate and download a PDF
  console.log('Downloading progress card...')
}
</script>

<template>
  <div class="bg-white rounded-card border border-border p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-medium">Holistic Progress Card</h2>
      <button
        @click="downloadProgressCard"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
      >
        <ArrowDownTrayIcon class="h-5 w-5" />
        <span>Download PDF</span>
      </button>
    </div>

    <div class="border rounded-lg p-6">
      <!-- School Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-primary">Happy Public School</h1>
        <p class="text-gray-600">Academic Year {{ studentInfo.academicYear }}</p>
      </div>

      <!-- Student Information -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div class="text-sm text-gray-600">Student Name</div>
          <div class="font-medium">{{ studentInfo.name }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Class</div>
          <div class="font-medium">{{ studentInfo.class }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Roll No.</div>
          <div class="font-medium">{{ studentInfo.rollNo }}</div>
        </div>
        <div>
          <div class="text-sm text-gray-600">Admission No.</div>
          <div class="font-medium">{{ studentInfo.admissionNo }}</div>
        </div>
      </div>

      <!-- Progress Summary -->
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium mb-3">Scholastic Areas</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 px-4">Subject</th>
                  <th class="text-center py-2 px-4">FA1</th>
                  <th class="text-center py-2 px-4">FA2</th>
                  <th class="text-center py-2 px-4">SA1</th>
                  <th class="text-center py-2 px-4">FA3</th>
                  <th class="text-center py-2 px-4">FA4</th>
                  <th class="text-center py-2 px-4">SA2</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="subject in ['Mathematics', 'Science', 'English', 'Social Studies']" 
                    :key="subject"
                    class="border-b"
                >
                  <td class="py-2 px-4">{{ subject }}</td>
                  <td v-for="n in 6" :key="n" class="text-center py-2 px-4">
                    {{ Math.floor(Math.random() * 20) + 80 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-3">Co-Scholastic Activities</h3>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="activity in ['Art & Craft', 'Music', 'Physical Education', 'Life Skills']"
                 :key="activity"
                 class="border rounded p-3"
            >
              <div class="font-medium">{{ activity }}</div>
              <div class="text-sm text-gray-600 mt-1">
                Grade: {{ ['A+', 'A', 'B+', 'A'][Math.floor(Math.random() * 4)] }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-3">Attendance</h3>
          <div class="flex items-center gap-8">
            <div>
              <div class="text-sm text-gray-600">Total Working Days</div>
              <div class="font-medium">220</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">Days Present</div>
              <div class="font-medium">210</div>
            </div>
            <div>
              <div class="text-sm text-gray-600">Percentage</div>
              <div class="font-medium">95.5%</div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-3">Remarks</h3>
          <p class="text-gray-600">
            John has shown excellent progress in both academic and co-curricular activities. 
            His consistent performance and active participation in various school activities 
            is commendable.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>