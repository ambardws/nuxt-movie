<script setup lang="ts">
const { theme } = useTheme()

// Initialize theme on app mount
onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme

    // Remove default dark class
    document.documentElement.classList.remove('dark')

    // Add current theme class
    document.documentElement.classList.add(initialTheme)
    theme.value = initialTheme
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
