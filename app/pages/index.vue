<template>
  <main
    class="main-container py-10 md:py-20 flex flex-col md:flex-row gap-x-[60px] items-center"
  >
    <img src="/main_banner.png" alt="banner" />
    <div class="w-full md:flex-1">
      <h1 class="text-2xl md:text-4xl text-cod-gray font-semibold">
        {{ $t("free_ent_preparation") }}
      </h1>
      <h2 class="mt-2.5 text-xl md:text-2xl font-medium text-don-juan">
        {{ $t("free_lessons_and_tests") }}
      </h2>
      <UButton class="mt-6" to="/auth/register">{{
        $t("start_button")
      }}</UButton>
      <UButton
        class="mt-4 shadow-md border-t border-t-black/5"
        color="white"
        to="/auth/login"
        >{{ $t("already_have_account") }}</UButton
      >
    </div>
  </main>
</template>
