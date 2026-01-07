<script setup lang="ts">
const props = defineProps<{
  images: any;
}>();

// Limit photos to first 12
const displayPhotos = computed(() => {
  return props.images?.backdrops?.slice(0, 12) || [];
});
</script>

<template>
  <section class="mb-16 scroll-mt-20">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Photos</h2>
      <div class="h-0.5 w-16 bg-blue-600 dark:bg-blue-400 mt-2"></div>
    </div>

    <!-- Photo Gallery -->
    <div v-if="displayPhotos.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in displayPhotos"
        :key="index"
        class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
      >
        <div class="aspect-video overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
            :alt="`Movie photo ${index + 1}`"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>

    <!-- No Photos -->
    <div v-else class="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
      <svg class="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-slate-600 dark:text-slate-400">No photos available</p>
    </div>
  </section>
</template>
