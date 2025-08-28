import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useFetch(useRuntimeConfig().public.API_URL + url, {
    ...options,
    headers: {
      "Content-Language": useNuxtApp().$i18n.locale,
      "Accept-Language": useNuxtApp().$i18n.locale,
      Authorization: `Bearer ${useCookie("jwt").value}`,
      Accept: "application/json",
      ...options?.headers,
    },
    $fetch: useNuxtApp().$api,
  });
}
