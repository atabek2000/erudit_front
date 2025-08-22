<script setup>
const route = useRoute();
const { hasPremium } = useCustomAuth();
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
  <aside class="min-w-[276px] lg:max-w-[276px]">
    <div class="hidden lg:block px-6 rounded-xl bg-white">
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
      <nuxt-link
        :to="hasPremium ? '/cabinet/premium/plans' : '/cabinet/premium'"
        class="flex py-4 gap-3"
      >
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

    <div class="flex justify-around w-full lg:hidden">
      <nuxt-link to="/cabinet/subjects" class="p-5">
        <img src="~/assets/svg/subject_light.svg" alt="img" class="w-7 h-7" />
      </nuxt-link>
      <nuxt-link to="/cabinet/rating" class="p-5">
        <img src="~/assets/svg/rating_yellow.svg" alt="img" class="w-7 h-7" />
      </nuxt-link>
      <nuxt-link to="/cabinet/test" class="p-5">
        <img src="~/assets/svg/test_ent_green.svg" alt="img" class="w-7 h-7" />
      </nuxt-link>
      <nuxt-link
        :to="hasPremium ? '/cabinet/premium/plans' : '/cabinet/premium'"
        class="p-5"
      >
        <img src="~/assets/svg/premium_red.svg" alt="img" class="w-7 h-7" />
      </nuxt-link>
    </div>

    <WidgetsCabinetPremiumBlock class="hidden lg:block mt-3" />
    <ModalsPremium v-model="isPremiumOpen" />
  </aside>
</template>
