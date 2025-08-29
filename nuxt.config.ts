// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  dev: true,
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },
  modules: ["@nuxtjs/i18n", "@nuxt/ui", "@sidebase/nuxt-auth"],
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
  runtimeConfig: {
    public: {
      APP_DOMEN: process.env.APP_DOMEN,
      API_HOST: process.env.API_HOST,
      API_URL: process.env.API_HOST + "/api/",
      API_STORAGE: process.env.API_HOST + "/storage/",
    },
    authSecret: process.env.NEXTAUTH_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,
    APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  // for setCookie from nitro
  experimental: {
    asyncContext: true,
  },
  ui: {
    colorMode: false,
  },
});