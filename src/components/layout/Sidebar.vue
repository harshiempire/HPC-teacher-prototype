<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'My Profile', icon: UserIcon, path: '/profile' },
    { name: 'Class Info', icon: AcademicCapIcon, path: '/class-info' },
    { name: 'My Tasks', icon: ClipboardDocumentListIcon, path: '/tasks' },
    { name: 'Academic Journey', icon: ChartBarIcon, path: '/journey' },
    { name: 'Academic Calendar', icon: CalendarIcon, path: '/calendar' },
    { name: 'Notice Board', icon: BellIcon, path: '/notices' },
    { name: 'Reports', icon: DocumentChartBarIcon, path: '/reports' },
    { name: 'Content Library', icon: BookOpenIcon, path: '/library' },
    { name: 'Practice Tests', icon: PencilSquareIcon, path: '/tests' },
  ],
  system: [
    { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
    { name: 'Help', icon: QuestionMarkCircleIcon, path: '/help' },
    { name: 'Logout', icon: ArrowRightOnRectangleIcon, path: '/logout' },
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
        <RouterLink 
          v-for="item in navigation.overall" 
          :key="item.name"
          :to="item.path"
          :class="['nav-item', $route.path === item.path ? 'active' : '']"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span class="truncate">{{ item.name }}</span>
        </RouterLink>
      </div>

      <div class="nav-section mt-6">SYSTEM PREFERENCE</div>
      <div class="space-y-1">
        <RouterLink 
          v-for="item in navigation.system" 
          :key="item.name"
          :to="item.path"
          :class="['nav-item', $route.path === item.path ? 'active' : '']"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span class="truncate">{{ item.name }}</span>
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>