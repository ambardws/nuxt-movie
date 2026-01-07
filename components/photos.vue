<script setup lang="ts">
const props = defineProps<{
  images: any;
}>();

// Limit photos to first 12 for better performance
const displayPhotos = computed(() => {
  return props.images?.backdrops?.slice(0, 12) || [];
});
</script>

<template>
  <section class="mb-16 scroll-mt-20" id="photos">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Photos</h2>
      <div class="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
    </div>

    <!-- Photo Gallery - Masonry Grid -->
    <div v-if="displayPhotos.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in displayPhotos"
        :key="index"
        class="group relative overflow-hidden rounded-2xl cursor-pointer"
        :class="[
          index === 0 ? 'md:col-span-2 md:row-span-2' : '',
          index === 3 ? 'md:col-span-2' : ''
        ]"
      >
        <div class="relative h-64 md:h-full overflow-hidden bg-slate-900">
          <img
            :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
            :alt="`Movie photo ${index + 1}`"
            loading="lazy"
            class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <!-- Zoom Icon on Hover -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div class="transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Photos Message -->
    <div v-else class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-slate-800">
      <svg class="mx-auto h-20 w-20 text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-slate-400 text-lg">No photos available</p>
    </div>
  </section>
</template>

<style scoped>
/* Smooth animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

section > div > div {
  animation: fadeIn 0.6s ease-out forwards;
}

section > div > div:nth-child(1) { animation-delay: 0.1s; }
section > div > div:nth-child(2) { animation-delay: 0.15s; }
section > div > div:nth-child(3) { animation-delay: 0.2s; }
section > div > div:nth-child(4) { animation-delay: 0.25s; }
section > div > div:nth-child(5) { animation-delay: 0.3s; }
section > div > div:nth-child(6) { animation-delay: 0.35s; }
section > div > div:nth-child(7) { animation-delay: 0.4s; }
section > div > div:nth-child(8) { animation-delay: 0.45s; }
section > div > div:nth-child(9) { animation-delay: 0.5s; }
section > div > div:nth-child(10) { animation-delay: 0.55s; }
section > div > div:nth-child(11) { animation-delay: 0.6s; }
section > div > div:nth-child(12) { animation-delay: 0.65s; }
</style>
