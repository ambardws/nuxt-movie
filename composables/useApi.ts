interface Movie {
  results: [];
}

export const useApi = async (page: number, query: string) => {
  const config = useRuntimeConfig();
  const items: Movie = await $fetch(
    `${config.public.API_BASE_URL}/${query}?api_key=${config.public.API_KEY}&page=${page}`
  );

  return items.results;
};
