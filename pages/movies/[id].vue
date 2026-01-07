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
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- Hero Section -->
    <div class="relative border-b border-slate-300 dark:border-slate-800">
      <!-- Backdrop -->
      <div class="relative h-[55vh] min-h-[450px] overflow-hidden">
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
          }"
        />
        <!-- Gradient Overlay - lighter for visibility -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-50/95 via-slate-50/70 dark:from-slate-950/95 dark:via-slate-950/70 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50/90 dark:from-slate-950/90 via-slate-50/30 dark:via-slate-950/30 to-transparent" />

        <!-- Content -->
        <div class="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
          <div class="w-full max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-8 items-center lg:items-end">
              <!-- Poster -->
              <div class="flex-shrink-0">
                <div class="relative w-48 md:w-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
                  <img
                    :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
                    :alt="item.title"
                    class="w-full object-cover"
                  />
                </div>
              </div>

              <!-- Title and Info -->
              <div class="flex-1 text-center lg:text-left">
                <!-- Title -->
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3">
                  {{ item.title }}
                </h1>

                <!-- Tagline -->
                <p v-if="item.tagline" class="text-base md:text-lg text-blue-600 dark:text-blue-400 italic mb-4 font-medium">
                  "{{ item.tagline }}"
                </p>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm mb-4">
                  <!-- Rating -->
                  <div class="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border-2 border-slate-200 dark:border-slate-700 shadow-sm">
                    <svg class="h-4 w-4 fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-slate-900 dark:text-white">{{ item.vote_average?.toFixed(1) }}</span>
                  </div>

                  <!-- Release Date -->
                  <div v-if="item.release_date" class="text-slate-700 dark:text-slate-400 font-medium">
                    {{ new Date(item.release_date).getFullYear() }}
                  </div>

                  <!-- Runtime -->
                  <div v-if="item.runtime" class="text-slate-700 dark:text-slate-400 font-medium">
                    {{ Math.floor(item.runtime / 60) }}h {{ item.runtime % 60 }}m
                  </div>
                </div>

                <!-- Genres -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
                  <span
                    v-for="genre in item.genres"
                    :key="genre.id"
                    class="px-4 py-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full text-sm border-2 border-slate-200 dark:border-slate-700 font-medium shadow-sm"
                  >
                    {{ genre.name }}
                  </span>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap justify-center lg:justify-start gap-3">
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
