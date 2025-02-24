<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MagnifyingGlassIcon,
  ClockIcon,
  ExclamationCircleIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'
import type { Notice, NoticeCategory } from '@/types/notice'
import { notices, categoryInfo, filterNotices, departmentList } from '@/stores/notices'
import NoticeCard from '@/components/notice/NoticeCard.vue'
import NoticeModal from '@/components/notice/NoticeModal.vue'

const searchQuery = ref('')
const selectedCategory = ref<NoticeCategory | 'all'>('all')
const selectedDepartment = ref<string>('all')
const sortBy = ref<'date' | 'priority'>('date')

// Modal state
const showModal = ref(false)
const selectedNotice = ref<Notice | null>(null)

const filteredNotices = computed(() => {
  let filtered = filterNotices(notices, selectedCategory.value, searchQuery.value, sortBy.value)
  
  if (selectedDepartment.value !== 'all') {
    filtered = filtered.filter(notice => notice.department === selectedDepartment.value)
  }
  
  return filtered
})

const openNotice = (notice: Notice) => {
  selectedNotice.value = notice
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedNotice.value = null
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Notice Board</h1>

    <!-- Category Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div 
        v-for="(info, category) in categoryInfo" 
        :key="category"
        class="bg-white rounded-lg border border-border p-4 cursor-pointer"
        :class="{ 'border-primary': selectedCategory === category }"
        @click="selectedCategory = selectedCategory === category ? 'all' : category"
      >
        <div class="flex items-center justify-between">
          <h3 class="font-medium">{{ info.label }}</h3>
          <span :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            info.color
          ]">
            {{ filteredNotices.filter(n => n.category === category).length }}
          </span>
        </div>
        <p class="text-sm text-gray-600 mt-1">{{ info.description }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg border border-border p-4 mb-6">
      <div class="flex items-center gap-6">
        <!-- Search -->
        <div class="flex-1 relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search notices..."
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
          >
        </div>

        <!-- Department Filter -->
        <div class="flex items-center gap-2">
          <BuildingOfficeIcon class="h-5 w-5 text-gray-400" />
          <select
            v-model="selectedDepartment"
            class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
          >
            <option value="all">All Departments</option>
            <option v-for="dept in departmentList" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-4">
          <button 
            @click="sortBy = 'date'"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
              sortBy === 'date' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            <ClockIcon class="h-5 w-5" />
            <span>Date</span>
          </button>
          <button 
            @click="sortBy = 'priority'"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
              sortBy === 'priority' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            <ExclamationCircleIcon class="h-5 w-5" />
            <span>Priority</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notices List -->
    <div class="space-y-4">
      <NoticeCard
        v-for="notice in filteredNotices"
        :key="notice.id"
        :notice="notice"
        @click="openNotice(notice)"
      />
    </div>

    <!-- Notice Modal -->
    <NoticeModal
      v-if="selectedNotice"
      :show="showModal"
      :notice="selectedNotice"
      @close="closeModal"
    />
  </div>
</template>