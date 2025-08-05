export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  const api = $fetch.create({
    baseURL: runtimeConfig.public.API_HOST,
    async onResponseError({ response }) {
      console.log(response.status);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
