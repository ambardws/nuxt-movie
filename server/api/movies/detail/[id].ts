export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id');

  try {
    const response = await $fetch(
      `${config.apiBaseUrl}/${id}`,
      {
        params: {
          api_key: config.apiKey,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error('TMDB API Error (Detail):', error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch movie detail: ${error.message}`,
    });
  }
});
