export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getRouterParam(event, 'query');
  const { page = '1' } = getQuery(event);

  try {
    const response = await $fetch(
      `${config.apiBaseUrl}/${query}`,
      {
        params: {
          api_key: config.apiKey,
          page: page,
        },
      }
    );

    return response;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch movies from TMDB API',
    });
  }
});
