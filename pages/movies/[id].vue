<script setup lang="ts">
import type { Movie } from "~/types";
const route = useRoute();
const id = route.params.id;

const item: Movie = await $fetch(`/api/movies/detail/${id}`);

interface Director {
  crew: [];
  cast: [];
}

interface Images {
  backdrops: [];
}

const images: Images = await $fetch(`/api/movies/images/${item.id}`);

const director: Director = await $fetch(`/api/movies/credits/${item.id}`);

const directing = director.crew.filter((data: any) => {
  return data.job === "Director";
});

// Set page meta
useHead({
  title: `${item.title} - MovieFlix`,
  meta: [
    { name: 'description', content: item.overview?.substring(0, 160) }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Hero Section with Dramatic Backdrop -->
    <div class="relative">
      <!-- Backdrop Image with Gradient Overlay -->
      <div class="relative h-[70vh] min-h-[600px] overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
          }"
        />
        <!-- Multi-layer Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

        <!-- Content -->
        <div class="relative z-10 h-full flex items-end px-6 pb-12 md:px-12 lg:px-16">
          <div class="w-full max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-8 items-end">
              <!-- Poster -->
              <div class="hidden lg:block flex-shrink-0">
                <div class="relative w-64 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 group">
                  <img
                    :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
                    :alt="item.title"
                    class="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <!-- Title and Info -->
              <div class="flex-1 text-white">
                <!-- Title -->
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
                  {{ item.title }}
                </h1>

                <!-- Tagline -->
                <p v-if="item.tagline" class="text-lg md:text-xl text-purple-400 italic mb-6 font-light">
                  "{{ item.tagline }}"
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-4 text-sm md:text-base mb-6">
                  <!-- Rating -->
                  <div class="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
                    <svg class="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold">{{ item.voteAverage?.toFixed(1) }}</span>
                    <span class="text-slate-400">/10</span>
                  </div>

                  <!-- Release Date -->
                  <div v-if="item.releaseDate" class="text-slate-300">
                    {{ new Date(item.releaseDate).getFullYear() }}
                  </div>

                  <!-- Runtime -->
                  <div v-if="item.runtime" class="text-slate-300">
                    {{ Math.floor(item.runtime / 60) }}h {{ item.runtime % 60 }}m
                  </div>

                  <!-- Genres -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="genre in item.genres"
                      :key="genre.id"
                      class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm border border-purple-500/30"
                    >
                      {{ genre.name }}
                    </span>
                  </div>
                </div>

                <!-- Overview Preview -->
                <p class="text-slate-300 text-base md:text-lg line-clamp-3 mb-6 max-w-3xl">
                  {{ item.overview }}
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-4">
                  <ModalPlayTrailer :item-id="item.id" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="px-6 py-12 md:px-12 lg:px-16">
      <div class="max-w-7xl mx-auto">
        <!-- Movie Details -->
        <Detail :item="item" :directing="directing" />

        <!-- Photos Gallery -->
        <Photos :images="images" />

        <!-- Cast Section -->
        <Casts :casts="director.cast" />
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
:deep(::-webkit-scrollbar) {
  width: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: #0f172a;
}

:deep(::-webkit-scrollbar-thumb) {
  background: #334155;
  border-radius: 4px;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background: #475569;
}
</style>
