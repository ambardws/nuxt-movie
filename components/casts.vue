<script setup lang="ts">
defineProps<{
  casts: any;
}>();
</script>

<template>
  <section class="mb-16 scroll-mt-20" id="cast">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Top Cast</h2>
      <div class="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
    </div>

    <!-- Cast Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <div
        v-for="cast in casts"
        :key="cast.id"
        class="group relative"
      >
        <div class="relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
          <!-- Cast Photo -->
          <div class="aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
            <img
              v-if="cast.profile_path"
              :src="`https://image.tmdb.org/t/p/original${cast.profile_path}`"
              :alt="cast.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <!-- Default Avatar -->
            <div v-else class="flex h-full w-full items-center justify-center">
              <div class="flex flex-col items-center gap-3">
                <svg class="h-20 w-20 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          <!-- Cast Info -->
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-sm font-semibold text-white truncate drop-shadow-lg">
              {{ cast.name }}
            </h3>
            <p class="text-xs text-slate-400 truncate mt-1">
              {{ cast.character }}
            </p>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
            <div class="text-white">
              <p class="text-xs text-purple-200 mb-1">Played</p>
              <p class="text-sm font-semibold truncate">{{ cast.character }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

section > div > div {
  animation: fadeInUp 0.6s ease-out forwards;
}

section > div > div:nth-child(1) { animation-delay: 0.1s; }
section > div > div:nth-child(2) { animation-delay: 0.15s; }
section > div > div:nth-child(3) { animation-delay: 0.2s; }
section > div > div:nth-child(4) { animation-delay: 0.25s; }
section > div > div:nth-child(5) { animation-delay: 0.3s; }
section > div > div:nth-child(6) { animation-delay: 0.35s; }
</style>
