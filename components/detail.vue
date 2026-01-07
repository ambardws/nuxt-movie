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
  <section class="mb-16 scroll-mt-20" id="details">
    <!-- Section Header -->
    <div class="mb-8">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-2">Movie Details</h2>
      <div class="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Left Column - Overview -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Storyline -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-800">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Storyline
          </h3>
          <p class="text-slate-300 leading-relaxed text-lg">
            {{ item.overview }}
          </p>
        </div>

        <!-- Information Grid -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-800">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Release Date -->
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase tracking-wide">Release Date</p>
                <p class="text-slate-200 font-medium">{{ formatDate(item.release_date) }}</p>
              </div>
            </div>

            <!-- Runtime -->
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase tracking-wide">Runtime</p>
                <p class="text-slate-200 font-medium">{{ item.runtime }} Minutes</p>
              </div>
            </div>

            <!-- Status -->
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase tracking-wide">Status</p>
                <p class="text-slate-200 font-medium">{{ item.status }}</p>
              </div>
            </div>

            <!-- Language -->
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-slate-500 uppercase tracking-wide">Language</p>
                <p class="text-slate-200 font-medium">{{ formatLang(item.original_language) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Genres -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-800">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Genres
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="genre in item.genres"
              :key="genre.id"
              class="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-default font-medium"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>

        <!-- Production Companies -->
        <div v-if="item.production_companies?.length" class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-800">
          <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Production Companies
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(comp, index) in item.production_companies"
              :key="index"
              class="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
            >
              {{ comp.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column - Stats & Director -->
      <div class="space-y-8">
        <!-- Director Card -->
        <div v-if="directing?.length" class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <h3 class="text-lg font-semibold text-white mb-4">Director</h3>
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p class="text-white font-semibold text-lg">{{ directing[0].original_name }}</p>
              <p class="text-slate-400 text-sm">Film Director</p>
            </div>
          </div>
        </div>

        <!-- Financial Stats -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800">
          <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Box Office
          </h3>

          <div class="space-y-4">
            <!-- Budget -->
            <div class="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <p class="text-xs text-slate-500 uppercase tracking-wide mb-1">Budget</p>
              <p class="text-2xl font-bold text-green-400">{{ convertDollar(item.budget) }}</p>
            </div>

            <!-- Revenue -->
            <div class="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <p class="text-xs text-slate-500 uppercase tracking-wide mb-1">Revenue</p>
              <p class="text-2xl font-bold text-green-400">{{ convertDollar(item.revenue) }}</p>
            </div>

            <!-- Profit/Loss -->
            <div v-if="item.revenue && item.budget" class="p-4 rounded-xl border" :class="item.revenue > item.budget ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'">
              <p class="text-xs text-slate-500 uppercase tracking-wide mb-1">Profit/Loss</p>
              <p class="text-2xl font-bold" :class="item.revenue > item.budget ? 'text-green-400' : 'text-red-400'">
                {{ convertDollar(item.revenue - item.budget) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Rating Card -->
        <div class="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-4xl font-bold text-white mb-2">{{ item.vote_average?.toFixed(1) }}</p>
            <p class="text-slate-400 text-sm mb-4">{{ item.vote_count?.toLocaleString() }} votes</p>
            <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500" :style="{ width: `${item.vote_average * 10}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
