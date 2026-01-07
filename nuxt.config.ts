// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // Private keys (server-side only)
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
    
    public: {
      // Public keys (exposed to client)
      apiBase: "http://localhost:3000",
    },
  },
});
