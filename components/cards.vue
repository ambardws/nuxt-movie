<script setup lang="ts">
defineProps<{
  item: any;
}>();

// Extract year from release date
const getReleaseYear = (date: string) => {
  if (!date) return '';
  return new Date(date).getFullYear();
};
</script>

<template>
  <div class="movie-card group">
    <NuxtLink :to="{ path: `/movies/${item.id}` }" class="block">
      <!-- Card Container -->
      <div class="relative overflow-hidden rounded-xl bg-slate-800 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
        <!-- Movie Poster -->
        <div class="aspect-[2/3] overflow-hidden">
          <img
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
            :alt="item.title"
          />
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <!-- Rating Badge -->
        <div class="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1.5 backdrop-blur-sm">
          <svg class="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-sm font-bold text-white">{{ item.vote_average?.toFixed(1) || 'N/A' }}</span>
        </div>

        <!-- Hover Content -->
        <div class="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <h3 class="line-clamp-2 text-base font-semibold text-white drop-shadow-lg">
            {{ item.title }}
          </h3>
          <p v-if="item.release_date" class="mt-1 text-sm text-slate-300">
            {{ getReleaseYear(item.release_date) }}
          </p>
        </div>
      </div>

      <!-- Title Below Card -->
      <div class="mt-3">
        <h3 class="truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
          {{ item.title }}
        </h3>
        <p v-if="item.release_date" class="text-xs text-slate-500">
          {{ getReleaseYear(item.release_date) }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.movie-card {
  @apply relative;
}

/* Smooth fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.movie-card {
  animation: fadeIn 0.5s ease-out;
}
</style>
