<script setup>
const route = useRoute();
const selected_menu = computed(() => {
  if (
    route.path.includes("cabinet/subjects") ||
    route.path.includes("cabinet/lessons")
  ) {
    return "subjects";
  } else if (route.path.includes("cabinet/rating")) {
    return "rating";
  } else if (route.path.includes("cabinet/test")) {
    return "test";
  } else if (route.path.includes("cabinet/premium")) {
    return "premium";
  }
});

const isPremiumOpen = ref(false);
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
          v-if="selected_menu === 'premium'"
          src="~/assets/svg/premium_light.svg"
          alt="icon"
        />
        <img v-else src="~/assets/svg/premium.svg" alt="icon" />
        <p
          class="text-base font-medium"
          :class="
            selected_menu === 'premium' ? 'text-primary' : 'text-cod-gray'
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
      <UButton @click="isPremiumOpen = true" class="mt-3 py-2" size="sm">{{
        $t("try_free")
      }}</UButton>
    </div>
    <ModalsPremium v-model="isPremiumOpen" />
  </aside>
</template>
