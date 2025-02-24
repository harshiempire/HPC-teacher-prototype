<script setup lang="ts">
// Mock data
const activities = [
  {
    name: 'Classical Dance',
    domain: 'Fine Arts',
    level: 'Advanced',
    achievements: ['First Prize in Annual Day', 'State Level Participation']
  },
  {
    name: 'Basketball',
    domain: 'Sports',
    level: 'Intermediate',
    achievements: ['School Team Captain', 'District Level Runner-up']
  },
  {
    name: 'Public Speaking',
    domain: 'Literary',
    level: 'Advanced',
    achievements: ['Best Speaker Award', 'Debate Competition Winner']
  }
]

const competitions = [
  {
    name: 'Annual Art Exhibition',
    category: 'Fine Arts',
    position: 'First Place',
    date: '2025-02-15'
  },
  {
    name: 'Inter-school Science Fair',
    category: 'Academic',
    position: 'Second Place',
    date: '2025-01-20'
  },
  {
    name: 'State Music Festival',
    category: 'Performing Arts',
    position: 'Special Mention',
    date: '2024-12-10'
  }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Activities List -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Participated Activities</h2>
      <div class="space-y-4">
        <div v-for="activity in activities" 
             :key="activity.name"
             class="border rounded-lg p-4"
        >
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-medium">{{ activity.name }}</h3>
              <p class="text-sm text-gray-600">{{ activity.domain }}</p>
              <div class="mt-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ activity.level }}
                </span>
              </div>
            </div>
            <div class="text-sm">
              <h4 class="font-medium text-gray-700 mb-1">Achievements</h4>
              <ul class="list-disc list-inside text-gray-600">
                <li v-for="achievement in activity.achievements" 
                    :key="achievement"
                >
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Competitions & Awards -->
    <div class="bg-white rounded-card border border-border p-6">
      <h2 class="text-lg font-medium mb-4">Competitions & Awards</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4">Competition</th>
              <th class="text-left py-3 px-4">Category</th>
              <th class="text-left py-3 px-4">Position</th>
              <th class="text-left py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="competition in competitions" 
                :key="competition.name"
                class="border-b"
            >
              <td class="py-3 px-4 font-medium">{{ competition.name }}</td>
              <td class="py-3 px-4">{{ competition.category }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    competition.position.includes('First') ? 'bg-yellow-100 text-yellow-800' :
                    competition.position.includes('Second') ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  ]"
                >
                  {{ competition.position }}
                </span>
              </td>
              <td class="py-3 px-4">{{ new Date(competition.date).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>