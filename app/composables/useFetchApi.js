export default (url, options = {}) => {
  const runtimeConfig = useRuntimeConfig();
  const cookie_jwt = useCookie("jwt");
  const { stopLoading } = useLoader();
  const { $i18n } = useNuxtApp();
  const toast = useToast();

  return $fetch(runtimeConfig.public.API_URL + url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${cookie_jwt.value}`,
      "Content-Language": $i18n.locale.value,
    },
    async onResponseError({ request, response, options }) {
      stopLoading();
      if (response._data?.message) {
        toast.add({
          title: $i18n.t("toast.error"),
          color: "red",
          description: response._data?.message,
        });
      } else {
        toast.add({
          title: $i18n.t("toast.error"),
          color: "red",
          description: $i18n.t("toast.error_on_server"),
        });
      }
    },
  });
};
