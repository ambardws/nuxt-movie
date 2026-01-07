<script setup lang="ts">
defineProps<{
  casts: any;
}>();
</script>

<template>
  <section class="mb-16 scroll-mt-20">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Top Cast</h2>
      <div class="h-0.5 w-16 bg-blue-600 dark:bg-blue-400 mt-2"></div>
    </div>

    <!-- Cast Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="cast in casts"
        :key="cast.id"
        class="group"
      >
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all hover:shadow-lg">
          <!-- Photo -->
          <div class="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              v-if="cast.profile_path"
              :src="`https://image.tmdb.org/t/p/original${cast.profile_path}`"
              :alt="cast.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <!-- Default Avatar -->
            <div v-else class="flex h-full w-full items-center justify-center">
              <svg class="h-16 w-16 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>

          <!-- Info -->
          <div class="p-3">
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {{ cast.name }}
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 truncate">
              {{ cast.character }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
