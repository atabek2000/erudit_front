<template>
  <main
    class="main-container py-10 md:py-20 flex flex-col md:flex-row gap-x-[60px] items-center"
  >
    <img src="/main_banner.png" alt="banner" />
    <div class="w-full md:flex-1">
      <h1 class="text-2xl md:text-4xl text-cod-gray font-semibold">
        Бесплатная подготовка к ЕНТ
      </h1>
      <h2 class="mt-2.5 text-xl md:text-2xl font-medium text-don-juan">
        Бесплатные уроки и пробные тесты
      </h2>
      <UButton class="mt-6" to="/auth/register">Начать</UButton>
      <UButton
        class="mt-4 shadow-md border-t border-t-black/5"
        color="white"
        to="/auth/login"
        >У меня уже есть аккаунт</UButton
      >
    </div>
  </main>
</template>
