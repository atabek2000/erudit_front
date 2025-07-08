<script setup>
definePageMeta({
  layout: "menu",
});

const diamonCount = ref(10);
const lifeCount = ref(1);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);

const plus = () => {
  if (diamonCount.value < 50) {
    lifeCount.value++;
    diamonCount.value += 10;
  }
};
const minus = () => {
  if (diamonCount.value > 10) {
    lifeCount.value--;
    diamonCount.value -= 10;
  }
};
</script>

<template>
  <main class="bg-white lg:rounded-xl p-4 md:px-8 md:py-6">
    <p class="text-xl font-semibold text-black">
      {{ $t("exchange_diamonds") }}
    </p>
    <p class="text-base font-normal text-scorpion mt-2">
      {{ $t("spend_lives") }}
    </p>

    <div class="mt-6 flex flex-col-reverse md:flex-row gap-3 justify-between">
      <div>
        <p class="text-base font-medium text-cod-gray">
          {{ $t("how_many_exchange") }}
        </p>
        <div class="flex mt-3 gap-6 items-center">
          <UButton
            class="w-fit rounded-lg"
            icon="i-lucide-minus"
            @click="minus"
          ></UButton>
          <p class="text-xl font-medium text-[#313144]">{{ diamonCount }}</p>
          <UButton
            class="w-fit rounded-lg"
            icon="i-lucide-plus"
            @click="plus"
          ></UButton>
          <div class="flex gap-2.5 items-center ml-2">
            <img src="~/assets/svg/heart.svg" alt="heart" class="w-8" />
            <p class="text-xl font-medium text-[#313144]">{{ lifeCount }}</p>
          </div>
        </div>
      </div>

      <UButton
        class="text-white w-fit bg-selective-yellow-600 hover:bg-selective-yellow/80 py-2 h-fit"
      >
        {{ $t("you_have_120_diamonds") }} {{ getDiamondsLabel(120) }}

        <template #trailing>
          <img src="~/assets/svg/diamond_white.svg" alt="diamond" />
        </template>
      </UButton>
    </div>

    <p class="py-6 text-base font-normal text-black/50">
      {{ $t("life_equals_10_diamonds") }}
    </p>

    <UButton @click="isSuccessOpen = true">{{
      $t("exchange_10_diamonds_for_1_life", {
        from: getDiamondsLabel(diamonCount),
        to: getLifeLabel(lifeCount),
      })
    }}</UButton>

    <ModalsDiamondSuccess v-model="isSuccessOpen" />
    <ModalsDiamondError v-model="isErrorOpen" />
  </main>
</template>
