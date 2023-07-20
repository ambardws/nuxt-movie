<script setup lang="ts">
defineProps<{
  item: any;
  directing: any;
}>();

function formatDate(date: string) {
  const dateString = "2023-05-03";
  const parts = dateString.split("-"); // Membagi string menjadi array ["2023", "05", "03"]
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formattedDate;
}
</script>
<template>
  <div class="flex flex-col md:flex-row mt-20 p-10 text-slate-300">
    <div class="md:flex-1">
      <img
        class="rounded-lg mx-auto object-contain md:h-2/4"
        :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"
      />
    </div>
    <div class="flex-1 pr-20 text-justify">
      <h1 class="text-2xl">Storyline</h1>
      <p class="mt-5">
        {{ item.overview }}
      </p>
      <ul>
        <div class="grid grid-cols-1 md:grid-cols-2 mt-5 text-sm">
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div class="w-2/5">Released</div>
            <div>
              {{ formatDate(item.release_date) }}
            </div>
          </li>
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div class="w-2/5">Runtime</div>
            <div>{{ item.runtime }} Minutes</div>
          </li>
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div class="w-2/5">Director</div>
            <div>
              {{ directing[0].original_name }}
            </div>
          </li>
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div class="w-2/5">Budget</div>
            <div>{{ convertDollar(item.budget) }}</div>
          </li>
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div class="w-2/5">Revenue</div>
            <div>
              {{ convertDollar(item.revenue) }}
            </div>
          </li>

          <li class="py-2 w-50 grid grid-cols-[40%60%] space-x-1">
            <div class="w-2/5">Genre</div>
            <div>
              <p
                class="bg-slate-800 inline cursor-pointer w-max h-max px-1 mr-1 rounded-md hover:bg-slate-500"
                v-for="genre in item.genres"
              >
                {{ genre.name }}
              </p>
            </div>
          </li>
          <li class="py-2 w-50 flex">
            <div class="w-2/5">Status</div>
            <div>
              {{ item.status }}
            </div>
          </li>
          <li class="py-2 w-50 flex">
            <div class="w-2/5">Language</div>
            <div>
              {{ formatLang(item.original_language) }}
            </div>
          </li>
          <li class="py-2 w-50 grid grid-cols-[40%60%]">
            <div>Production</div>
            <div>
              <p
                class="inline"
                v-for="(comp, index) in item.production_companies"
              >
                {{
                  item.production_companies.length - 1 === index
                    ? comp.name
                    : comp.name + ", "
                }}
              </p>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
