<script setup lang="ts">
const props = defineProps<{
  images: any;
}>();
</script>
<template>
  <h1 class="text-white text-2xl text-center">Photos</h1>
  <div class="flex mt-3 p-5 overflow-x-auto">
    <img
      v-for="image in images.backdrops"
      class="mx-auto sm:w-3/4 lg:w-2/4 px-5"
      loading="lazy"
      :src="`https://image.tmdb.org/t/p/original${image.file_path}`"
    />
  </div>
</template>
