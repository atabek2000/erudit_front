<template>
  <div class="px-6 py-4 rounded-xl bg-white">
    <div class="flex gap-2.5">
      <p class="test-sm font-semibold text-primary">
        {{ $t("try_erudit_premium") }}
      </p>
      <img src="/logo/icon.png" alt="logo" width="54" />
    </div>
    <p class="text-xs font-normal text-cod-gray/70">
      <span class="text-primary font-normal">∞</span>
      {{ $t("unlimited_trial_tests") }}
    </p>
    <p class="text-xs font-normal text-cod-gray/70">
      <span class="text-primary font-normal">∞</span>
      {{ $t("infinite_lives") }}
    </p>
    <UButton @click="isPremiumOpen = true" class="mt-3 py-2" size="sm">{{
      $t("try_free")
    }}</UButton>
  </div>
</template>
