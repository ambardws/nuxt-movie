<script setup lang="ts">
defineProps<{
  item: any;
  directing: any;
}>();

// Helper functions
function formatDate(date: string) {
  if (!date) return 'N/A';
  const parts = date.split("-");
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function convertDollar(amount: number) {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatLang(lang: string) {
  const langMap: Record<string, string> = {
    'en': 'English',
    'id': 'Indonesian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'zh': 'Chinese',
  };
  return langMap[lang] || lang.toUpperCase();
}
</script>

<template>
  <section class="mb-16 scroll-mt-20">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Movie Details</h2>
      <div class="h-0.5 w-16 bg-blue-600 dark:bg-blue-400 mt-2"></div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Storyline -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Storyline</h3>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            {{ item.overview }}
          </p>
        </div>

        <!-- Information -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Release Date</p>
              <p class="text-slate-900 dark:text-white font-medium">{{ formatDate(item.release_date) }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Runtime</p>
              <p class="text-slate-900 dark:text-white font-medium">{{ item.runtime }} Minutes</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Status</p>
              <p class="text-slate-900 dark:text-white font-medium">{{ item.status }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Language</p>
              <p class="text-slate-900 dark:text-white font-medium">{{ formatLang(item.original_language) }}</p>
            </div>
          </div>
        </div>

        <!-- Genres -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Genres</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in item.genres"
              :key="genre.id"
              class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-200 dark:border-slate-700 font-medium"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>

        <!-- Production Companies -->
        <div v-if="item.production_companies?.length" class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Production Companies</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(comp, index) in item.production_companies"
              :key="index"
              class="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-sm border border-slate-200 dark:border-slate-700"
            >
              {{ comp.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Director Card -->
        <div v-if="directing?.length" class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Director</h3>
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <svg class="h-6 w-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-slate-900 dark:text-white font-semibold">{{ directing[0].original_name }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Film Director</p>
            </div>
          </div>
        </div>

        <!-- Box Office -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Box Office</h3>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Budget</p>
              <p class="text-lg font-bold text-slate-900 dark:text-white">{{ convertDollar(item.budget) }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Revenue</p>
              <p class="text-lg font-bold text-slate-900 dark:text-white">{{ convertDollar(item.revenue) }}</p>
            </div>
            <div v-if="item.revenue && item.budget">
              <p class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Profit/Loss</p>
              <p class="text-lg font-bold" :class="item.revenue > item.budget ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ convertDollar(item.revenue - item.budget) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Rating -->
        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">Rating</h3>
          <div class="text-center">
            <div class="mb-3">
              <svg class="h-12 w-12 mx-auto fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-4xl font-bold text-slate-900 dark:text-white mb-2">{{ item.vote_average?.toFixed(1) }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">{{ item.vote_count?.toLocaleString() }} votes</p>
            <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="h-full bg-yellow-500 rounded-full" :style="{ width: `${item.vote_average * 10}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
