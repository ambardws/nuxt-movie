<script setup lang="ts">
defineProps<{
  casts: any;
}>();
</script>

<template>
  <h1 class="text-slate-300 text-2xl text-center mt-5">Casts</h1>
  <div class="p-5 flex flex-row overflow-x-auto">
    <div v-for="cast in casts" class="px-3 basis-1/4">
      <div class="bg-slate-500 min-h-[225px] w-[150px] rounded-md">
        <img
          v-if="cast.profile_path"
          class="rounded-md"
          loading="lazy"
          alt="no-image"
          :src="`https://image.tmdb.org/t/p/original${cast.profile_path}`"
        />
        <IconUserIcon
          class="rounded-md h-[225px] w-[150px] pl-"
          loading="lazy"
          v-if="!cast.profile_path"
        />
      </div>
      <div
        class="text-slate-300 text-xs md:text-sm text-center p-1 cursor-pointer max-h-10 overflow-hidden"
      >
        {{ cast.name }}
      </div>
    </div>
  </div>
</template>
