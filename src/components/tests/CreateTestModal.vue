<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { TestConfig, PracticeTest, QuestionDistribution } from '@/types/tests'
import { availableSubjects } from '@/types/tests'
import { generateQuestions } from '@/stores/tests'

 defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', test: PracticeTest): void
}>()

const selectedSubject = ref('')
const selectedChapters = ref<string[]>([])
const questionCount = ref(10)
const timeLimit = ref(30)
const difficulty = ref<'easy' | 'medium' | 'hard'>('medium')

const availableChapters = computed(() => {
  const subject = availableSubjects.find(s => s.subject === selectedSubject.value)
  return subject?.chapters || []
})

// Calculate question distribution based on difficulty level
const getQuestionDistribution = (): QuestionDistribution => {
  switch (difficulty.value) {
    case 'easy':
      return {
        easy: Math.round(questionCount.value * 0.7),
        medium: Math.round(questionCount.value * 0.2),
        hard: Math.round(questionCount.value * 0.1)
      }
    case 'medium':
      return {
        easy: Math.round(questionCount.value * 0.3),
        medium: Math.round(questionCount.value * 0.4),
        hard: Math.round(questionCount.value * 0.3)
      }
    case 'hard':
      return {
        easy: Math.round(questionCount.value * 0.1),
        medium: Math.round(questionCount.value * 0.3),
        hard: Math.round(questionCount.value * 0.6)
      }
  }
}

const isValid = computed(() => {
  return (
    selectedSubject.value &&
    selectedChapters.value.length > 0 &&
    questionCount.value >= 5 &&
    questionCount.value <= 50 &&
    timeLimit.value >= 10 &&
    timeLimit.value <= 180
  )
})

const handleCreate = () => {
  if (!isValid.value) return

  const config: TestConfig = {
    subject: selectedSubject.value,
    chapters: selectedChapters.value,
    totalQuestions: questionCount.value,
    timeLimit: timeLimit.value,
    questionDistribution: getQuestionDistribution()
  }

  const test: PracticeTest = {
    id: Date.now().toString(),
    ...config,
    questions: generateQuestions(config),
    status: 'not_started',
    createdAt: new Date().toISOString()
  }

  emit('create', test)
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-lg m-4">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">Create Practice Test</h2>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <div class="space-y-4">
          <!-- Subject Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              v-model="selectedSubject"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Select a subject</option>
              <option v-for="subject in availableSubjects" 
                      :key="subject.subject"
                      :value="subject.subject"
              >
                {{ subject.subject }}
              </option>
            </select>
          </div>

          <!-- Chapter Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Chapters (Select multiple)
            </label>
            <div class="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
              <div v-for="chapter in availableChapters" 
                   :key="chapter"
                   class="p-2 hover:bg-gray-50"
              >
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :value="chapter"
                    v-model="selectedChapters"
                    class="text-primary focus:ring-primary rounded"
                  >
                  <span>{{ chapter }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Number of Questions -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Total Questions (5-50)
            </label>
            <input
              v-model="questionCount"
              type="number"
              min="5"
              max="50"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
          </div>

          <!-- Difficulty Level -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                @click="difficulty = 'easy'"
                :class="[
                  'p-3 rounded-lg border-2 transition-colors',
                  difficulty === 'easy'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-200'
                ]"
              >
                Easy
              </button>
              <button
                @click="difficulty = 'medium'"
                :class="[
                  'p-3 rounded-lg border-2 transition-colors',
                  difficulty === 'medium'
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                    : 'border-gray-200 hover:border-yellow-200'
                ]"
              >
                Medium
              </button>
              <button
                @click="difficulty = 'hard'"
                :class="[
                  'p-3 rounded-lg border-2 transition-colors',
                  difficulty === 'hard'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-red-200'
                ]"
              >
                Hard
              </button>
            </div>
          </div>

          <!-- Time Limit -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Time Limit (10-180 minutes)
            </label>
            <input
              v-model="timeLimit"
              type="number"
              min="10"
              max="180"
              class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="handleCreate"
            :disabled="!isValid"
            :class="[
              'px-6 py-2 rounded-cta transition-colors',
              isValid
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ]"
          >
            Create Test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>