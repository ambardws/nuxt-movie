export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id');

  try {
    const response = await $fetch(
      `${config.apiBaseUrl}/${id}/credits`,
      {
        params: {
          api_key: config.apiKey,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error('TMDB API Error (Credits):', error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch movie credits: ${error.message}`,
    });
  }
});
