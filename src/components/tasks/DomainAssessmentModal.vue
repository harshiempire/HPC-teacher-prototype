<script setup lang="ts">
import { ref, computed } from "vue";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import type { DomainActivity, DomainProficiencyLevel } from "@/types/tasks";

interface Props {
  show: boolean;
  task: {
    activity: string;
    description?: string;
    domainAssessment?: {
      status: "pending" | "reviewed";
    };
  };
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", activities: DomainActivity[]): void;
}>();

const proficiencyLevels: { value: DomainProficiencyLevel; label: string }[] = [
  { value: "not_at_all", label: "Not at all" },
  { value: "just_a_little", label: "Just a Little" },
  { value: "pretty_much", label: "Pretty Much" },
  { value: "very_much", label: "Very Much" },
];

const activities = ref<DomainActivity[]>([
  {
    id: "1",
    name: "Leadership",
    description: "Takes initiative and guides others effectively",
    studentAssessment: undefined,
    teacherAssessment: undefined,
  },
  {
    id: "2",
    name: "Communication",
    description: "Expresses ideas clearly and listens actively",
    studentAssessment: undefined,
    teacherAssessment: undefined,
  },
  {
    id: "3",
    name: "Teamwork",
    description: "Collaborates effectively with others",
    studentAssessment: undefined,
    teacherAssessment: undefined,
  },
  {
    id: "4",
    name: "Problem Solving",
    description: "Identifies and resolves challenges effectively",
    studentAssessment: undefined,
    teacherAssessment: undefined,
  },
  {
    id: "5",
    name: "Creativity",
    description: "Demonstrates original thinking and innovation",
    studentAssessment: undefined,
    teacherAssessment: undefined,
  },
]);

const isComplete = computed(() =>
  activities.value.every((activity) => activity.studentAssessment)
);

const handleSubmit = () => {
  if (!isComplete.value) return;
  emit("submit", activities.value);
};

const getLevelColor = (level?: DomainProficiencyLevel) => {
  const colors = {
    not_at_all: "bg-red-100 text-red-800",
    just_a_little: "bg-orange-100 text-orange-800",
    pretty_much: "bg-blue-100 text-blue-800",
    very_much: "bg-green-100 text-green-800",
  };
  return level ? colors[level] : "bg-gray-100 text-gray-800";
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold">
              Domain Assessment: {{ task.activity }}
            </h2>
            <p class="text-gray-600 mt-1">{{ task.description }}</p>
          </div>
          <button
            @click="emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Assessment Grid -->
        <div class="mb-8">
          <div class="grid grid-cols-[2fr,repeat(4,1fr)] gap-4 mb-4">
            <div class="font-medium">Activity</div>
            <div
              v-for="level in proficiencyLevels"
              :key="level.value"
              class="text-center text-sm font-medium"
            >
              {{ level.label }}
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="grid grid-cols-[2fr,repeat(4,1fr)] gap-4 items-center"
            >
              <div>
                <div class="font-medium">{{ activity.name }}</div>
                <div class="text-sm text-gray-600">
                  {{ activity.description }}
                </div>
              </div>

              <div
                v-for="level in proficiencyLevels"
                :key="level.value"
                class="flex justify-center"
              >
                <button
                  @click="activity.studentAssessment = level.value"
                  :class="[
                    'w-full h-12 rounded-lg border-2 transition-colors',
                    activity.studentAssessment === level.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50',
                  ]"
                >
                  <CheckCircleIcon
                    v-if="activity.studentAssessment === level.value"
                    class="h-6 w-6 mx-auto text-primary"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Teacher Assessment (if available) -->
        <div v-if="task.domainAssessment?.status === 'reviewed'" class="mb-8">
          <h3 class="text-lg font-medium mb-4">Assessment Comparison</h3>
          <div class="space-y-4">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="bg-gray-50 p-4 rounded-lg"
            >
              <div class="font-medium mb-2">{{ activity.name }}</div>
              <div class="flex items-center gap-8">
                <div>
                  <div class="text-sm text-gray-600 mb-1">Your Assessment:</div>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      getLevelColor(activity.studentAssessment),
                    ]"
                  >
                    {{
                      proficiencyLevels.find(
                        (l) => l.value === activity.studentAssessment
                      )?.label
                    }}
                  </span>
                </div>
                <div>
                  <div class="text-sm text-gray-600 mb-1">
                    Teacher Assessment:
                  </div>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      getLevelColor(activity.teacherAssessment),
                    ]"
                  >
                    {{
                      proficiencyLevels.find(
                        (l) => l.value === activity.teacherAssessment
                      )?.label
                    }}
                  </span>
                </div>
              </div>
            </div>
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
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            ]"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
