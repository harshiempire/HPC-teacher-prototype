<script setup lang="ts">
import { MagnifyingGlassIcon, CalendarIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToTimetable = () => {
  router.push('/timetable')
}
</script>

<template>
  <header class="fixed top-0 left-64 right-0 h-20 bg-white border-b border-border z-10">
    <div class="h-full flex items-center justify-between px-6">
      <div class="flex-1 max-w-2xl">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            class="w-full pl-12 pr-4 py-2.5 rounded-full border border-border focus:outline-none focus:border-primary"
          >
        </div>
      </div>
      
      <div class="flex items-center gap-6">
        <button 
          @click="navigateToTimetable"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
        >
          <CalendarIcon class="h-5 w-5" />
          <span>Timetable</span>
        </button>
        
        <div class="flex items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Rohan+Rao" alt="Profile" class="h-10 w-10 rounded-full" />
          <div>
            <div class="font-medium">Rohan Rao</div>
            <div class="text-sm text-gray-500">Middle Stage</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>