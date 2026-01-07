<script setup lang="ts">
const props = defineProps<{
  itemId: number;
}>();

interface MovieVid {
  results: [];
}

const result: MovieVid = await $fetch(`/api/movies/videos/${props.itemId}`);
const trailer = result.results.filter((data: any) => {
  return data.type === "Trailer";
});

const mainTrailer = trailer.length > 0 ? trailer[0] : result.results[0];
const trailerKey = mainTrailer?.key;
const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null;

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
  if (process.client) {
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  isOpen.value = false;
  if (process.client) {
    document.body.style.overflow = '';
  }
}

onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen.value) {
      closeModal();
    }
  };
  window.addEventListener('keydown', handleEscape);

  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>

<template>
  <div>
    <!-- Play Button -->
    <button
      @click="openModal"
      class="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 px-6 py-2.5 font-medium text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
    >
      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
      Watch Trailer
    </button>

    <!-- Modal -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 dark:bg-black/90 p-4"
        @click="closeModal"
      >
        <div
          class="relative w-full max-w-5xl"
          @click.stop
        >
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Video -->
          <div class="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            <div v-if="trailerUrl" class="aspect-video w-full">
              <iframe
                :src="`${trailerUrl}?autoplay=1&rel=0`"
                class="h-full w-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="Movie Trailer"
              />
            </div>

            <!-- No Trailer -->
            <div v-else class="aspect-video flex items-center justify-center p-12 text-center">
              <svg class="mx-auto h-16 w-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 class="text-lg font-semibold text-white mb-2">Trailer Not Available</h3>
              <p class="text-slate-400">Sorry, no trailer is currently available for this movie.</p>
            </div>
          </div>

          <!-- Title -->
          <div v-if="mainTrailer" class="mt-4 text-center">
            <h3 class="text-base font-medium text-white">{{ mainTrailer.name }}</h3>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
