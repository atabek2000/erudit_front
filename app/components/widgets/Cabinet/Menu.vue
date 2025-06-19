<script setup>
const selected_menu = ref("subjects");
</script>

<template>
  <aside class="min-w-[276px] md:max-w-[276px]">
    <div class="px-6 rounded-xl bg-white">
      <nuxt-link to="/cabinet/subjects" class="flex py-4 gap-3">
        <img
          v-if="selected_menu === 'subjects'"
          src="~/assets/svg/subject_light.svg"
          alt="icon"
        />
        <img v-else src="~/assets/svg/subject.svg" alt="icon" />
        <p
          class="text-base font-medium"
          :class="
            selected_menu === 'subjects' ? 'text-primary' : 'text-cod-gray'
          "
        >
          {{ $t("subjects") }}
        </p>
      </nuxt-link>
      <nuxt-link to="/cabinet/rating" class="flex py-4 gap-3">
        <img
          v-if="selected_menu === 'rating'"
          src="~/assets/svg/rating_light.svg"
          alt="icon"
        />
        <img v-else src="~/assets/svg/rating.svg" alt="icon" />
        <p
          class="text-base font-medium"
          :class="selected_menu === 'rating' ? 'text-primary' : 'text-cod-gray'"
        >
          {{ $t("rating") }}
        </p>
      </nuxt-link>
      <nuxt-link to="/cabinet/test" class="flex py-4 gap-3">
        <img
          v-if="selected_menu === 'test'"
          src="~/assets/svg/test_ent_light.svg"
          alt="icon"
        />
        <img v-else src="~/assets/svg/test_ent.svg" alt="icon" />
        <p
          class="text-base font-medium"
          :class="selected_menu === 'test' ? 'text-primary' : 'text-cod-gray'"
        >
          {{ $t("trial_ent_test") }}
        </p>
      </nuxt-link>
      <nuxt-link to="/cabinet/premium" class="flex py-4 gap-3">
        <img
          v-if="selected_menu === 'permium'"
          src="~/assets/svg/premium_light.svg"
          alt="icon"
        />
        <img v-else src="~/assets/svg/premium.svg" alt="icon" />
        <p
          class="text-base font-medium"
          :class="
            selected_menu === 'permium' ? 'text-primary' : 'text-cod-gray'
          "
        >
          {{ $t("erudit_premium") }}
        </p>
      </nuxt-link>
    </div>

    <div class="px-6 py-4 rounded-xl bg-white mt-3">
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
      <UButton class="mt-3 py-2" size="sm">{{ $t("try_free") }}</UButton>
    </div>
  </aside>
</template>
