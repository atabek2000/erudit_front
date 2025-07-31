export default () => {
  const { $i18n } = useNuxtApp();

  const runtimeConfig = useRuntimeConfig();
  const router = useRouter();
  const toast = useToast();

  const cookie_jwt = useCookie("jwt", { maxAge: 2592000 }); // max age 1 month
  const cookie_auth_name = useCookie("user_name", { maxAge: 2592000 }); // max age 1 month
  const { stopLoading, startLoading } = useLoader();

  const useAuthUser = () => useState("auth_user", () => {});
  const useResetPhone = () => useState("reset_phone", () => undefined);

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
    // if (localStorage)
    // localStorage.setItem("auth_user", JSON.stringify(newUser));
  };

  const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await useFetchApi("user/profile", {
          headers: {
            "Content-Language": $i18n.getLocaleCookie(),
          },
          onResponse({ request, response, options }) {
            if (response.ok) {
              setUser(response._data.data);
              cookie_auth_name.value =
                response._data.data?.name ?? $i18n.t("profile");
              refreshCookie("user_name");
            } else {
              setUser({});
              cookie_jwt.value = "";
              refreshCookie("jwt");
              cookie_auth_name.value = "";
              refreshCookie("user_name");
              router.push("/");
            }
          },
        });
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  // проверка токена
  const checkJWT = async () => {
    if (cookie_jwt.value) {
      let verified = true;
      // await $fetch(runtimeConfig.public.API_URL + "user/exists", {
      //   headers: {
      //     Authorization: `Bearer ${cookie_jwt.value}`,
      //   },
      // })
      //   .then(() => {
      //     // cookie_jwt.value = cookie_jwt.value;
      //   })
      //   .catch(() => {
      //     verified = false;
      //   });

      return verified;
    } else {
      return false;
    }
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const token_valid = await checkJWT();
        if (!token_valid) {
          setUser("");
          cookie_jwt.value = "";
          cookie_auth_name.value = "";
          refreshCookie("jwt");
          refreshCookie("user_name");
          // if (route.path.includes("/profile")) router.push("/");
        } else {
          await fetchUser();
          // const authUser = useAuthUser();
          // authUser.value = JSON.parse(localStorage.getItem("auth_user"));
          // cookie_auth_name.value = authUser?.value?.name;
          // refreshCookie("user_name");
        }

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();
        const data = await $fetch(runtimeConfig.public.API_URL + "user/login", {
          headers: {
            "Content-Language": $i18n.getLocaleCookie(),
          },
          method: "POST",
          body: contact,
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

            reject(error);
          },
        });

        setUser(data?.data);
        cookie_auth_name.value = data?.data.name ?? $i18n.t("profile");
        cookie_jwt.value = data?.data.access_token;
        refreshCookie("jwt");
        refreshCookie("user_name");

        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        stopLoading();
      }
    });
  };

  const authLate = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/auth/late",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
              "Content-Type": "application/json",
            },
            method: "POST",
            async onResponseError({ request, response, options }) {
              stopLoading();
              reject(error);
            },
          }
        );

        setUser(data?.data);
        cookie_jwt.value = data?.data.access_token;
        cookie_auth_name.value = "";
        refreshCookie("jwt");
        refreshCookie("user_name");

        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const resetPassword = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();
        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/password/reset/send-code",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
            },
            method: "POST",
            params: contact,
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
              reject();
            },
          }
        );
        stopLoading();
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const verifyResetCode = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();

        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/password/reset/check-code",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
            },
            method: "POST",
            body: contact,
            async onResponseError({ request, response, options }) {
              stopLoading();
              if (response._data?.data?.message) {
                toast.add({
                  title: $i18n.t("toast.error"),
                  color: "red",
                  description: response._data?.data?.message,
                });
              } else {
                toast.add({
                  title: $i18n.t("toast.error"),
                  color: "red",
                  description: $i18n.t("toast.error_on_server"),
                });
              }
              reject();
            },
          }
        );
        stopLoading();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const changePassword = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();

        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/password/reset",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
            },
            method: "POST",
            params: contact,
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

              reject();
            },
          }
        );
        stopLoading();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setUser({});
        cookie_jwt.value = "";
        cookie_auth_name.value = "";
        refreshCookie("jwt");
        refreshCookie("user_name");
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  const registerSendCode = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();
        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/register/send-code",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
            },
            method: "POST",
            body: contact,
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
              reject();
            },
          }
        );
        stopLoading();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const registerCheckCode = (contact) => {
    return new Promise(async (resolve, reject) => {
      try {
        // startLoading();
        const data = await $fetch(
          runtimeConfig.public.API_URL + "user/register/check",
          {
            headers: {
              "Content-Language": $i18n.getLocaleCookie(),
            },
            method: "POST",
            body: contact,
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
              reject();
            },
          }
        );
        stopLoading();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const registration = async (user) => {
    // startLoading();
    let is_success = false;
    let user_data = {};
    user_data = user;
    const data = await $fetch(runtimeConfig.public.API_URL + "user/register/", {
      headers: {
        "Content-Language": $i18n.getLocaleCookie(),
      },
      method: "POST",
      body: user_data,
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
      async onResponse({ request, response, options }) {
        stopLoading();
        if (response.ok) {
          toast.add({
            title: $i18n.t("toast.success"),
            color: "green",
          });

          await login(user);
          is_success = true;
        }
      },
    });

    return is_success;
  };

  const profileEdit = async (user) => {
    // startLoading();
    const data = await useFetchApi("user/edit", {
      headers: {
        "Content-Language": $i18n.getLocaleCookie(),
      },
      method: "POST",
      body: user,
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
      async onResponse({ request, response, options }) {
        stopLoading();
        if (response.ok) {
          await fetchUser();
          toast.add({
            title: $i18n.t("toast.success"),
            description: $i18n.t("toast.success_saved"),
          });
        }
      },
    });
    // const data = await $fetch(runtimeConfig.public.API_URL + "auth/edit/", );
  };

  const deleteUser = async () => {
    // startLoading();
    const data = await useFetchApi("user/destroy/", {
      headers: {
        "Content-Language": $i18n.getLocaleCookie(),
      },
      method: "GET",
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
      async onResponse({ request, response, options }) {
        stopLoading();
        if (response.ok) {
          await logout();
          // setUser({});
          // cookie_jwt.value = "";
          // refreshCookie("jwt"); // обновим куки сразу
          toast.add({
            title: $i18n.t("toast.success"),
            description: $i18n.t("toast.success_deleted"),
          });
          router.push("/");
        }
      },
    });
  };

  return {
    useAuthUser,
    login,
    fetchUser,
    initAuth,
    checkJWT,
    logout,
    registration,
    profileEdit,
    deleteUser,
    resetPassword,
    changePassword,
    verifyResetCode,
    useResetPhone,
    registerSendCode,
    registerCheckCode,
    authLate,
  };
};
