<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { PracticeTest,  } from '@/types/tests'

const props = defineProps<{
  show: boolean
  test: PracticeTest
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'complete', test: PracticeTest): void
}>()

const remainingTime = ref(props.test.timeLimit * 60) // Convert to seconds
const timer = ref<number | null>(null)

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60)
  const seconds = remainingTime.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const isComplete = computed(() => 
  props.test.questions.every(q => q.selectedAnswer !== undefined)
)

const answeredCount = computed(() => 
  props.test.questions.filter(q => q.selectedAnswer !== undefined).length
)

const startTimer = () => {
  timer.value = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      handleSubmit()
    }
  }, 1000)
}

const handleAnswer = (questionId: string, answerIndex: number) => {
  const question = props.test.questions.find(q => q.id === questionId)
  if (question) {
    question.selectedAnswer = answerIndex
  }
}

const handleSubmit = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }

  const score = props.test.questions.reduce((acc, q) => 
    acc + (q.selectedAnswer === q.correctAnswer ? 1 : 0), 0
  )

  const completedTest: PracticeTest = {
    ...props.test,
    status: 'completed',
    score,
    startedAt: props.test.startedAt || new Date().toISOString(),
    completedAt: new Date().toISOString()
  }

  emit('complete', completedTest)
}

onMounted(() => {
  if (props.test.status === 'not_started') {
    props.test.status = 'in_progress'
    props.test.startedAt = new Date().toISOString()
  }
  startTimer()
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-4xl m-4 max-h-[90vh] flex flex-col">
      <div class="p-6 border-b">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-semibold">{{ test.subject }} - {{ test.chapters.join(', ') }}</h2>
            <p class="text-gray-600">
              Answered {{ answeredCount }}/{{ test.questions.length }} questions
            </p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-lg font-medium">{{ formattedTime }}</div>
            <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Questions List -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="space-y-8">
          <div v-for="(question, index) in test.questions" 
               :key="question.id"
               class="border rounded-lg p-6"
          >
            <p class="text-lg font-medium mb-4">
              {{ index + 1 }}. {{ question.text }}
            </p>
            <div class="space-y-3">
              <label 
                v-for="(option, optIndex) in question.options"
                :key="optIndex"
                class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                :class="{ 'border-primary bg-primary/5': question.selectedAnswer === optIndex }"
              >
                <input
                  type="radio"
                  :name="question.id"
                  :value="optIndex"
                  :checked="question.selectedAnswer === optIndex"
                  @change="handleAnswer(question.id, optIndex)"
                  class="text-primary focus:ring-primary"
                >
                <span>{{ option }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="p-6 border-t">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-600">
            {{ isComplete ? 'All questions answered' : 'Some questions are unanswered' }}
          </div>
          <button
            @click="handleSubmit"
            :disabled="!isComplete"
            :class="[
              'px-6 py-2 rounded-cta transition-colors',
              isComplete
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            ]"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  </div>
</template>