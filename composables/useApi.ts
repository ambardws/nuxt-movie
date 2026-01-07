interface Movie {
  results: [];
}

export const useApi = async (page: number, query: string) => {
  const items: Movie = await $fetch(
    `/api/movies/${query}`,
    {
      params: {
        page: page,
      },
    }
  );

  return items.results;
};
