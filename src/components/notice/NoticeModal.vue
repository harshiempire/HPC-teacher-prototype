<script setup lang="ts">
import { XMarkIcon, PaperClipIcon, CalendarIcon, UserIcon, BuildingOfficeIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import type { Notice } from '@/types/notice'
import { categoryInfo, priorityInfo } from '@/stores/notices'

defineProps<{
  show: boolean
  notice: Notice
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-2xl m-4">
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="flex items-center gap-2">
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                categoryInfo[notice.category].color
              ]">
                {{ categoryInfo[notice.category].label }}
              </span>
              <span :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                priorityInfo[notice.priority].color
              ]">
                {{ priorityInfo[notice.priority].label }}
              </span>
            </div>
            <h2 class="text-2xl font-semibold mt-2">{{ notice.title }}</h2>
          </div>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Content -->
        <div class="space-y-6">
          <!-- Description -->
          <div class="text-gray-600">
            {{ notice.description }}
          </div>

          <!-- Metadata -->
          <div class="grid grid-cols-2 gap-4">
            <div class="flex items-center gap-2 text-gray-600">
              <CalendarIcon class="h-5 w-5" />
              <span>{{ new Date(notice.date).toLocaleDateString() }}</span>
            </div>
            <div v-if="notice.time" class="flex items-center gap-2 text-gray-600">
              <ClockIcon class="h-5 w-5" />
              <span>{{ notice.time }}</span>
            </div>
            <div v-if="notice.venue" class="flex items-center gap-2 text-gray-600">
              <MapPinIcon class="h-5 w-5" />
              <span>{{ notice.venue }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <UserIcon class="h-5 w-5" />
              <span>{{ notice.author }}</span>
            </div>
            <div v-if="notice.department" class="flex items-center gap-2 text-gray-600">
              <BuildingOfficeIcon class="h-5 w-5" />
              <span>{{ notice.department }}</span>
            </div>
            <div v-if="notice.expiresAt" class="flex items-center gap-2 text-gray-600">
              <CalendarIcon class="h-5 w-5" />
              <span>Expires: {{ new Date(notice.expiresAt).toLocaleDateString() }}</span>
            </div>
          </div>

          <!-- Attachments -->
          <div v-if="notice.attachments?.length" class="border-t pt-4">
            <h3 class="font-medium mb-3">Attachments</h3>
            <div class="space-y-2">
              <a 
                v-for="attachment in notice.attachments"
                :key="attachment"
                :href="attachment"
                target="_blank"
                class="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <PaperClipIcon class="h-5 w-5" />
                <span>{{ attachment }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>