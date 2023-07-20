<script setup lang="ts">
//meta title
useHead({
  title: "21Movie Watch List",
});

interface Movie {
  results: [];
}

let page: number = 1;
let items = ref<Movie["results"]>([]);
const query: string = "popular";
onMounted(() => {
  // function scroll
  window.onscroll = async () => {
    let bottomOfWindow =
      Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight ===
      document.documentElement.offsetHeight;

    if (bottomOfWindow) {
      page++;
      const result: [] = await useApi(page, query);
      items.value.push(...result);
    }
  };
});

items.value = await useApi(page, query);
</script>

<template>
  <div class="p-5 grid grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-3">
    <Cards v-for="item in items" :item="item" />
  </div>
</template>
