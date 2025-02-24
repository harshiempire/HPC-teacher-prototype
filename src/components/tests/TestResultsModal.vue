<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import type { PracticeTest } from '@/types/tests'

const props = defineProps<{
  show: boolean
  test: PracticeTest
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const percentage = computed(() => {
  if (props.test.score === undefined) return 0
  return Math.round((props.test.score / props.test.totalQuestions) * 100)
})

const timeTaken = computed(() => {
  if (!props.test.startedAt || !props.test.completedAt) return 0
  const start = new Date(props.test.startedAt).getTime()
  const end = new Date(props.test.completedAt).getTime()
  return Math.round((end - start) / 1000 / 60) // in minutes
})

const getPerformanceColor = computed(() => {
  if (percentage.value >= 80) return 'text-green-600'
  if (percentage.value >= 60) return 'text-yellow-600'
  return 'text-red-600'
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-4xl m-4 max-h-[90vh] flex flex-col">
      <div class="p-6 border-b">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-semibold">Test Results</h2>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto">
        <!-- Summary -->
        <div class="p-6">
          <div class="bg-gray-50 rounded-lg p-6 mb-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div class="text-sm text-gray-600 mb-1">Subject</div>
                <div class="font-medium">{{ test.subject }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">Chapter</div>
                <div class="font-medium">{{ test.chapters[0] || 'N/A' }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">Score</div>
                <div class="font-medium">{{ test.score }}/{{ test.totalQuestions }}</div>
              </div>
              <div>
                <div class="text-sm text-gray-600 mb-1">Time Taken</div>
                <div class="font-medium">{{ timeTaken }} minutes</div>
              </div>
            </div>

            <div class="mt-6">
              <div class="text-sm text-gray-600 mb-1">Performance</div>
              <div :class="['text-3xl font-semibold', getPerformanceColor]">
                {{ percentage }}%
              </div>
            </div>
          </div>

          <!-- Questions Review -->
          <div class="space-y-6">
            <div v-for="(question, index) in test.questions" 
                 :key="question.id"
                 class="border rounded-lg p-6"
            >
              <div class="flex items-start gap-3">
                <div class="flex-shrink-0">
                  <component 
                    :is="question.selectedAnswer === question.correctAnswer ? CheckCircleIcon : XCircleIcon"
                    :class="[
                      'h-6 w-6',
                      question.selectedAnswer === question.correctAnswer ? 'text-green-500' : 'text-red-500'
                    ]"
                  />
                </div>
                <div class="flex-1">
                  <p class="font-medium mb-4">
                    {{ index + 1 }}. {{ question.text }}
                  </p>
                  <div class="space-y-3">
                    <div v-for="(option, optIndex) in question.options" 
                         :key="optIndex"
                         class="p-3 rounded-lg border"
                         :class="{
                           'bg-green-50 border-green-200': optIndex === question.correctAnswer,
                           'bg-red-50 border-red-200': optIndex === question.selectedAnswer && optIndex !== question.correctAnswer,
                           'border-gray-200': optIndex !== question.correctAnswer && optIndex !== question.selectedAnswer
                         }"
                    >
                      <div class="flex items-center justify-between">
                        <span>{{ option }}</span>
                        <div v-if="optIndex === question.correctAnswer" class="text-green-600 text-sm font-medium">
                          Correct Answer
                        </div>
                        <div v-else-if="optIndex === question.selectedAnswer" class="text-red-600 text-sm font-medium">
                          Your Answer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>