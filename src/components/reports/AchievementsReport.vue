<script setup lang="ts">
// Mock data
const achievements = [
  {
    id: '1',
    title: 'Mathematics Excellence',
    type: 'Academic',
    description: 'Highest score in Mathematics FA2 examination',
    badge: 'Gold',
    date: '2025-02-01'
  },
  {
    id: '2',
    title: 'Science Project Winner',
    type: 'Project',
    description: 'Best innovative project in Science Exhibition',
    badge: 'Gold',
    date: '2025-01-15'
  },
  {
    id: '3',
    title: 'English Debate Champion',
    type: 'Co-curricular',
    description: 'Winner of Inter-class Debate Competition',
    badge: 'Silver',
    date: '2024-12-20'
  }
]

const badges = {
  Gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Silver: 'bg-gray-100 text-gray-800 border-gray-200',
  Bronze: 'bg-orange-100 text-orange-800 border-orange-200'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Achievements List -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Academic Achievements</h2>
      <div class="space-y-4">
        <div v-for="achievement in achievements" 
             :key="achievement.id"
             class="border rounded-lg p-4"
        >
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-medium">{{ achievement.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ achievement.description }}</p>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-sm text-gray-500">
                  {{ new Date(achievement.date).toLocaleDateString() }}
                </span>
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    badges[achievement.badge as keyof typeof badges]
                  ]"
                >
                  {{ achievement.badge }} Badge
                </span>
              </div>
            </div>
            <span 
              class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {{ achievement.type }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>