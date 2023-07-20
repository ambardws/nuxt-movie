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
    public: {
      apiBase: "http://localhost:3000",
      API_BASE_URL: process.env.API_BASE_URL,
      API_KEY: "b45900d0aae22fc3aa0a9c7a702bbcfe",
    },
  },
});
