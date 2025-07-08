<script setup>
const isErrorOpen = ref(false);
const isResultOpen = ref(false);

const onContinue = () => {
  isErrorOpen.value = false;
  isResultOpen.value = true;
};
</script>

<template>
  <main class="py-0 lg:py-10 bg-wild-sand-300">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 lg:pt-0">
      <div class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">История</p>
          <SharedScorePanel
            score="10"
            life="6"
            diamond="8"
            class="hidden lg:flex"
          />
        </div>

        <div class="flex justify-between items-center mt-6 flex-wrap gap-2">
          <p class="text-lg font-semibold text-mirage">Сұрақ №5</p>
          <div class="flex gap-2 items-center">
            <img src="~/assets/svg/alarm.svg" alt="icon" />
            <p class="text-lg font-medium text-mirage">40:00 мин</p>
          </div>
          <UButton
            @click="isErrorOpen = true"
            class="hidden md:block md:w-fit px-5"
            size="sm"
            >{{ $t("next_question") }}</UButton
          >
        </div>

        <div
          class="flex gap-3 overflow-x-auto pb-4 scrollbar-thin select-none mt-6"
        >
          <button
            v-for="i in 40"
            :key="i"
            class="w-9 min-w-9 h-9 rounded-lg cursor-pointer text-sm font-normal text-finn text-cod-gray border border-alto flex justify-center items-center"
            :class="{
              'bg-emerald text-white border-0': i % 2 === 1 && i < 10,
              'bg-radical-red text-white border-0': i % 2 === 0 && i < 10,
            }"
          >
            {{ i }}
          </button>
        </div>

        <WidgetsTestVariantSingle />

        <div class="flex gap-3 md:hidden">
          <UButton
            @click="isErrorOpen = true"
            class="md:w-fit px-5 bg-purple-heart/10 hover:bg-purple-heart/20 text-cod-gray"
            size="sm"
            >{{ $t("prev_btn") }}</UButton
          >
          <UButton
            @click="isErrorOpen = true"
            class="md:w-fit px-5"
            size="sm"
            >{{ $t("next_btn") }}</UButton
          >
        </div>
        <ModalsTestError v-model="isErrorOpen" @onContinue="onContinue" />
        <ModalsTestResult v-model="isResultOpen" />
      </div>
    </div>
  </main>
</template>
