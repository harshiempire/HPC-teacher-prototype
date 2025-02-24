<script setup lang="ts">
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { Task, Competency,  CompetencyAssessment } from '@/types/tasks'

const props = defineProps<{
  task: Task
  show: boolean
  mode: 'self' | 'peer' | 'teacher'
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', assessment: CompetencyAssessment): void
}>()

// Initialize competencies with the rubric structure
const competencies = ref<Competency[]>([
  {
    id: '1',
    name: 'Understanding of Concepts',
    weightage: 30,
    taxonomyLevel: 'Understand',
    parameters: [
      {
        id: '1-1',
        name: 'Core Concepts',
        levels: [
          { 
            level: 1, 
            marks: 6, 
            description: 'Shows minimal understanding of core concepts'
          },
          { 
            level: 2, 
            marks: 12, 
            description: 'Demonstrates basic understanding of main concepts'
          },
          { 
            level: 3, 
            marks: 18, 
            description: 'Shows thorough understanding and can explain concepts clearly'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Application of Knowledge',
    weightage: 40,
    taxonomyLevel: 'Apply',
    parameters: [
      {
        id: '2-1',
        name: 'Problem Application',
        levels: [
          { 
            level: 1, 
            marks: 8, 
            description: 'Limited application of concepts to solve problems'
          },
          { 
            level: 2, 
            marks: 16, 
            description: 'Can apply concepts to solve standard problems'
          },
          { 
            level: 3, 
            marks: 24, 
            description: 'Effectively applies concepts to solve complex problems'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Critical Analysis',
    weightage: 30,
    taxonomyLevel: 'Analyze',
    parameters: [
      {
        id: '3-1',
        name: 'Analysis Depth',
        levels: [
          { 
            level: 1, 
            marks: 6, 
            description: 'Basic analysis with limited depth'
          },
          { 
            level: 2, 
            marks: 12, 
            description: 'Good analysis with some insights'
          },
          { 
            level: 3, 
            marks: 18, 
            description: 'Deep analysis with meaningful insights'
          }
        ]
      }
    ]
  }
])

const selectedLevels = ref<Record<string, Record<string, number>>>({})
const comments = ref('')

// Initialize selected levels if assessment exists
const initializeAssessment = () => {
  if (!props.task.scholasticAssessment) return

  let assessment: CompetencyAssessment | undefined

  switch (props.mode) {
    case 'self':
      assessment = props.task.scholasticAssessment.selfAssessment
      break
    case 'peer':
      assessment = props.task.scholasticAssessment.peerAssessment
      break
    case 'teacher':
      assessment = props.task.scholasticAssessment.teacherAssessment
      break
  }

  if (assessment) {
    selectedLevels.value = assessment.competencies
    comments.value = assessment.comments || ''
  }
}

// Calculate total marks (only visible to teachers)
const totalMarks = computed(() => {
  if (props.mode !== 'teacher') return null
  
  let total = 0
  for (const competencyId in selectedLevels.value) {
    const competency = competencies.value.find(c => c.id === competencyId)
    if (!competency) continue

    for (const parameterId in selectedLevels.value[competencyId]) {
      const parameter = competency.parameters.find(p => p.id === parameterId)
      if (!parameter) continue

      const selectedLevel = selectedLevels.value[competencyId][parameterId]
      const level = parameter.levels.find(l => l.level === selectedLevel)
      if (level) {
        total += level.marks
      }
    }
  }
  return total
})

const isComplete = computed(() => {
  for (const competency of competencies.value) {
    if (!selectedLevels.value[competency.id]) return false
    for (const parameter of competency.parameters) {
      if (!selectedLevels.value[competency.id][parameter.id]) return false
    }
  }
  return true
})

const handleLevelSelect = (competencyId: string, parameterId: string, level: number) => {
  if (!selectedLevels.value[competencyId]) {
    selectedLevels.value[competencyId] = {}
  }
  selectedLevels.value[competencyId][parameterId] = level
}

const handleSubmit = () => {
  if (!isComplete.value) return

  emit('submit', {
    competencies: selectedLevels.value,
    comments: comments.value
  })
}

// Initialize on mount
initializeAssessment()
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto m-4">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold">
              {{ mode === 'self' ? 'Self Assessment' : mode === 'peer' ? 'Peer Review' : 'Teacher Assessment' }}:
              {{ task.title }}
            </h2>
            <p class="text-gray-600 mt-1">{{ task.description }}</p>
          </div>
          <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Assessment Grid -->
        <div class="border rounded-lg overflow-hidden mb-8">
          <!-- Header -->
          <div class="grid grid-cols-[2fr,1fr,1fr,3fr,1fr] gap-4 bg-gray-50 p-4 border-b">
            <div class="font-medium text-gray-700">Criterion</div>
            <div class="font-medium text-gray-700">Taxonomy Level</div>
            <div class="font-medium text-gray-700">Weightage</div>
            <div class="font-medium text-gray-700">Level Selection</div>
            <div class="font-medium text-gray-700">Comments</div>
          </div>

          <!-- Competencies -->
          <div class="divide-y">
            <div v-for="competency in competencies" 
                 :key="competency.id"
                 class="grid grid-cols-[2fr,1fr,1fr,3fr,1fr] gap-4 p-4">
              <div>
                <h3 class="font-medium">{{ competency.name }}</h3>
              </div>
              <div class="text-green-600">{{ competency.taxonomyLevel }}</div>
              <div>{{ competency.weightage }}%</div>
              <div class="space-y-3">
                <div v-for="parameter in competency.parameters" 
                     :key="parameter.id">
                  <div class="space-y-2">
                    <label v-for="level in parameter.levels" 
                           :key="level.level" 
                           class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        :name="`${competency.id}-${parameter.id}`"
                        :value="level.level"
                        :checked="selectedLevels[competency.id]?.[parameter.id] === level.level"
                        @change="handleLevelSelect(competency.id, parameter.id, level.level)"
                        class="text-primary focus:ring-primary"
                      >
                      <div>
                        <div class="font-medium">Level {{ level.level }}</div>
                        <div class="text-sm text-gray-600">{{ level.description }}</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <textarea 
                  v-model="comments"
                  rows="3"
                  class="w-full p-2 border rounded-lg text-sm"
                  placeholder="Add specific feedback..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Marks (only visible to teachers) -->
        <div v-if="mode === 'teacher'" class="flex items-center justify-between mb-8">
          <div class="text-lg">
            Total Marks: <span class="font-medium">{{ totalMarks }}</span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
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
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>