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

// Get first trailer or fallback to first video
const mainTrailer = trailer.length > 0 ? trailer[0] : result.results[0];
const trailerKey = mainTrailer?.key;
const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null;

// Modal state
const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
  if (typeof window !== 'undefined' && window.document) {
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  isOpen.value = false;
  if (typeof window !== 'undefined' && window.document) {
    document.body.style.overflow = '';
  }
}

// Close modal on escape key
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
      class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
    >
      <span class="relative z-10 flex items-center gap-3">
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Watch Trailer
      </span>
      <!-- Button Glow Effect -->
      <div class="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
    </button>

    <!-- Modal Overlay -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
        @click="closeModal"
      >
        <!-- Modal Content -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            class="relative w-full max-w-5xl"
            @click.stop
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Video Container -->
            <div class="relative overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/20 bg-slate-900">
              <!-- Video Frame -->
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

              <!-- No Trailer Available -->
              <div v-else class="aspect-video flex items-center justify-center bg-slate-900 p-12 text-center">
                <div>
                  <svg class="mx-auto h-20 w-20 text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 class="text-xl font-semibold text-white mb-2">Trailer Not Available</h3>
                  <p class="text-slate-400">Sorry, no trailer is currently available for this movie.</p>
                </div>
              </div>
            </div>

            <!-- Modal Title -->
            <div v-if="mainTrailer" class="mt-4 text-center">
              <h3 class="text-lg font-semibold text-white">{{ mainTrailer.name }}</h3>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Prevent body scroll when modal is open */
body:has(.modal-open) {
  overflow: hidden;
}
</style>
