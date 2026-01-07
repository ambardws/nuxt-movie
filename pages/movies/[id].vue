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
    <Photos :images="images" />
    <Casts :casts="director.cast" />
    <Footer />
  </div>
</template>
