<script setup lang="ts">
import { ref } from 'vue'
import { 
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  AcademicCapIcon,
  HeartIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

interface ProfileData {
  personal: {
    name: string
    rollNumber: string
    dateOfBirth: string
    gender: string
    profilePicture?: string
  }
  contact: {
    phone: string
    email: string
    address: string
  }
  family: {
    parentName: string
    relationship: string
    parentContact: string
    parentEmail: string
  }
  school: {
    class: string
    section: string
    admissionNumber: string
    academicYear: string
  }
  health: {
    bloodGroup: string
    medicalConditions: string[]
    allergies: string[]
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
  }
}

const profile = ref<ProfileData>({
  personal: {
    name: 'John Doe',
    rollNumber: '2023001',
    dateOfBirth: '2010-05-15',
    gender: 'Male',
    profilePicture: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  contact: {
    phone: '+91 9876543210',
    email: 'john.doe@example.com',
    address: '123 Main Street, City, State - 123456'
  },
  family: {
    parentName: 'Robert Doe',
    relationship: 'Father',
    parentContact: '+91 9876543211',
    parentEmail: 'robert.doe@example.com'
  },
  school: {
    class: 'X',
    section: 'A',
    admissionNumber: 'ADM2023001',
    academicYear: '2024-25'
  },
  health: {
    bloodGroup: 'O+',
    medicalConditions: ['None'],
    allergies: ['Dust'],
    emergencyContact: {
      name: 'Robert Doe',
      relationship: 'Father',
      phone: '+91 9876543211'
    }
  }
})

const editMode = ref<Record<string, boolean>>({
  contact: false,
  health: false
})

const tempData = ref<Partial<ProfileData>>({})

const activeTab = ref('personal')

const tabs = [
  { id: 'personal', name: 'Personal Information', icon: UserCircleIcon },
  { id: 'contact', name: 'Contact Information', icon: PhoneIcon },
  { id: 'family', name: 'Family Information', icon: UserCircleIcon },
  { id: 'school', name: 'School Information', icon: AcademicCapIcon },
  { id: 'health', name: 'Health Information', icon: HeartIcon }
]

const startEdit = (section: string) => {
  tempData.value = JSON.parse(JSON.stringify(profile.value))
  editMode.value[section] = true
}

const cancelEdit = (section: string) => {
  editMode.value[section] = false
}

const saveChanges = (section: string) => {
  if (section === 'contact') {
    profile.value.contact = tempData.value.contact as ProfileData['contact']
  } else if (section === 'health') {
    profile.value.health = tempData.value.health as ProfileData['health']
  }
  editMode.value[section] = false
}

const handleProfilePicture = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        profile.value.personal.profilePicture = e.target.result as string
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-6">My Profile</h1>

    <!-- Profile Picture -->
    <div class="bg-white rounded-card border border-border p-6 mb-6">
      <div class="flex items-center gap-6">
        <div class="relative">
          <img 
            :src="profile.personal.profilePicture" 
            alt="Profile Picture"
            class="h-32 w-32 rounded-full object-cover"
          >
          <label 
            class="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-border cursor-pointer hover:bg-gray-50"
          >
            <input 
              type="file" 
              accept="image/*" 
              class="hidden"
              @change="handleProfilePicture"
            >
            <PencilSquareIcon class="h-5 w-5 text-gray-600" />
          </label>
        </div>
        <div>
          <h2 class="text-xl font-medium">{{ profile.personal.name }}</h2>
          <p class="text-gray-600">{{ profile.school.class }} - {{ profile.school.section }}</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 mb-6">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-6 py-2 rounded-cta font-medium transition-colors flex items-center gap-2',
          activeTab === tab.id 
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-primary/5'
        ]"
      >
        <component :is="tab.icon" class="h-5 w-5" />
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-card border border-border p-6">
      <!-- Personal Information Tab -->
      <div v-if="activeTab === 'personal'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Name</div>
            <div class="font-medium">{{ profile.personal.name }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Roll Number</div>
            <div class="font-medium">{{ profile.personal.rollNumber }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Date of Birth</div>
            <div class="font-medium">{{ new Date(profile.personal.dateOfBirth).toLocaleDateString() }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Gender</div>
            <div class="font-medium">{{ profile.personal.gender }}</div>
          </div>
        </div>
      </div>

      <!-- Contact Information Tab -->
      <div v-if="activeTab === 'contact'" class="space-y-4">
        <div class="flex items-center justify-end mb-4">
          <div v-if="!editMode.contact">
            <button 
              @click="startEdit('contact')"
              class="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-cta"
            >
              <PencilSquareIcon class="h-5 w-5" />
              <span>Edit</span>
            </button>
          </div>
          <div v-else class="flex items-center gap-2">
            <button 
              @click="saveChanges('contact')"
              class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90"
            >
              <CheckIcon class="h-5 w-5" />
              <span>Save</span>
            </button>
            <button 
              @click="cancelEdit('contact')"
              class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-cta"
            >
              <XMarkIcon class="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <PhoneIcon class="h-5 w-5 text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-600">Phone Number</div>
              <div v-if="!editMode.contact" class="font-medium">
                {{ profile.contact.phone }}
              </div>
              <input 
                v-else
                v-model="tempData.contact!.phone"
                type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              >
            </div>
          </div>

          <div class="flex items-center gap-3">
            <EnvelopeIcon class="h-5 w-5 text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-600">Email</div>
              <div v-if="!editMode.contact" class="font-medium">
                {{ profile.contact.email }}
              </div>
              <input 
                v-else
                v-model="tempData.contact!.email"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              >
            </div>
          </div>

          <div class="flex items-center gap-3">
            <HomeIcon class="h-5 w-5 text-gray-400" />
            <div class="flex-1">
              <div class="text-sm text-gray-600">Address</div>
              <div v-if="!editMode.contact" class="font-medium">
                {{ profile.contact.address }}
              </div>
              <textarea 
                v-else
                v-model="tempData.contact!.address"
                rows="2"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Family Information Tab -->
      <div v-if="activeTab === 'family'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Parent/Guardian Name</div>
            <div class="font-medium">{{ profile.family.parentName }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Relationship</div>
            <div class="font-medium">{{ profile.family.relationship }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Contact Number</div>
            <div class="font-medium">{{ profile.family.parentContact }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Email</div>
            <div class="font-medium">{{ profile.family.parentEmail }}</div>
          </div>
        </div>
      </div>

      <!-- School Information Tab -->
      <div v-if="activeTab === 'school'" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">Class</div>
            <div class="font-medium">{{ profile.school.class }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Section</div>
            <div class="font-medium">{{ profile.school.section }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Admission Number</div>
            <div class="font-medium">{{ profile.school.admissionNumber }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600">Academic Year</div>
            <div class="font-medium">{{ profile.school.academicYear }}</div>
          </div>
        </div>
      </div>

      <!-- Health Information Tab -->
      <div v-if="activeTab === 'health'" class="space-y-4">
        <div class="flex items-center justify-end mb-4">
          <div v-if="!editMode.health">
            <button 
              @click="startEdit('health')"
              class="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/5 rounded-cta"
            >
              <PencilSquareIcon class="h-5 w-5" />
              <span>Edit</span>
            </button>
          </div>
          <div v-else class="flex items-center gap-2">
            <button 
              @click="saveChanges('health')"
              class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-cta hover:bg-primary/90"
            >
              <CheckIcon class="h-5 w-5" />
              <span>Save</span>
            </button>
            <button 
              @click="cancelEdit('health')"
              class="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-cta"
            >
              <XMarkIcon class="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <div class="text-sm text-gray-600">Blood Group</div>
            <div v-if="!editMode.health" class="font-medium">
              {{ profile.health.bloodGroup }}
            </div>
            <input 
              v-else
              v-model="tempData.health!.bloodGroup"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            >
          </div>

          <div>
            <div class="text-sm text-gray-600">Medical Conditions</div>
            <div v-if="!editMode.health" class="font-medium">
              {{ profile.health.medicalConditions.join(', ') || 'None' }}
            </div>
            <input 
              v-else
              v-model="tempData.health!.medicalConditions"
              type="text"
              placeholder="Separate multiple conditions with commas"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            >
          </div>

          <div>
            <div class="text-sm text-gray-600">Allergies</div>
            <div v-if="!editMode.health" class="font-medium">
              {{ profile.health.allergies.join(', ') || 'None' }}
            </div>
            <input 
              v-else
              v-model="tempData.health!.allergies"
              type="text"
              placeholder="Separate multiple allergies with commas"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            >
          </div>

          <div>
            <div class="text-sm text-gray-600 mb-2">Emergency Contact</div>
            <div v-if="!editMode.health" class="space-y-2">
              <div class="font-medium">{{ profile.health.emergencyContact.name }}</div>
              <div class="text-gray-600">{{ profile.health.emergencyContact.relationship }}</div>
              <div class="text-gray-600">{{ profile.health.emergencyContact.phone }}</div>
            </div>
            <div v-else class="space-y-2">
              <input 
                v-model="tempData.health!.emergencyContact.name"
                type="text"
                placeholder="Contact Name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              >
              <input 
                v-model="tempData.health!.emergencyContact.relationship"
                type="text"
                placeholder="Relationship"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              >
              <input 
                v-model="tempData.health!.emergencyContact.phone"
                type="tel"
                placeholder="Phone Number"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>