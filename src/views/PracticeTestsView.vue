<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  PlusIcon, 
  ClockIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/outline'
import { practiceTests, addTest, updateTest } from '@/stores/tests'
import type { PracticeTest } from '@/types/tests'
import CreateTestModal from '@/components/tests/CreateTestModal.vue'
import TakeTestModal from '@/components/tests/TakeTestModal.vue'
import TestResultsModal from '@/components/tests/TestResultsModal.vue'

const showCreateModal = ref(false)
const showTakeTestModal = ref(false)
const showResultsModal = ref(false)
const selectedTest = ref<PracticeTest | null>(null)

const sortedTests = computed(() => {
  return [...practiceTests].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const handleCreateTest = (test: PracticeTest) => {
  addTest(test)
  showCreateModal.value = false
}

const openTest = (test: PracticeTest) => {
  selectedTest.value = test
  if (test.status === 'completed') {
    showResultsModal.value = true
  } else {
    showTakeTestModal.value = true
  }
}

const handleTestComplete = (test: PracticeTest) => {
  updateTest(test)
  showTakeTestModal.value = false
  showResultsModal.value = true
}

const getDifficultyDistribution = (test: PracticeTest) => {
  return [
    {
      type: 'easy',
      count: test.questionDistribution.easy,
      color: 'bg-green-100 text-green-800'
    },
    {
      type: 'medium',
      count: test.questionDistribution.medium,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      type: 'hard',
      count: test.questionDistribution.hard,
      color: 'bg-red-100 text-red-800'
    }
  ]
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Practice Tests</h1>
      <button
        @click="showCreateModal = true"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
      >
        <PlusIcon class="h-5 w-5" />
        <span>Create New Test</span>
      </button>
    </div>

    <!-- Test List -->
    <div v-if="sortedTests.length === 0" class="text-center py-12 bg-white rounded-card border border-border">
      <DocumentTextIcon class="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No tests yet</h3>
      <p class="text-gray-600">Create your first practice test to get started</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="test in sortedTests" 
           :key="test.id"
           class="bg-white rounded-card border border-border p-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <DocumentTextIcon class="h-5 w-5 text-primary" />
              <h3 class="text-lg font-medium">
                {{ test.subject }} - {{ test.chapters.join(', ') }}
              </h3>
            </div>

            <div class="flex items-center gap-6 text-sm text-gray-600 mb-3">
              <div class="flex items-center gap-1">
                <DocumentTextIcon class="h-4 w-4" />
                <span>{{ test.totalQuestions }} Questions</span>
              </div>
              <div class="flex items-center gap-1">
                <ClockIcon class="h-4 w-4" />
                <span>{{ test.timeLimit }} Minutes</span>
              </div>
              <div class="flex items-center gap-2">
                <AdjustmentsHorizontalIcon class="h-4 w-4" />
                <div class="flex gap-1">
                  <span 
                    v-for="dist in getDifficultyDistribution(test)"
                    :key="dist.type"
                    :class="['px-2 py-0.5 rounded-full text-xs font-medium', dist.color]"
                  >
                    {{ dist.count }} {{ dist.type }}
                  </span>
                </div>
              </div>
              <div>
                Created: {{ new Date(test.createdAt).toLocaleDateString() }}
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span 
                :class="[
                  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                  {
                    'bg-yellow-100 text-yellow-800': test.status === 'not_started',
                    'bg-blue-100 text-blue-800': test.status === 'in_progress',
                    'bg-green-100 text-green-800': test.status === 'completed'
                  }
                ]"
              >
                <component 
                  :is="test.status === 'completed' ? CheckCircleIcon : XCircleIcon"
                  class="h-4 w-4"
                />
                {{ test.status.replace('_', ' ').charAt(0).toUpperCase() + test.status.slice(1).replace('_', ' ') }}
              </span>

              <span v-if="test.score !== undefined" 
                    class="text-sm font-medium"
              >
                Score: {{ test.score }}/{{ test.totalQuestions }}
                ({{ Math.round((test.score / test.totalQuestions) * 100) }}%)
              </span>
            </div>
          </div>

          <button
            @click="openTest(test)"
            class="px-4 py-1.5 text-sm bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
          >
            {{ test.status === 'completed' ? 'View Results' : 'Start Test' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CreateTestModal
      v-if="showCreateModal"
      :show="showCreateModal"
      @close="showCreateModal = false"
      @create="handleCreateTest"
    />

    <TakeTestModal
      v-if="selectedTest && showTakeTestModal"
      :show="showTakeTestModal"
      :test="selectedTest"
      @close="showTakeTestModal = false"
      @complete="handleTestComplete"
    />

    <TestResultsModal
      v-if="selectedTest && showResultsModal"
      :show="showResultsModal"
      :test="selectedTest"
      @close="showResultsModal = false"
    />
  </div>
</template>