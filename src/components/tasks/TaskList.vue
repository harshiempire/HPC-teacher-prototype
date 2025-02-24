<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  DocumentTextIcon, 
  BeakerIcon, 
  RocketLaunchIcon, 
  AcademicCapIcon,
  PaintBrushIcon,
  FolderIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
  HandRaisedIcon
} from '@heroicons/vue/24/outline'
import type { Task, CoScholasticTask, TaskStatus, TaskType, CoScholasticCategory, CoScholasticStatus, Evidence, ProficiencyLevel, DomainActivity, CompetencyAssessment } from '@/types/tasks'
import { taskStatusMap, coScholasticStatusMap, taskTypeMap, coScholasticCategoryMap, domainTypeMap } from '@/stores/tasks'
import SelfAssessmentModal from './SelfAssessmentModal.vue'
import DomainAssessmentModal from './DomainAssessmentModal.vue'
import ScholasticAssessmentModal from './ScholasticAssessmentModal.vue'

const props = defineProps<{
  tasks: Task[] | CoScholasticTask[]
  type: 'scholastic' | 'co-scholastic'
  statusFilter: TaskStatus | CoScholasticStatus | 'all'
  typeFilter: TaskType | CoScholasticCategory | 'all'
  currentUserId: string
}>()

const selectedTask = ref<Task | CoScholasticTask | null>(null)
const showAssessmentModal = ref(false)
const showDomainModal = ref(false)
const showScholasticModal = ref(false)
const assessmentMode = ref<'self' | 'peer' | 'teacher'>('self')

const isScholastic = computed(() => props.type === 'scholastic')

// Type guard functions
const isTaskType = (task: Task | CoScholasticTask): task is Task => {
  return 'title' in task && 'type' in task
}

const isCoScholasticTaskType = (task: Task | CoScholasticTask | null): task is CoScholasticTask => {
  return task !== null && 'activity' in task && 'category' in task
}

// Check if the current user is assigned for peer review
const isAssignedForPeerReview = (task: Task | CoScholasticTask): boolean => {
  if (!isTaskType(task)) return false
  return task.scholasticAssessment?.assignedPeerReviewerId === props.currentUserId
}

// Check if the current user is the task owner
const isTaskOwner = (task: Task | CoScholasticTask): boolean => {
  if (!isTaskType(task)) return false
  return task.userId === props.currentUserId
}

// Check if the task has been self-assessed by the owner
const hasSelfAssessment = (task: Task | CoScholasticTask): boolean => {
  if (!isTaskType(task)) return false
  return task.scholasticAssessment?.selfAssessment !== undefined
}

// Check if the task has been peer-reviewed
const hasPeerReview = (task: Task | CoScholasticTask): boolean => {
  if (!isTaskType(task)) return false
  return task.scholasticAssessment?.peerAssessment !== undefined
}

// Determine if the assessment button should be shown
const showAssessmentButton = (task: Task | CoScholasticTask): boolean => {
  if (!isTaskType(task)) return true // Always show for co-scholastic tasks
  
  if (!task.scholasticAssessment) {
    return isTaskOwner(task) // Only task owner can start assessment
  }

  if (isTaskOwner(task)) {
    // Task owner can only do self-assessment if not done yet
    return !hasSelfAssessment(task)
  } else {
    // Non-owners can only do peer review if assigned
    return isAssignedForPeerReview(task) && !hasPeerReview(task)
  }
}

// Get the assessment status text
const getAssessmentStatus = (task: Task | CoScholasticTask) => {
  if (!isTaskType(task)) return null
  if (!task.scholasticAssessment) return null

  if (isTaskOwner(task)) {
    // Status for task owner
    if (hasSelfAssessment(task)) {
      if (hasPeerReview(task)) {
        return {
          label: 'Peer Reviewed - Awaiting Teacher Review',
          color: 'bg-purple-100 text-purple-800'
        }
      }
      return {
        label: 'Self Reviewed - Awaiting Peer Review',
        color: 'bg-blue-100 text-blue-800'
      }
    }
    return {
      label: 'Self Assessment Pending',
      color: 'bg-yellow-100 text-yellow-800'
    }
  } else {
    // Status for peer reviewer
    if (isAssignedForPeerReview(task)) {
      if (hasPeerReview(task)) {
        return {
          label: 'Peer Review Completed',
          color: 'bg-green-100 text-green-800'
        }
      }
      return {
        label: 'Peer Review Pending',
        color: 'bg-yellow-100 text-yellow-800'
      }
    }
  }

  return null
}

// Get the button text based on assessment status and user role
const getAssessmentButtonText = (task: Task | CoScholasticTask): string => {
  if (!isTaskType(task)) {
    return isCoScholasticTaskType(task) && task.category === 'fine_arts' ? 'Self Assessment' : 'Domain Assessment'
  }

  if (!task.scholasticAssessment) return 'Start Self Assessment'

  if (isTaskOwner(task)) {
    if (!hasSelfAssessment(task)) {
      return 'Complete Self Assessment'
    }
    return 'View Assessment'
  } else if (isAssignedForPeerReview(task)) {
    if (!hasPeerReview(task)) {
      return 'Complete Peer Review'
    }
    return 'View Your Review'
  }

  return 'View Assessment'
}

const filteredTasks = computed(() => {
  let filtered = [...props.tasks]
  
  if (props.statusFilter !== 'all') {
    filtered = filtered.filter(task => task.status === props.statusFilter)
  }
  
  if (props.typeFilter !== 'all') {
    if (isScholastic.value) {
      filtered = filtered.filter((task) => isTaskType(task) && task.type === props.typeFilter)
    } else {
      filtered = filtered.filter((task) => isCoScholasticTaskType(task) && task.category === props.typeFilter)
    }
  }
  
  return filtered
})

// Separate tasks into owned and assigned for peer review
const groupedTasks = computed(() => {
  if (!isScholastic.value) return { owned: filteredTasks.value, assigned: [] }

  const tasks = filteredTasks.value as Task[]
  return {
    owned: tasks.filter(task => isTaskOwner(task)),
    assigned: tasks.filter(task => isAssignedForPeerReview(task))
  }
})

const getStatusColor = (status: TaskStatus | CoScholasticStatus) => {
  if (isScholastic.value) {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800',
      green: 'bg-green-100 text-green-800',
      orange: 'bg-orange-100 text-orange-800'
    }
    return colors[taskStatusMap[status as TaskStatus].color]
  } else {
    const colors = {
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    }
    return colors[coScholasticStatusMap[status as CoScholasticStatus].color]
  }
}

const getTypeIcon = (task: Task | CoScholasticTask) => {
  const icons = {
    DocumentTextIcon,
    BeakerIcon,
    RocketLaunchIcon,
    AcademicCapIcon,
    PaintBrushIcon,
    FolderIcon,
    TrophyIcon,
    HeartIcon,
    SparklesIcon,
    StarIcon,
    UserGroupIcon,
    HandRaisedIcon
  }
  
  if (isScholastic.value) {
    return icons[taskTypeMap[(task as Task).type].icon as keyof typeof icons]
  } else {
    const coScholasticTask = task as CoScholasticTask
    if (coScholasticTask.category === 'domains' && coScholasticTask.domainType) {
      return icons[domainTypeMap[coScholasticTask.domainType].icon as keyof typeof icons]
    }
    return icons[coScholasticCategoryMap[coScholasticTask.category].icon as keyof typeof icons]
  }
}

const getTypeLabel = (task: Task | CoScholasticTask) => {
  if (isScholastic.value) {
    return taskTypeMap[(task as Task).type].label
  } else {
    const coScholasticTask = task as CoScholasticTask
    if (coScholasticTask.category === 'domains' && coScholasticTask.domainType) {
      return domainTypeMap[coScholasticTask.domainType].label
    }
    return coScholasticCategoryMap[coScholasticTask.category].label
  }
}

const getStatusLabel = (status: TaskStatus | CoScholasticStatus) => {
  if (isScholastic.value) {
    return taskStatusMap[status as TaskStatus].label
  } else {
    return coScholasticStatusMap[status as CoScholasticStatus].label
  }
}

const openAssessment = (task: Task | CoScholasticTask) => {
  selectedTask.value = task
  if (isScholastic.value) {
    const scholasticTask = task as Task
    showScholasticModal.value = true
    
    if (!scholasticTask.scholasticAssessment) {
      assessmentMode.value = 'self'
    } else if (isTaskOwner(scholasticTask)) {
      assessmentMode.value = 'self' // For viewing their own assessment
    } else if (isAssignedForPeerReview(scholasticTask)) {
      assessmentMode.value = 'peer'
    }
  } else {
    const coScholasticTask = task as CoScholasticTask
    if (coScholasticTask.category === 'fine_arts') {
      showAssessmentModal.value = true
    } else if (coScholasticTask.category === 'domains') {
      showDomainModal.value = true
    }
  }
}

const handleScholasticAssessmentSubmit = (assessment: CompetencyAssessment) => {
  if (selectedTask.value && isScholastic.value) {
    const task = selectedTask.value as Task
    
    if (!task.scholasticAssessment) {
      task.scholasticAssessment = {
        competencies: [],
        status: 'self_assessment_pending'
      }
    }

    if (isTaskOwner(task)) {
      // Self assessment
      task.scholasticAssessment.selfAssessment = assessment
      task.scholasticAssessment.status = 'peer_review_pending'
      task.status = 'in_progress'
      task.scholasticAssessment.submittedAt = new Date().toISOString()
    } else if (isAssignedForPeerReview(task)) {
      // Peer review
      task.scholasticAssessment.peerAssessment = assessment
      task.scholasticAssessment.status = 'teacher_review_pending'
      task.scholasticAssessment.peerReviewedAt = new Date().toISOString()
    }

    showScholasticModal.value = false
    selectedTask.value = null
  }
}

const handleAssessmentSubmit = (data: {
  proficiencyLevel: ProficiencyLevel
  evidence: Evidence[]
  reflection: string
}) => {
  if (selectedTask.value && !isScholastic.value) {
    const task = selectedTask.value as CoScholasticTask
    
    task.proficiencyLevel = data.proficiencyLevel
    task.evidence = data.evidence.map(e => e.fileUrl)
    task.reflection = data.reflection
    
    if (data.proficiencyLevel === 'Competition') {
      if (data.evidence.length > 0) {
        task.assessmentStatus = 'pending'
        task.status = 'not_completed'
      } else {
        task.assessmentStatus = undefined
        task.status = 'not_completed'
      }
    } else {
      task.status = 'completed'
      task.assessmentStatus = 'approved'
    }
    
    showAssessmentModal.value = false
    selectedTask.value = null
  }
}

const handleDomainAssessmentSubmit = (activities: DomainActivity[]) => {
  if (selectedTask.value && !isScholastic.value) {
    const task = selectedTask.value as CoScholasticTask
    
    task.domainAssessment = {
      activities,
      status: 'pending',
      submittedAt: new Date().toISOString()
    }
    
    showDomainModal.value = false
    selectedTask.value = null
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Tasks owned by the current user -->
    <div v-if="isScholastic && groupedTasks.owned.length > 0">
      <h2 class="text-lg font-medium mb-4">My Tasks</h2>
      <div class="space-y-4">
        <div v-for="task in groupedTasks.owned" :key="task.id" 
             class="bg-white rounded-card border border-border p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <component 
                  :is="getTypeIcon(task)"
                  class="h-5 w-5 text-primary"
                />
                <h3 class="text-lg font-medium">{{ isTaskType(task) ? task.title : (task as CoScholasticTask).activity }}</h3>
              </div>
              
              <p class="text-gray-600 mb-3">
                {{ isTaskType(task) ? `${task.subject} - ${getTypeLabel(task)}` : getTypeLabel(task) }}
              </p>
              
              <div v-if="isTaskType(task)" class="flex items-center gap-4 text-sm text-gray-500">
                <div>
                  Start: {{ new Date(task.startDate).toLocaleDateString() }}
                </div>
                <div>
                  Due: {{ new Date(task.endDate).toLocaleDateString() }}
                </div>
              </div>
              
              <p v-if="task.description" class="mt-3 text-sm text-gray-600">
                {{ task.description }}
              </p>

              <div v-if="isTaskType(task) && getAssessmentStatus(task)" class="mt-3">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getAssessmentStatus(task)?.color
                  ]"
                >
                  {{ getAssessmentStatus(task)?.label }}
                </span>
              </div>
            </div>
            
            <div class="flex flex-col items-end gap-2">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  getStatusColor(task.status)
                ]"
              >
                {{ getStatusLabel(task.status) }}
              </span>

              <button
                v-if="showAssessmentButton(task)"
                @click="openAssessment(task)"
                class="px-4 py-1.5 text-sm bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
              >
                {{ getAssessmentButtonText(task) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tasks assigned for peer review -->
    <div v-if="isScholastic && groupedTasks.assigned.length > 0">
      <h2 class="text-lg font-medium mb-4">Assigned for Peer Review</h2>
      <div class="space-y-4">
        <div v-for="task in groupedTasks.assigned" :key="task.id" 
             class="bg-white rounded-card border border-border p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <component 
                  :is="getTypeIcon(task)"
                  class="h-5 w-5 text-primary"
                />
                <h3 class="text-lg font-medium">{{ task.title }}</h3>
              </div>
              
              <p class="text-gray-600 mb-3">
                {{ task.subject }} - {{ getTypeLabel(task) }}
              </p>
              
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <div>
                  Start: {{ new Date(task.startDate).toLocaleDateString() }}
                </div>
                <div>
                  Due: {{ new Date(task.endDate).toLocaleDateString() }}
                </div>
              </div>
              
              <p v-if="task.description" class="mt-3 text-sm text-gray-600">
                {{ task.description }}
              </p>

              <div v-if="getAssessmentStatus(task)" class="mt-3">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getAssessmentStatus(task)?.color
                  ]"
                >
                  {{ getAssessmentStatus(task)?.label }}
                </span>
              </div>
            </div>
            
            <div class="flex flex-col items-end gap-2">
              <button
                v-if="showAssessmentButton(task)"
                @click="openAssessment(task)"
                class="px-4 py-1.5 text-sm bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
              >
                {{ getAssessmentButtonText(task) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Co-scholastic tasks -->
    <div v-if="!isScholastic" class="space-y-4">
      <div v-for="task in filteredTasks" :key="task.id" 
           class="bg-white rounded-card border border-border p-6">
        <!-- Existing co-scholastic task template -->
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <component 
                :is="getTypeIcon(task)"
                class="h-5 w-5 text-primary"
              />
              <h3 class="text-lg font-medium">
                {{ (task as CoScholasticTask).activity }}
              </h3>
            </div>
            
            <p class="text-gray-600 mb-3">{{ getTypeLabel(task) }}</p>
            
            <div class="mt-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ (task as CoScholasticTask).proficiencyLevel }}
              </span>
              <div v-if="(task as CoScholasticTask).evidence?.length" class="text-sm text-primary mt-2">
                Evidence uploaded
              </div>
            </div>
            
            <p v-if="task.description" class="mt-3 text-sm text-gray-600">
              {{ task.description }}
            </p>

            <div class="mt-3">
              <template v-if="(task as CoScholasticTask).category === 'fine_arts'">
                <span v-if="(task as CoScholasticTask).assessmentStatus"
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    {
                      'bg-yellow-100 text-yellow-800': (task as CoScholasticTask).assessmentStatus === 'pending',
                      'bg-blue-100 text-blue-800': (task as CoScholasticTask).assessmentStatus === 'reviewed',
                      'bg-green-100 text-green-800': (task as CoScholasticTask).assessmentStatus === 'approved'
                    }
                  ]"
                >
                  Assessment: {{ (task as CoScholasticTask).assessmentStatus }}
                </span>
              </template>
              <template v-else-if="(task as CoScholasticTask).category === 'domains'">
                <span v-if="(task as CoScholasticTask).domainAssessment"
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    {
                      'bg-yellow-100 text-yellow-800': (task as CoScholasticTask).domainAssessment!.status === 'pending',
                      'bg-blue-100 text-blue-800': (task as CoScholasticTask).domainAssessment!.status === 'reviewed'
                    }
                  ]"
                >
                  Assessment: {{ (task as CoScholasticTask).domainAssessment!.status }}
                </span>
              </template>
            </div>
          </div>
          
          <div class="flex flex-col items-end gap-2">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getStatusColor(task.status)
              ]"
            >
              {{ getStatusLabel(task.status) }}
            </span>

            <button
              @click="openAssessment(task)"
              class="px-4 py-1.5 text-sm bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
            >
              {{ (task as CoScholasticTask).category === 'fine_arts' ? 'Self Assessment' : 'Domain Assessment' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ScholasticAssessmentModal
      v-if="selectedTask && isScholastic"
      :task="selectedTask as Task"
      :show="showScholasticModal"
      :mode="assessmentMode"
      @close="showScholasticModal = false"
      @submit="handleScholasticAssessmentSubmit"
    />
    
    <SelfAssessmentModal
      v-if="selectedTask && isCoScholasticTaskType(selectedTask) && selectedTask.category === 'fine_arts'"
      :task="selectedTask as CoScholasticTask"
      :show="showAssessmentModal"
      @close="showAssessmentModal = false"
      @submit="handleAssessmentSubmit"
    />
    
    <DomainAssessmentModal
      v-if="selectedTask && isCoScholasticTaskType(selectedTask) && selectedTask.category === 'domains'"
      :task="selectedTask as CoScholasticTask"
      :show="showDomainModal"
      @close="showDomainModal = false"
      @submit="handleDomainAssessmentSubmit"
    />
  </div>
</template>