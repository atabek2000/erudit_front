<script setup>
definePageMeta({
  layout: "menu",
});

const isLangOpen = ref(false);
const isLogoutOpen = ref(false);

const menu = [
  {
    bg: "bg-zumthor",
    text: "edit_profile",
    to: "/cabinet/profile/edit",
    click: () => {},
  },
  {
    bg: "bg-hint-of-green",
    text: "work_on_mistakes",
    to: "/cabinet/test/mistakes",
    click: () => {},
  },
  {
    bg: "bg-papaya-whip",
    text: "language",
    to: null,
    click: () => {
      isLangOpen.value = true;
    },
  },
  {
    bg: "bg-blue-chalk",
    text: "cancel_subscription",
    to: "/cabinet/premium/plans",
    click: () => {},
  },
  {
    bg: "bg-chablis",
    text: "logout",
    to: null,
    click: () => {
      isLogoutOpen.value = true;
    },
  },
];
</script>

<template>
  <main class="p-4 md:px-8 md:py-6">
    <div class="flex justify-between">
      <div class=" ">
        <p class="text-xl font-semibold text-black">Аружан Айболовна</p>
        <SharedScorePanel score="10" life="6" diamond="8" class="mt-3" />
      </div>
      <img src="/temp/ava.png" alt="avatar" width="90" height="90" />
    </div>
    <div class="mt-6 space-y-4">
      <nuxt-link
        v-for="(item, index) in menu"
        :key="item.text"
        :to="item.to"
        @click="item.click"
        class="flex gap-3 items-center cursor-pointer"
      >
        <div class="rounded-2xl w-[50px] h-[50px] p-1" :class="item.bg">
          <img
            :src="`/profile/img${index + 1}.png`"
            alt="img"
            class="object-contain max-w-full max-h-full m-auto"
          />
        </div>
        <p class="text-base font-medium text-cod-gray">
          {{ $t(item.text) }}
        </p>
      </nuxt-link>
    </div>
    <ModalsConfirm v-model="isLogoutOpen" :title="$t('logout')" />
    <ModalsLang v-model:open="isLangOpen" />
  </main>
</template>
