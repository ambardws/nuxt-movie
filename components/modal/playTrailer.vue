<script setup lang="ts">
const props = defineProps<{
  itemId: number;
}>();

interface MovieVid {
  results: [];
}

const config = useRuntimeConfig();
const result: MovieVid = await $fetch(
  `${config.public.API_BASE_URL}/${props.itemId}/videos?api_key=${config.public.API_KEY}`
);
const trailer = result.results.filter((data: any) => {
  return data.type === "Trailer";
});
</script>

<template>
  <button class="btn btn-primary" onclick="my_modal_1.showModal()">
    Watch Trailer
  </button>
  <dialog id="my_modal_1" class="modal text-slate-500">
    <iframe
      class="h-3/4 w-3/4"
      src="https://www.youtube.com/embed/ZtuFgnxQMrA"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </dialog>
</template>
