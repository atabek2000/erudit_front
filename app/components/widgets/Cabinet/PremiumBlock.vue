<script setup>
const { useAuthUser, hasPremium } = useCustomAuth();
const user = useAuthUser();
</script>

<template>
  <div class="px-6 py-4 rounded-xl bg-white">
    <div class="flex gap-2.5">
      <p class="test-sm font-semibold text-primary">
        {{ hasPremium ? $t("have_erudit_premium") : $t("try_erudit_premium") }}
        <span v-if="hasPremium" class="text-xs font-normal text-shark/70">
          (
          {{ $t("until", { term: dateToText(user.subscribe.expires_at) }) }}
          )</span
        >
      </p>
      <img
        src="/logo/icon.png"
        alt="logo"
        width="54"
        height="44"
        class="max-h-11"
      />
    </div>
    <div v-if="hasPremium" class="flex gap-2 mt-2.5">
      <img src="~/assets/svg/loop.svg" alt="" width="22" />
      <img src="~/assets/svg/heart.svg" alt="" width="22" />
    </div>
    <div v-if="!hasPremium">
      <p class="text-xs font-normal text-cod-gray/70">
        <span class="text-primary font-normal">∞</span>
        {{ $t("unlimited_trial_tests") }}
      </p>
      <p class="text-xs font-normal text-cod-gray/70">
        <span class="text-primary font-normal">∞</span>
        {{ $t("infinite_lives") }}
      </p>
    </div>
    <div v-else class="mt-2.5">
      <p class="text-cod-gray/70 text-xs font-normal">
        ∞ {{ $t("trial_tests") }};
      </p>
      <p class="text-cod-gray/70 text-xs font-normal">
        ∞ {{ $t("infinite_lives") }};
      </p>
    </div>

    <UButton
      v-if="!hasPremium"
      to="/cabinet/premium/plans"
      class="mt-3 py-2"
      size="sm"
      >{{ $t("try_free") }}</UButton
    >
  </div>
</template>
