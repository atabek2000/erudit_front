<script setup>
definePageMeta({
  layout: "menu",
});

const lifeCount = ref(1);
const priceCount = ref(100);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);

const plus = () => {
  if (lifeCount.value < 5) {
    lifeCount.value++;
    priceCount.value += 100;
  }
};
const minus = () => {
  if (lifeCount.value > 1) {
    lifeCount.value--;
    priceCount.value -= 100;
  }
};
</script>

<template>
  <main class="p-4 md:px-8 md:py-6">
    <p class="text-xl font-semibold text-black">
      {{ $t("buy_lives") }}
    </p>
    <p class="text-base font-normal text-scorpion mt-2">
      {{ $t("refill_lives") }}
    </p>

    <div class="mt-6 flex flex-col-reverse md:flex-row gap-3 justify-between">
      <div>
        <p class="text-base font-medium text-cod-gray">
          {{ $t("how_many_lives_buy") }}
        </p>
        <div class="flex mt-3 gap-6 items-center">
          <UButton
            class="w-fit rounded-lg"
            icon="i-lucide-minus"
            @click="minus"
          ></UButton>
          <div class="flex gap-2.5 items-center ml-2">
            <img src="~/assets/svg/heart.svg" alt="heart" class="w-8" />
            <p class="text-xl font-medium text-[#313144]">{{ lifeCount }}</p>
          </div>
          <UButton
            class="w-fit rounded-lg"
            icon="i-lucide-plus"
            @click="plus"
          ></UButton>
        </div>
      </div>

      <UButton
        class="text-white w-fit bg-red-orange hover:bg-red-orange/80 py-2 h-fit"
      >
        {{ $t("you_have_5_lives") }} {{ getLifeLabel(4) }}

        <template #trailing>
          <img src="~/assets/svg/heart_white.svg" alt="diamond" />
        </template>
      </UButton>
    </div>

    <p class="py-6 text-base font-normal text-black/50">
      {{ $t("life_equals_100_tenge") }}
    </p>

    <UButton @click="isSuccessOpen = true">{{
      $t("buy_2_lives_200_tenge", {
        life: getLifeLabel(lifeCount),
        price: priceCount,
      })
    }}</UButton>

    <ModalsLifeSuccess v-model="isSuccessOpen" />
    <ModalsLifeError v-model="isErrorOpen" />
  </main>
</template>
