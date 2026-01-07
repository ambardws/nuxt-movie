<script lang="ts" setup>
import { useTheme } from '~/composables/useTheme';

const { theme, toggleTheme } = useTheme()

// Mobile sidebar state
const isSidebarOpen = ref(false)

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  // Prevent body scroll when sidebar is open
  if (process.client) {
    if (isSidebarOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

// Close sidebar
const closeSidebar = () => {
  isSidebarOpen.value = false
  if (process.client) {
    document.body.style.overflow = ''
  }
}

// Navigation links
const navLinks = [
  { to: '/', label: 'Popular' },
  { to: '/nowplaying', label: 'Now Playing' },
  { to: '/toprated', label: 'Top Rated' },
  { to: '/upcoming', label: 'Upcoming' },
]
</script>

<template>
  <div>
    <!-- Modern Header -->
    <header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 font-bold text-xl hover:opacity-70 transition-opacity">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
              <IconMovieIcon height="20" width="20" class="text-white dark:text-slate-900" alt="logo" />
            </div>
            <span class="hidden sm:inline bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">MovieFlix</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center gap-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
              active-class="text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <!-- Right Actions -->
          <div class="flex items-center gap-2">
            <!-- Theme Toggle -->
            <button
              @click="toggleTheme"
              class="hidden sm:inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all"
              :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <!-- Sun Icon -->
              <svg
                v-if="theme === 'dark'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <!-- Moon Icon -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleSidebar"
              class="lg:hidden relative inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Sidebar Drawer -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
        @click="closeSidebar"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isSidebarOpen"
        class="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-white dark:bg-slate-950 shadow-2xl lg:hidden flex flex-col"
      >
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div class="flex items-center gap-2.5 font-bold text-xl">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-white">
              <IconMovieIcon height="20" width="20" class="text-white dark:text-slate-900" alt="logo" />
            </div>
            <span class="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">MovieFlix</span>
          </div>
          <button
            @click="closeSidebar"
            class="rounded-lg p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex-1 overflow-y-auto px-4 py-6">
          <div class="space-y-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              @click="closeSidebar"
              class="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all"
              active-class="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white font-semibold"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div class="border-t border-slate-200 dark:border-slate-800 px-6 py-4">
          <button
            @click="toggleTheme(); closeSidebar()"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
          >
            <span class="flex items-center gap-3">
              <svg
                v-if="theme === 'dark'"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <span>{{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
            </span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* Remove DaisyUI active class */
:deep(.active) {
  @unset all;
}
</style>
