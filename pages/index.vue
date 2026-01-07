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
const loading = ref(false);

onMounted(() => {
  // function scroll
  window.onscroll = async () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;

    // Load more when 200px from bottom
    if (scrollTop + windowHeight >= documentHeight - 200 && !loading.value) {
      loading.value = true;
      page++;
      try {
        const result: [] = await useApi(page, query);
        items.value.push(...result);
      } catch (error) {
        console.error('Error loading more movies:', error);
      } finally {
        loading.value = false;
      }
    }
  };
});

items.value = await useApi(page, query);
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- Header Section -->
    <div class="px-6 py-12 md:px-12 lg:px-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div class="mx-auto max-w-7xl">
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
          Popular Movies
        </h1>
        <p class="mt-4 text-slate-600 dark:text-slate-400 md:text-lg">
          Discover the most talked-about films right now
        </p>
      </div>
    </div>

    <!-- Movie Grid -->
    <div class="px-6 pb-16 md:px-12 lg:px-16">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <Cards v-for="item in items" :key="item.id" :item="item" />
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="mt-12 flex justify-center">
          <div class="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <svg class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading more movies...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar */
:deep(::-webkit-scrollbar) {
  width: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: #f1f5f9;
}

.dark :deep(::-webkit-scrollbar-track) {
  background: #0f172a;
}

:deep(::-webkit-scrollbar-thumb) {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark :deep(::-webkit-scrollbar-thumb) {
  background: #334155;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background: #94a3b8;
}

.dark :deep(::-webkit-scrollbar-thumb:hover) {
  background: #475569;
}
</style>
