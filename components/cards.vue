<script setup lang="ts">
defineProps<{
  item: any;
}>();
</script>

<template>
  <div>
    <div
      class="card w-full bg-base-100 shadow-xl cursor-pointer hover:opacity-50"
    >
      <div
        class="absolute text-xs text-white bg-slate-600 opacity-75 p-1 rounded-br-md"
      >
        &#11088; {{ item.vote_average }}
      </div>
      <NuxtLink :to="{ path: `/movies/${item.id}` }">
        <figure>
          <img
            class="mx-auto rounded-md"
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
          />
        </figure>
      </NuxtLink>
    </div>
    <div
      class="text-white text-xs md:text-sm text-center p-1 cursor-pointer max-h-10 overflow-hidden"
    >
      {{ item.title }}
    </div>
  </div>
</template>
