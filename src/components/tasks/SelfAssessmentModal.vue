<script setup lang="ts">
import { ref, computed } from "vue";
import {
  XMarkIcon,
  CloudArrowUpIcon,
  DocumentIcon,
} from "@heroicons/vue/24/outline";
import type {
  ProficiencyLevel,
  Evidence,
  ProficiencyRubric,
} from "@/types/tasks";

interface Props {
  show: boolean;
  task: {
    activity: string;
  };
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    data: {
      proficiencyLevel: ProficiencyLevel;
      evidence: Evidence[];
      reflection: string;
    }
  ): void;
}>();

const selectedLevel = ref<ProficiencyLevel>("Hobby");
const reflection = ref("");
const files = ref<Evidence[]>([]);
const uploadError = ref("");

const rubrics: ProficiencyRubric[] = [
  {
    level: "Hobby",
    description: "Basic proficiency in the activity",
    requirements: [
      "Regular participation in the activity",
      "Basic understanding of fundamentals",
      "Ability to perform basic tasks",
    ],
    evidenceRequired: false,
  },
  {
    level: "Proficient",
    description: "Intermediate skill level with consistent practice",
    requirements: [
      "Active participation and dedication",
      "Good understanding of techniques",
      "Ability to perform intermediate tasks independently",
    ],
    evidenceRequired: false,
  },
  {
    level: "Competition",
    description: "Advanced skill level with achievement records",
    requirements: [
      "Participation in competitions or exhibitions",
      "Advanced mastery of techniques",
      "Recognition or awards in the field",
    ],
    evidenceRequired: true,
  },
];

const selectedRubric = computed(() =>
  rubrics.find((r) => r.level === selectedLevel.value)
);

const isEvidenceRequired = computed(
  () => selectedRubric.value?.evidenceRequired ?? false
);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "application/pdf",
  ];

  if (file.size > maxSize) {
    uploadError.value = "File size should be less than 5MB";
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    uploadError.value = "Only images, videos, and PDFs are allowed";
    return;
  }

  uploadError.value = "";

  // In a real application, you would upload the file to a server here
  // For now, we'll just create a mock evidence object
  const evidence: Evidence = {
    id: Date.now().toString(),
    fileUrl: URL.createObjectURL(file),
    fileType: file.type,
    fileName: file.name,
  };

  files.value.push(evidence);
};

const removeFile = (id: string) => {
  files.value = files.value.filter((f) => f.id !== id);
};

const handleSubmit = () => {
  if (isEvidenceRequired.value && files.value.length === 0) {
    uploadError.value = "Please upload required evidence for Competition level";
    return;
  }

  emit("submit", {
    proficiencyLevel: selectedLevel.value,
    evidence: files.value,
    reflection: reflection.value,
  });
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold">
            Self Assessment: {{ task.activity }}
          </h2>
          <button
            @click="emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Proficiency Level Selection -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">
            Select Your Proficiency Level
          </h3>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="rubric in rubrics"
              :key="rubric.level"
              @click="selectedLevel = rubric.level"
              :class="[
                'p-4 border rounded-lg cursor-pointer transition-colors',
                selectedLevel === rubric.level
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50',
              ]"
            >
              <h4 class="font-medium mb-2">{{ rubric.level }}</h4>
              <p class="text-sm text-gray-600 mb-3">{{ rubric.description }}</p>
              <ul class="text-sm text-gray-500 space-y-1">
                <li
                  v-for="req in rubric.requirements"
                  :key="req"
                  class="flex items-start gap-2"
                >
                  <span class="text-primary">•</span>
                  <span>{{ req }}</span>
                </li>
              </ul>
              <div
                v-if="rubric.evidenceRequired"
                class="mt-3 text-sm text-primary"
              >
                * Requires evidence upload
              </div>
            </div>
          </div>
        </div>

        <!-- Evidence Upload -->
        <div v-if="isEvidenceRequired" class="mb-8">
          <h3 class="text-lg font-medium mb-4">Upload Evidence</h3>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              accept="image/*,video/*,.pdf"
              class="hidden"
              id="file-upload"
              @change="handleFileUpload"
            />
            <label
              for="file-upload"
              class="flex flex-col items-center justify-center cursor-pointer"
            >
              <CloudArrowUpIcon class="h-12 w-12 text-gray-400" />
              <p class="mt-2 text-sm text-gray-600">Click to upload files</p>
              <p class="text-xs text-gray-500">
                Images, videos, or PDFs (max 5MB)
              </p>
            </label>
          </div>

          <div v-if="uploadError" class="mt-2 text-sm text-red-600">
            {{ uploadError }}
          </div>

          <!-- Uploaded Files -->
          <div v-if="files.length > 0" class="mt-4 space-y-2">
            <div
              v-for="file in files"
              :key="file.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <DocumentIcon class="h-5 w-5 text-gray-400" />
                <span class="text-sm text-gray-600">{{ file.fileName }}</span>
              </div>
              <button
                @click="removeFile(file.id)"
                class="text-gray-400 hover:text-red-500"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Reflection -->
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-4">Your Reflection</h3>
          <textarea
            v-model="reflection"
            rows="4"
            placeholder="Share your thoughts about your progress and experience..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            @click="handleSubmit"
            class="px-6 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
          >
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
