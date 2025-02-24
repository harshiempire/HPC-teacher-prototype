<script setup lang="ts">
import { computed } from 'vue'
import {
  CalendarIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  PaperClipIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline'
import type { Notice } from '@/types/notice'
import { categoryInfo, priorityInfo } from '@/stores/notices'

const props = defineProps<{
  notice: Notice
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isExpired = computed(() => {
  if (!props.notice.expiresAt) return false
  return new Date(props.notice.expiresAt) < new Date()
})

const categoryIcon = computed(() => {
  const icons = {
    event: CalendarIcon,
    examination: DocumentTextIcon,
    emergency: ExclamationCircleIcon,
    announcement: DocumentTextIcon
  }
  return icons[props.notice.category]
})
</script>

<template>
  <div 
    class="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
    :class="{ 'opacity-75': isExpired }"
    @click="emit('click')"
  >
    <div class="flex items-start gap-4">
      <div :class="[
        'p-2 rounded-lg',
        categoryInfo[notice.category].color
      ]">
        <component :is="categoryIcon" class="h-5 w-5" />
      </div>

      <div class="flex-1">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3 class="font-medium">{{ notice.title }}</h3>
            <p class="text-sm text-gray-600 mt-1 line-clamp-2">
              {{ notice.description }}
            </p>
          </div>
          <span :class="[
            'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
            priorityInfo[notice.priority].color
          ]">
            {{ priorityInfo[notice.priority].label }}
          </span>
        </div>

        <div class="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <div class="flex items-center gap-1">
            <CalendarIcon class="h-4 w-4" />
            <span>{{ new Date(notice.date).toLocaleDateString() }}</span>
          </div>
          <div v-if="notice.time" class="flex items-center gap-1">
            <ClockIcon class="h-4 w-4" />
            <span>{{ notice.time }}</span>
          </div>
          <div v-if="notice.venue" class="flex items-center gap-1">
            <MapPinIcon class="h-4 w-4" />
            <span>{{ notice.venue }}</span>
          </div>
          <div v-if="notice.attachments?.length" class="flex items-center gap-1">
            <PaperClipIcon class="h-4 w-4" />
            <span>{{ notice.attachments.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>