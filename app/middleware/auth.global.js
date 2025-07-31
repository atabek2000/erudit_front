export default defineNuxtRouteMiddleware(async (to, from) => {
  const cookie_jwt = useCookie("jwt", { maxAge: 2592000 }); // max age 1 month

  if (!cookie_jwt.value && to.path.includes("cabinet")) {
    return navigateTo("/");
  }
});
