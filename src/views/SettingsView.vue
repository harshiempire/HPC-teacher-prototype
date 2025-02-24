<script setup lang="ts">
import { ref } from 'vue'
import {
  UserCircleIcon,
  KeyIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Settings sections
const sections = [
  { id: 'profile', name: 'Profile Settings', icon: UserCircleIcon },
  { id: 'security', name: 'Security', icon: KeyIcon },
  { id: 'accessibility', name: 'Accessibility', icon: EyeIcon },
  { id: 'support', name: 'Support & Help', icon: QuestionMarkCircleIcon }
]

const activeSection = ref('profile')

// Form states
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const accessibilitySettings = ref({
  fontSize: 'medium',
  contrast: 'normal',
  animations: true,
  screenReader: false
})

const supportForm = ref({
  subject: '',
  message: '',
  type: 'help'
})

// Success/Error states
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Handle password change
const handlePasswordChange = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showError.value = true
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  // Here you would typically make an API call to change the password
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }, 3000)
}

// Handle accessibility settings change
const saveAccessibilitySettings = () => {
  // Here you would typically save these settings to user preferences
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

// Handle support request
const submitSupportRequest = () => {
  // Here you would typically send the support request to backend
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
    supportForm.value = {
      subject: '',
      message: '',
      type: 'help'
    }
  }, 3000)
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">Settings</h1>

    <!-- Settings Navigation -->
    <div class="bg-white rounded-card border border-border p-6 mb-6">
      <div class="flex gap-4">
        <button 
          v-for="section in sections" 
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-cta transition-colors',
            activeSection === section.id 
              ? 'bg-primary text-white' 
              : 'bg-white text-gray-600 hover:bg-primary/5'
          ]"
        >
          <component :is="section.icon" class="h-5 w-5" />
          <span>{{ section.name }}</span>
        </button>
      </div>
    </div>

    <!-- Success Notification -->
    <div v-if="showSuccess" 
         class="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2"
    >
      <CheckIcon class="h-5 w-5" />
      <span>Changes saved successfully!</span>
    </div>

    <!-- Error Notification -->
    <div v-if="showError" 
         class="fixed top-4 right-4 bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2"
    >
      <XMarkIcon class="h-5 w-5" />
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Settings Content -->
    <div class="bg-white rounded-card border border-border p-6">
      <!-- Profile Settings -->
      <div v-if="activeSection === 'profile'" class="space-y-6">
        <h2 class="text-lg font-medium">Profile Settings</h2>
        <div class="max-w-2xl">
          <div class="flex items-center gap-6 mb-6">
            <div class="relative">
              <img 
                src="https://ui-avatars.com/api/?name=John+Doe" 
                alt="Profile Picture"
                class="h-24 w-24 rounded-full object-cover"
              >
              <label 
                class="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-border cursor-pointer hover:bg-gray-50"
              >
                <input type="file" accept="image/*" class="hidden">
                <ArrowPathIcon class="h-5 w-5 text-gray-600" />
              </label>
            </div>
            <div>
              <h3 class="font-medium">Profile Picture</h3>
              <p class="text-sm text-gray-600">Update your profile picture</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <input 
                type="text" 
                value="John Doe"
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div v-if="activeSection === 'security'" class="space-y-6">
        <h2 class="text-lg font-medium">Security Settings</h2>
        <div class="max-w-2xl">
          <form @submit.prevent="handlePasswordChange" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input 
                v-model="passwordForm.currentPassword"
                type="password" 
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input 
                v-model="passwordForm.newPassword"
                type="password" 
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input 
                v-model="passwordForm.confirmPassword"
                type="password" 
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              >
            </div>

            <button 
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      <!-- Accessibility Settings -->
      <div v-if="activeSection === 'accessibility'" class="space-y-6">
        <h2 class="text-lg font-medium">Accessibility Settings</h2>
        <div class="max-w-2xl space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
            <select 
              v-model="accessibilitySettings.fontSize"
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contrast</label>
            <select 
              v-model="accessibilitySettings.contrast"
              class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
            >
              <option value="normal">Normal</option>
              <option value="high">High Contrast</option>
            </select>
          </div>

          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium">Animations</div>
              <div class="text-sm text-gray-600">Enable or disable animations</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="accessibilitySettings.animations"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div class="flex items-center justify-between py-3">
            <div>
              <div class="font-medium">Screen Reader Support</div>
              <div class="text-sm text-gray-600">Enable enhanced screen reader support</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="accessibilitySettings.screenReader"
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <button 
            @click="saveAccessibilitySettings"
            class="px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
          >
            Save Accessibility Settings
          </button>
        </div>
      </div>

      <!-- Support & Help -->
      <div v-if="activeSection === 'support'" class="space-y-6">
        <h2 class="text-lg font-medium">Support & Help</h2>
        <div class="max-w-2xl">
          <form @submit.prevent="submitSupportRequest" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Request Type</label>
              <select 
                v-model="supportForm.type"
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
              >
                <option value="help">Help Request</option>
                <option value="suggestion">Suggestion</option>
                <option value="issue">Report Issue</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                v-model="supportForm.subject"
                type="text" 
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                v-model="supportForm.message"
                rows="4"
                class="w-full rounded-lg border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90 transition-colors"
            >
              Submit Request
            </button>
          </form>

          <!-- Help Resources -->
          <div class="mt-8">
            <h3 class="font-medium mb-4">Help Resources</h3>
            <div class="space-y-2">
              <a href="#" class="flex items-center gap-2 text-primary hover:underline">
                <DocumentTextIcon class="h-5 w-5" />
                <span>User Guide</span>
              </a>
              <a href="#" class="flex items-center gap-2 text-primary hover:underline">
                <QuestionMarkCircleIcon class="h-5 w-5" />
                <span>FAQs</span>
              </a>
              <a href="#" class="flex items-center gap-2 text-primary hover:underline">
                <DocumentTextIcon class="h-5 w-5" />
                <span>Platform Guidelines</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>