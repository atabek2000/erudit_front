<script setup>
definePageMeta({
  layout: "premium",
});
</script>
<template>
  <main class="min-h-screen">
    <div class="rounded-xl p-4 md:py-6 md:px-8 text-white bg-white/10">
      <p class="text-xl font-semibold text-center">Эрудит Premium</p>
      <p class="text-xl font-normal text-center">
        {{ $t("premium_prepare_4x_faster") }}
      </p>
      <p
        class="flex justify-between items-center mt-6 text-base tracking-wider font-medium"
      >
        {{ $t("unlimited_lives_feature") }}
        <UIcon name="i-lucide-check" class="size-6" />
      </p>
      <p
        class="flex justify-between items-center mt-6 text-base tracking-wider font-medium"
      >
        {{ $t("unlimited_test_attempts") }}
        <UIcon name="i-lucide-check" class="size-6" />
      </p>
      <p
        class="flex justify-between items-center mt-6 text-base tracking-wider font-medium"
      >
        {{ $t("mistake_analysis") }}
        <UIcon name="i-lucide-check" class="size-6" />
      </p>
      <UButton
        to="/cabinet/premium/plans"
        class="bg-white hover:bg-white/80 mt-6 text-cod-gray"
        >{{ $t("try_free") }}</UButton
      >
    </div>
    <div
      class="rounded-xl p-4 md:py-3 md:px-8 text-white bg-white/10 mt-5 flex gap-3"
    >
      <img src="~/assets/svg/info.svg" alt="info" />
      <p class="text-base font-normal">{{ $t("cancel_anytime") }}</p>
    </div>
    <img
      src="/banner_premium.png"
      alt="banner"
      width="306"
      height="306"
      class="ml-auto"
    />
  </main>
</template>
