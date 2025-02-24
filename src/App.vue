<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <Sidebar />
    <Header />
    
    <main class="pl-64 pt-20">
      <RouterView />
    </main>
  </div>
</template>