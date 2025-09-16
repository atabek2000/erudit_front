<script setup>
const { locale } = useI18n();
const { initAuth } = useCustomAuth();
const { checkRecovery, loadState, fetchTimeLeft } = useAttribute();

let t;

onBeforeMount(async () => {
  await initAuth().then(() => {
    loadState();
    fetchTimeLeft();
    checkRecovery(); // мгновенный пересчёт при загрузке
    t = setInterval(checkRecovery, 1000);
  });
});

onBeforeUnmount(() => clearInterval(t));

useHead({
  title: `Бесплатная подготовка к ЕНТ для каждого`,
  htmlAttrs: { lang: locale.value },
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=1.0",
    },
    {
      name: "keywords",
      content:
        "онлайн школа Казахстан, дистанционное обучение, подготовка к ЕНТ, курсы для школьников, уроки онлайн, репетитор онлайн, подготовка к экзаменам, обучение онлайн Казахстан, онлайн курсы математика, онлайн курсы физика, онлайн курсы химия, онлайн курсы английский, онлайн подготовка к школе, erudit kz, erudit школа, образование Казахстан, онлайн образование Казахстан, школьные предметы онлайн, подготовка к олимпиадам, онлайн уроки Алматы, онлайн обучение Астана, erudit education",
    },
    {
      name: "title",
      content: `Бесплатная подготовка к ЕНТ для каждого`,
    },
    {
      name: "description",
      content: `Геймифицированная платформа: видеоуроки, тесты, жизни и прогресс. Прокачай знания и подготовься к ЕНТ, как будто проходишь игру`,
    },
    {
      property: "og:title",
      content: `Бесплатная подготовка к ЕНТ для каждого`,
    },
    {
      property: "og:description",
      content: `Геймифицированная платформа: видеоуроки, тесты, жизни и прогресс. Прокачай знания и подготовься к ЕНТ, как будто проходишь игру`,
    },
    {
      property: "og:image",
      content: `https://edu.erudit.kz/favicon/og_image.png`,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      property: "og:image:alt",
      content: "ERUDIT",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://edu.erudit.kz" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:creator", content: "@erudit.kz" },
    {
      name: "twitter:title",
      content: `Бесплатная подготовка к ЕНТ для каждого`,
    },
    {
      name: "twitter:description",
      content: `Геймифицированная платформа: видеоуроки, тесты, жизни и прогресс. Прокачай знания и подготовься к ЕНТ, как будто проходишь игру`,
    },
    {
      name: "twitter:image",
      content: `https://edu.erudit.kz/favicon/og_image.png`,
    },

    {
      "http-equiv": "Content-Security-Policy",
      content: "upgrade-insecure-requests",
    },
    {
      name: "description",
      itemprop: "description",
      content: `Геймифицированная платформа: видеоуроки, тесты, жизни и прогресс. Прокачай знания и подготовься к ЕНТ, как будто проходишь игру`,
    },
    {
      itemprop: "headline",
      content: `Бесплатная подготовка к ЕНТ для каждого`,
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "ERUDIT Team" },
    {
      "http-equiv": "Content-Security-Policy",
      content: "upgrade-insecure-requests",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      href: "/favicon/favicon-48.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "64x64",
      href: "/favicon/favicon-64.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/favicon/favicon-96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "128x128",
      href: "/favicon/favicon-128.png",
    },
    { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicon/favicon-192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      href: "/favicon/favicon-512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon-180.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/favicon/apple-touch-icon-152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/favicon/apple-touch-icon-120.png",
    },
  ],
  script: [
    {
      src: "https://widget.paysage.kz",
    },
  ],
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
