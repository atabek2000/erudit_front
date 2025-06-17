// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxtjs/i18n", "@nuxt/ui"],
  i18n: {
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
    locales: [
      { code: "ru", iso: "ru-RU", file: "ru.json" },
      { code: "kk", iso: "kk-KZ", file: "kk.json" },
    ],
    defaultLocale: "ru",
    baseUrl: "https://dostyq.kz",
  },
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
});
