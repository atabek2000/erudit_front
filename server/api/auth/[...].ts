import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: useRuntimeConfig().GOOGLE_CLIENT_ID,
      clientSecret: useRuntimeConfig().GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    AppleProvider.default({
      clientId: useRuntimeConfig().APPLE_CLIENT_ID,
      clientSecret: useRuntimeConfig().APPLE_PRIVATE_KEY,
      checks: ["pkce"],
    }),
  ],
  pages: {
    error: "/oauth/error",
  },
  useSecureCookies: true,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: process.env.NODE_ENV === "production", // Только в проде
      },
    },
  },

  callbacks: {
    // checking after sign with apple or google
    async signIn({ user, account }) {
      // Отправляем данные пользователя на сервер
      try {
        // get status of signign in from backend
        // const response = await $fetch(
        //   useRuntimeConfig().public.API_URL + "user/auth/check",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: {
        //       // name: user.name,
        //       // avatar: user.image,
        //       ...(account?.provider === "google"
        //         ? { email: user.email }
        //         : {
        //             apple_token: user.id,
        //             email: user.email,
        //           }),
        //       ...(user.name ? { fio: user.name } : {}),
        //     },
        //   }
        // );

        let isSuccess = false;

        // getting user info and token from backend
        // if (response?.data) {
        await $fetch(useRuntimeConfig().public.API_URL + "user/auth", {
          params: {
            ...(account?.provider === "google"
              ? { email: user.email }
              : {
                  apple_token: user.id,
                  email: user.email,
                }),
            ...{ name: user.name || user.email },
          },
        }).then((res) => {
          if (res?.data) {
            isSuccess = true;
            // setting token to client
            const event = useEvent();
            setCookie(event, "jwt", res?.data?.access_token, {
              httpOnly: false, // Доступна на клиенте
              sameSite: "lax",
              path: "/",
              secure: process.env.NODE_ENV === "production",
            });
          }
        });
        // }

        // if true access for input
        return isSuccess;
      } catch (error) {
        console.error("Ошибка при отправке данных на сервер:", error);
        return false;
      }
    },
  },
});
