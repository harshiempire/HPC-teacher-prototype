<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  GlobeAltIcon,
  BookOpenIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  DocumentIcon,
  PlayCircleIcon,
  MusicalNoteIcon,
  PhotoIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'
import ResourceModal from '@/components/library/ResourceModal.vue'
import type {    ResourceType } from '@/types/contentLibrary'

interface Resource {
  id: string
  title: string
  type: ResourceType
  format: string
  likes: number
  url: string
  views: number
  uploadedAt: string
  uploadedBy?: string
  school?: string
  date?: string
}

const activeTab = ref('global')
const activeSubject = ref('all')
const activeChapter = ref('all')
const activeCategory = ref('all')
const sortBy = ref('recent')
const searchQuery = ref('')

// Modal state
const showModal = ref(false)
const selectedResource = ref<Resource | null>(null)

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'Social Studies',
  'Hindi'
]

const categories = [
  'Fine Arts',
  'Music',
  'Dance',
  'Theatre',
  'Visual Arts'
]

const resourceTypes: Record<ResourceType, { icon: any; color: string }> = {
  textbook: { icon: BookOpenIcon, color: 'bg-blue-100 text-blue-800' },
  worksheet: { icon: DocumentTextIcon, color: 'bg-green-100 text-green-800' },
  video: { icon: PlayCircleIcon, color: 'bg-red-100 text-red-800' },
  audio: { icon: MusicalNoteIcon, color: 'bg-purple-100 text-purple-800' },
  image: { icon: PhotoIcon, color: 'bg-yellow-100 text-yellow-800' },
  document: { icon: DocumentIcon, color: 'bg-gray-100 text-gray-800' },
  workbook: { icon: DocumentTextIcon, color: 'bg-green-100 text-green-800' },
  flashcard: { icon: DocumentTextIcon, color: 'bg-orange-100 text-orange-800' },
  mindmap: { icon: DocumentTextIcon, color: 'bg-purple-100 text-purple-800' },
  simulation: { icon: DocumentTextIcon, color: 'bg-indigo-100 text-indigo-800' },
  podcast: { icon: MusicalNoteIcon, color: 'bg-pink-100 text-pink-800' }
}

const globalContent: Resource[] = [
  {
    id: '1',
    title: 'Advanced Mathematics Concepts',
    type: 'document',
    uploadedBy: 'John Smith',
    school: 'Delhi Public School',
    date: '2025-03-01',
    likes: 156,
    format: 'PDF',
    url: 'https://example.com/math.pdf',
    views: 245,
    uploadedAt: '2025-03-01'
  },
  {
    id: '2',
    title: 'Science Experiment Videos',
    type: 'video',
    uploadedBy: 'Sarah Johnson',
    school: 'St. Marys School',
    date: '2025-02-28',
    likes: 234,
    format: 'MP4',
    url: 'https://example.com/science.mp4',
    views: 567,
    uploadedAt: '2025-02-28'
  },
  {
    id: '3',
    title: 'English Literature Notes',
    type: 'document',
    uploadedBy: 'Robert Wilson',
    school: 'Modern School',
    date: '2025-02-25',
    likes: 89,
    format: 'PDF',
    url: 'https://example.com/english.pdf',
    views: 123,
    uploadedAt: '2025-02-25'
  }
]

const scholasticContent: Record<string, Record<string, Resource[]>> = {
  Mathematics: {
    'Algebra': [
      {
        id: '1',
        title: 'Quadratic Equations',
        type: 'textbook',
        format: 'PDF',
        likes: 45,
        url: 'https://example.com/quadratic.pdf',
        views: 234,
        uploadedAt: '2025-03-01'
      },
      {
        id: '2',
        title: 'Algebra Practice',
        type: 'worksheet',
        format: 'PDF',
        likes: 32,
        url: 'https://example.com/algebra.pdf',
        views: 189,
        uploadedAt: '2025-03-01'
      }
    ],
    'Geometry': [
      {
        id: '3',
        title: 'Circle Theorems',
        type: 'video',
        format: 'MP4',
        likes: 78,
        url: 'https://example.com/circle.mp4',
        views: 456,
        uploadedAt: '2025-03-01'
      }
    ]
  },
  Science: {
    'Chemistry': [
      {
        id: '4',
        title: 'Periodic Table',
        type: 'image',
        format: 'JPG',
        likes: 92,
        url: 'https://example.com/periodic.jpg',
        views: 678,
        uploadedAt: '2025-03-01'
      }
    ],
    'Physics': [
      {
        id: '5',
        title: 'Motion Laws',
        type: 'video',
        format: 'MP4',
        likes: 67,
        url: 'https://example.com/motion.mp4',
        views: 345,
        uploadedAt: '2025-03-01'
      }
    ]
  }
}

const empowermentContent: Record<string, Record<string, Resource[]>> = {
  'Fine Arts': {
    'Drawing': [
      {
        id: '1',
        title: 'Basic Sketching',
        type: 'video',
        format: 'MP4',
        likes: 123,
        url: 'https://example.com/sketch.mp4',
        views: 789,
        uploadedAt: '2025-03-01'
      }
    ],
    'Painting': [
      {
        id: '2',
        title: 'Watercolor Techniques',
        type: 'document',
        format: 'PDF',
        likes: 89,
        url: 'https://example.com/watercolor.pdf',
        views: 567,
        uploadedAt: '2025-03-01'
      }
    ]
  },
  'Music': {
    'Classical': [
      {
        id: '3',
        title: 'Raag Introduction',
        type: 'audio',
        format: 'MP3',
        likes: 156,
        url: 'https://example.com/raag.mp3',
        views: 234,
        uploadedAt: '2025-03-01'
      }
    ]
  }
}

const getChapters = (subject: string) => {
  return Object.keys(scholasticContent[subject as keyof typeof scholasticContent] || {})
}

const sortedGlobalContent = computed(() => {
  let sorted = [...globalContent]
  if (sortBy.value === 'likes') {
    sorted.sort((a, b) => b.likes - a.likes)
  } else {
    sorted.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
  }
  return sorted
})

const handleLike = (contentId: string) => {
  // Here you would typically make an API call to update likes
  console.log('Liked content:', contentId)
}

const openResource = (resource: Resource) => {
  selectedResource.value = resource
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedResource.value = null
}

const handleModalLike = (resourceId: string) => {
  handleLike(resourceId)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Content Library</h1>

    <!-- Main Navigation -->
    <div class="flex gap-4 mb-6">
      <button 
        v-for="tab in ['global', 'scholastic', 'empowerment']"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'flex items-center gap-2 px-6 py-2 rounded-cta font-medium transition-colors',
          activeTab === tab 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        <component :is="{
          global: GlobeAltIcon,
          scholastic: BookOpenIcon,
          empowerment: SparklesIcon
        }[tab]" class="h-5 w-5" />
        <span>{{ tab.charAt(0).toUpperCase() + tab.slice(1) }}</span>
      </button>
    </div>

    <!-- Global Content -->
    <div v-if="activeTab === 'global'" class="space-y-6">
      <div class="bg-white rounded-card border border-border p-6">
        <!-- Search and Sort -->
        <div class="flex items-center justify-between mb-6">
          <div class="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search resources..."
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            >
          </div>
          <div class="flex items-center gap-4">
            <button 
              @click="sortBy = 'recent'"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                sortBy === 'recent' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              ]"
            >
              <ClockIcon class="h-5 w-5" />
              <span>Recent</span>
            </button>
            <button 
              @click="sortBy = 'likes'"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                sortBy === 'likes' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
              ]"
            >
              <HeartIcon class="h-5 w-5" />
              <span>Most Liked</span>
            </button>
          </div>
        </div>

        <!-- Content List -->
        <div class="space-y-4">
          <div v-for="content in sortedGlobalContent" 
               :key="content.id"
               class="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div class="flex items-start gap-4">
              <div :class="[
                'p-2 rounded-lg',
                resourceTypes[content.type as keyof typeof resourceTypes].color
              ]">
                <component 
                  :is="resourceTypes[content.type as keyof typeof resourceTypes].icon" 
                  class="h-6 w-6"
                />
              </div>
              <div>
                <h3 class="font-medium">{{ content.title }}</h3>
                <div class="text-sm text-gray-600">
                  Uploaded by {{ content.uploadedBy }} from {{ content.school }}
                </div>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{{ content.date ? new Date(content.date).toLocaleDateString() : 'N/A' }}</span>
                  <button 
                    @click="handleLike(content.id)"
                    class="flex items-center gap-1 text-red-600"
                  >
                    <HeartIcon class="h-4 w-4" />
                    <span>{{ content.likes }}</span>
                  </button>
                </div>
              </div>
            </div>
            <button 
              @click="openResource(content)"
              class="flex items-center gap-1 text-primary hover:text-primary/80"
            >
              <ArrowTopRightOnSquareIcon class="h-5 w-5" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Scholastic Content -->
    <div v-if="activeTab === 'scholastic'" class="space-y-6">
      <!-- Subject and Chapter Selection -->
      <div class="bg-white rounded-card border border-border p-6">
        <div class="flex items-center gap-6">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select 
              v-model="activeSubject"
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="all">All Subjects</option>
              <option v-for="subject in subjects" :key="subject" :value="subject">
                {{ subject }}
              </option>
            </select>
          </div>
          <div class="flex-1" v-if="activeSubject !== 'all'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
            <select 
              v-model="activeChapter"
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="all">All Chapters</option>
              <option v-for="chapter in getChapters(activeSubject)" :key="chapter" :value="chapter">
                {{ chapter }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div class="bg-white rounded-card border border-border p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="(chapters, subject) in scholasticContent" :key="subject">
            <template v-if="activeSubject === 'all' || activeSubject === subject">
              <template v-for="(resources, chapter) in chapters" :key="chapter">
                <template v-if="activeChapter === 'all' || activeChapter === chapter">
                  <div v-for="resource in resources" 
                       :key="resource.id"
                       class="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div class="flex items-start gap-3">
                      <div :class="[
                        'p-2 rounded-lg',
                        resourceTypes[resource.type as keyof typeof resourceTypes].color
                      ]">
                        <component 
                          :is="resourceTypes[resource.type as keyof typeof resourceTypes].icon" 
                          class="h-6 w-6"
                        />
                      </div>
                      <div class="flex-1">
                        <h3 class="font-medium">{{ resource.title }}</h3>
                        <div class="text-sm text-gray-600 mt-1">
                          {{ subject }} - {{ chapter }}
                        </div>
                        <div class="flex items-center justify-between mt-2">
                          <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {{ resource.format }}
                          </span>
                          <button 
                            @click="handleLike(resource.id)"
                            class="flex items-center gap-1 text-red-600 text-sm"
                          >
                            <HeartIcon class="h-4 w-4" />
                            <span>{{ resource.likes }}</span>
                          </button>
                        </div>
                        <button 
                          @click="openResource(resource)"
                          class="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                        >
                          <ArrowTopRightOnSquareIcon class="h-5 w-5" />
                          <span>View Resource</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- Empowerment Content -->
    <div v-if="activeTab === 'empowerment'" class="space-y-6">
      <!-- Category Selection -->
      <div class="bg-white rounded-card border border-border p-6">
        <div class="flex items-center gap-6">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              v-model="activeCategory"
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="all">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div class="bg-white rounded-card border border-border p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="(topics, category) in empowermentContent" :key="category">
            <template v-if="activeCategory === 'all' || activeCategory === category">
              <template v-for="(resources, topic) in topics" :key="topic">
                <div v-for="resource in resources" 
                     :key="resource.id"
                     class="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'p-2 rounded-lg',
                      resourceTypes[resource.type as keyof typeof resourceTypes].color
                    ]">
                      <component 
                        :is="resourceTypes[resource.type as keyof typeof resourceTypes].icon" 
                        class="h-6 w-6"
                      />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-medium">{{ resource.title }}</h3>
                      <div class="text-sm text-gray-600 mt-1">
                        {{ category }} - {{ topic }}
                      </div>
                      <div class="flex items-center justify-between mt-2">
                        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {{ resource.format }}
                        </span>
                        <button 
                          @click="handleLike(resource.id)"
                          class="flex items-center gap-1 text-red-600 text-sm"
                        >
                          <HeartIcon class="h-4 w-4" />
                          <span>{{ resource.likes }}</span>
                        </button>
                      </div>
                      <button 
                        @click="openResource(resource)"
                        class="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                      >
                        <ArrowTopRightOnSquareIcon class="h-5 w-5" />
                        <span>View Resource</span>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- Resource Modal -->
    <ResourceModal
      v-if="selectedResource"
      :show="showModal"
      :resource="selectedResource"
      @close="closeModal"
      @like="handleModalLike"
    />
  </div>
</template>