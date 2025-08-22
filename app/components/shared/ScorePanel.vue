<script setup>
const { point, live, diamond } = useAttribute();
const { hasPremium } = useCustomAuth();
</script>
<template>
  <div class="flex gap-x-6">
    <UPopover arrow>
      <button class="flex gap-2 cursor-pointer">
        <img src="~/assets/svg/star.svg" alt="star" />
        <p class="text-lg font-semibold text-selective-yellow-600">
          {{ point().value }}
        </p>
      </button>
      <template #content>
        <div class="px-4 py-3 flex gap-3">
          <div class="">
            <p class="text-sm font-semibold text-black">
              {{ getPointsLabel(point().value) }}
            </p>
            <p class="text-xs font-normal text-black">
              {{ $t("complete_lessons") }}
            </p>
          </div>
          <img src="~/assets/svg/star.svg" alt="star" width="32" height="32" />
        </div>
      </template>
    </UPopover>
    <UPopover v-if="!hasPremium" arrow>
      <button class="flex gap-2 cursor-pointer">
        <img src="~/assets/svg/heart.svg" alt="star" />
        <p class="text-lg font-semibold text-red-orange">{{ live().value }}</p>
      </button>
      <template #content>
        <div class="px-4 py-3">
          <div class="flex gap-3 justify-between">
            <div class="">
              <p class="text-sm font-semibold text-black">
                {{ $t("lives") }}
              </p>
              <p
                v-if="live().value == 5"
                class="text-xs font-normal text-black"
              >
                {{ $t("your_life_reserve") }}
              </p>
              <p v-else class="text-xs font-normal text-black">
                {{ $t("you_have_5_lives") }} {{ getLifeLabel(live().value) }}
              </p>
            </div>
            <img
              src="~/assets/svg/heart.svg"
              alt="heart"
              width="32"
              height="32"
            />
          </div>
          <div class="mt-3 space-y-2 max-w-[240px]">
            <UButton size="xs" to="/cabinet/diamonds">
              {{ $t("exchange_diamonds_for_lives") }}</UButton
            >
            <UButton
              to="/cabinet/lifes"
              size="xs"
              class="bg-purple-heart/10 hover:bg-purple-heart/20 text-purple-heart"
            >
              {{ $t("buy_lives") }}</UButton
            >
            <UButton
              to="/cabinet/premium"
              size="xs"
              class="bg-gradient-to-r from-purple-heart to-dodger-blue hover:from-purple-heart-600 hover:to-dodger-blue/60"
            >
              {{ $t("refill_lives") }}</UButton
            >
          </div>
        </div>
      </template>
    </UPopover>
    <UPopover arrow>
      <button class="flex gap-2 cursor-pointer">
        <img src="~/assets/svg/diamond.svg" alt="star" />
        <p class="text-lg font-semibold text-dodger-blue-600">
          {{ diamond().value }}
        </p>
      </button>
      <template #content>
        <div class="px-4 py-3">
          <div class="flex gap-3 justify-between">
            <div class="">
              <p class="text-sm font-semibold text-black">
                {{ $t("diamonds") }}
              </p>
              <p class="text-xs font-normal text-black">
                {{ $t("you_have_120_diamonds") }}
                {{ getDiamondsLabel(diamond().value) }}
              </p>
            </div>
            <img
              src="~/assets/svg/diamond.svg"
              alt="diamond"
              width="28"
              height="28"
            />
          </div>
          <div v-if="!hasPremium" class="mt-3 space-y-2 max-w-[240px]">
            <UButton size="xs" to="/cabinet/diamonds">
              {{ $t("exchange_diamonds_for_lives_btn") }}</UButton
            >
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
