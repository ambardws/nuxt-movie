<script setup lang="ts">
import type { Movie } from "~/types";
const route = useRoute();
const id = route.params.id;
const config = useRuntimeConfig();
const item: Movie = await $fetch(
  `${config.public.API_BASE_URL}/${id}?api_key=${config.public.API_KEY}`
);

interface Director {
  crew: [];
  cast: [];
}

const director: Director = await $fetch(
  `${config.public.API_BASE_URL}/${item.id}/credits?api_key=${config.public.API_KEY}`
);

const directing = director.crew.filter((data: any) => {
  return data.job === "Director";
});
</script>
<template>
  <div class="container max-w-full">
    <div
      class="hero min-h-screen bg-base-200 text-white opacity-95"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }"
    >
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">{{ item.title }}</h1>
          <p class="py-6">
            {{ item.overview }}
          </p>
          <ModalPlayTrailer :item-id="item.id" />
        </div>
      </div>
    </div>
    <Detail :item="item" :directing="directing" />
    <Casts :casts="director.cast" />
    <Footer />
  </div>
</template>
