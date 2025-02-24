<script setup lang="ts">
import { ref, computed } from "vue";
import TaskList from "../components/tasks/TaskList.vue";
import {
  scholasticTasks,
  coScholasticTasks,
  taskStatusMap,
  coScholasticStatusMap,
  taskTypeMap,
  coScholasticCategoryMap,
} from "../stores/tasks";
import type {
  TaskStatus,
  TaskType,
  CoScholasticStatus,
  CoScholasticCategory,
} from "../types/tasks";

const activeTab = ref<"scholastic" | "co-scholastic">("scholastic");

// Create proper Ref types for filters
const scholasticStatusFilter = ref<TaskStatus | "all">("all");
const coScholasticStatusFilter = ref<CoScholasticStatus | "all">("all");
const scholasticTypeFilter = ref<TaskType | "all">("all");
const coScholasticTypeFilter = ref<CoScholasticCategory | "all">("all");

const currentStatusMap = computed(() =>
  activeTab.value === "scholastic" ? taskStatusMap : coScholasticStatusMap
);

const currentTypeMap = computed<Record<string, { label: string; icon: string }>>(() => {
  return activeTab.value === 'scholastic' 
    ? taskTypeMap
    : coScholasticCategoryMap
});

// Type-safe computed properties for current filters
const statusFilter = computed(() =>
  activeTab.value === "scholastic"
    ? scholasticStatusFilter.value
    : coScholasticStatusFilter.value
);

const typeFilter = computed(() =>
  activeTab.value === "scholastic"
    ? scholasticTypeFilter.value
    : coScholasticTypeFilter.value
);

// Handler functions with proper type casting
const handleStatusChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (activeTab.value === "scholastic") {
    scholasticStatusFilter.value = value as TaskStatus | "all";
  } else {
    coScholasticStatusFilter.value = value as CoScholasticStatus | "all";
  }
};

const handleTypeChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (activeTab.value === "scholastic") {
    scholasticTypeFilter.value = value as TaskType | "all";
  } else {
    coScholasticTypeFilter.value = value as CoScholasticCategory | "all";
  }
};

const switchTab = (tab: "scholastic" | "co-scholastic") => {
  activeTab.value = tab;
  if (tab === "scholastic") {
    scholasticStatusFilter.value = "all";
    scholasticTypeFilter.value = "all";
  } else {
    coScholasticStatusFilter.value = "all";
    coScholasticTypeFilter.value = "all";
  }
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">My Tasks</h1>

    <!-- Main Tabs -->
    <div class="flex gap-4 mb-6">
      <button
        @click="switchTab('scholastic')"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === 'scholastic'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-600 hover:bg-primary/5',
        ]"
      >
        Scholastic
      </button>
      <button
        @click="switchTab('co-scholastic')"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === 'co-scholastic'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-600 hover:bg-primary/5',
        ]"
      >
        Co-Scholastic
      </button>
    </div>

    <!-- Filters -->
    <div class="flex gap-4 mb-6">
      <!-- Status Filter -->
      <select
        :value="statusFilter"
        @input="handleStatusChange"
        class="px-4 py-2 rounded-cta border border-border bg-white text-gray-600 focus:outline-none focus:border-primary"
      >
        <option value="all">All Status</option>
        <option
          v-for="(status, key) in currentStatusMap"
          :key="key"
          :value="key"
        >
          {{ status.label }}
        </option>
      </select>

      <!-- Type Filter -->
      <select
        :value="typeFilter"
        @input="handleTypeChange"
        class="px-4 py-2 rounded-cta border border-border bg-white text-gray-600 focus:outline-none focus:border-primary"
      >
        <option value="all">All Types</option>
        <option v-for="(type, key) in currentTypeMap" :key="key" :value="key">
          {{ type.label }}
        </option>
      </select>
    </div>

    <!-- Task Lists -->
    <TaskList
      v-if="activeTab === 'scholastic'"
      :tasks="scholasticTasks"
      type="scholastic"
      :status-filter="statusFilter"
      :type-filter="scholasticTypeFilter"
      current-user-id="user1"
    />
    <TaskList
      v-else
      :tasks="coScholasticTasks"
      type="co-scholastic"
      :status-filter="statusFilter"
      :type-filter="coScholasticTypeFilter"
      current-user-id="user1"
    />
  </div>
</template>
