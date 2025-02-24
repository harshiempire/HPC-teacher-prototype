<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import ScholasticReport from '@/components/reports/ScholasticReport.vue'
import CoScholasticReport from '@/components/reports/CoScholasticReport.vue'
import HealthReport from '@/components/reports/HealthReport.vue'
import AchievementsReport from '@/components/reports/AchievementsReport.vue'
import HolisticProgressCard from '@/components/reports/HolisticProgressCard.vue'

const activeTab = ref('scholastic')
const showProgressCard = ref(false)

const openProgressCard = () => {
  showProgressCard.value = true
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Student Reports</h1>
      <button
        @click="openProgressCard"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
      >
        <ArrowDownTrayIcon class="h-5 w-5" />
        <span>View Progress Card</span>
      </button>
    </div>
    
    <!-- Report Tabs -->
    <div class="flex gap-4 mb-6">
      <button 
        v-for="tab in ['scholastic', 'co-scholastic', 'health', 'achievements']"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === tab 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        {{ tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-') }}
      </button>
    </div>

    <!-- Report Content -->
    <div class="space-y-6">
      <ScholasticReport v-if="activeTab === 'scholastic'" />
      <CoScholasticReport v-if="activeTab === 'co-scholastic'" />
      <HealthReport v-if="activeTab === 'health'" />
      <AchievementsReport v-if="activeTab === 'achievements'" />
    </div>

    <!-- Holistic Progress Card Modal -->
    <div v-if="showProgressCard" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-6xl m-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold">Holistic Progress Card</h2>
            <button 
              @click="showProgressCard = false"
              class="text-gray-500 hover:text-gray-700"
            >
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <HolisticProgressCard />
        </div>
      </div>
    </div>
  </div>
</template>