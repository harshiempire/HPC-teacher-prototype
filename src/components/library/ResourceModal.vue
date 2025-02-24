<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon, HeartIcon, EyeIcon } from '@heroicons/vue/24/outline'
import type { Resource } from '@/types/contentLibrary'
import { resourceTypeInfo } from '@/stores/contentLibrary'

const props = defineProps<{
  show: boolean
  resource: Resource
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'like', resourceId: string): void
}>()

const activeTab = ref<'preview' | 'details'>('preview')

const formattedDate = computed(() => {
  return new Date(props.resource.uploadedAt).toLocaleDateString()
})

const handleLike = () => {
  emit('like', props.resource.id)
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-4xl m-4">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold">{{ resource.title }}</h2>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                resourceTypeInfo[resource.type].color
              ]">
                {{ resourceTypeInfo[resource.type].label }}
              </span>
              <span>{{ resource.format }}</span>
              <span>{{ formattedDate }}</span>
            </div>
          </div>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 mb-6">
          <button 
            v-for="tab in ['preview', 'details']"
            :key="tab"
            @click="activeTab = tab as 'preview' | 'details'"
            :class="[
              'px-4 py-2 rounded-lg transition-colors',
              activeTab === tab ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </div>

        <!-- Content -->
        <div class="mb-6">
          <!-- Preview Tab -->
          <div v-if="activeTab === 'preview'" class="aspect-video bg-gray-100 rounded-lg">
            <template v-if="resource.type === 'video'">
              <video 
                class="w-full h-full rounded-lg"
                controls
                :src="resource.url"
              ></video>
            </template>
            <template v-else-if="resource.type === 'podcast'">
              <audio 
                class="w-full mt-[25%]"
                controls
                :src="resource.url"
              ></audio>
            </template>
            <template v-else>
              <iframe
                class="w-full h-full rounded-lg"
                :src="resource.url"
                title="Resource Preview"
              ></iframe>
            </template>
          </div>

          <!-- Details Tab -->
          <div v-else class="space-y-4">
            <div v-if="resource.description" class="text-gray-600">
              {{ resource.description }}
            </div>
            <div v-if="resource.uploadedBy" class="flex items-center gap-2 text-sm text-gray-600">
              <span>Uploaded by:</span>
              <span class="font-medium">{{ resource.uploadedBy }}</span>
            </div>
            <div v-if="resource.school" class="flex items-center gap-2 text-sm text-gray-600">
              <span>School:</span>
              <span class="font-medium">{{ resource.school }}</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <button 
              @click="handleLike"
              class="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <HeartIcon class="h-5 w-5" />
              <span>{{ resource.likes }}</span>
            </button>
            <div class="flex items-center gap-2 text-gray-600">
              <EyeIcon class="h-5 w-5" />
              <span>{{ resource.views }}</span>
            </div>
          </div>
          <a 
            :href="resource.url"
            target="_blank"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  </div>
</template>