<script setup lang="ts">
import {
  HomeIcon,
  UserIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarIcon,
  BellIcon,
  DocumentChartBarIcon,
  BookOpenIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const navigation = {
  overall: [
    { name: 'Dashboard', icon: HomeIcon },
    { name: 'My Profile', icon: UserIcon },
    { name: 'Class Info', icon: AcademicCapIcon },
    { name: 'My Tasks', icon: ClipboardDocumentListIcon },
    { name: 'Academic Journey', icon: ChartBarIcon },
    { name: 'Academic Calendar', icon: CalendarIcon },
    { name: 'Notice Board', icon: BellIcon },
    { name: 'Reports', icon: DocumentChartBarIcon },
    { name: 'Content Library', icon: BookOpenIcon },
    { name: 'Practice Tests', icon: PencilSquareIcon },
  ],
  system: [
    { name: 'Settings', icon: Cog6ToothIcon },
    { name: 'Help', icon: QuestionMarkCircleIcon },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon },
  ]
}
</script>

<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-white border-r border-border flex flex-col">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-primary">HPC</h1>
    </div>
    
    <nav class="flex-1 overflow-y-auto">
      <div class="nav-section">OVERALL</div>
      <div class="space-y-1">
        <a v-for="item in navigation.overall" 
           :key="item.name"
           href="#" 
           :class="['nav-item', item.name === 'Dashboard' ? 'active' : '']">
          <component :is="item.icon" class="h-5 w-5" />
          <span class="truncate">{{ item.name }}</span>
        </a>
      </div>

      <div class="nav-section mt-6">SYSTEM PREFERENCE</div>
      <div class="space-y-1">
        <a v-for="item in navigation.system" 
           :key="item.name"
           href="#" 
           class="nav-item">
          <component :is="item.icon" class="h-5 w-5" />
          <span class="truncate">{{ item.name }}</span>
        </a>
      </div>
    </nav>
  </aside>
</template>