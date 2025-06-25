<script setup>
const isConfirmOpen = ref(false);
</script>

<template>
  <main class="py-10 bg-wild-sand-300">
    <div class="main-container">
      <div class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">История</p>
          <UButton class="md:w-fit px-5 text-sm" size="xs" variant="soft">{{
            $t("next_subject")
          }}</UButton>
        </div>

        <div class="flex justify-between items-center mt-6 flex-wrap gap-2">
          <p class="text-lg font-semibold text-mirage">Сұрақ №5</p>
          <div class="flex gap-2 items-center">
            <img src="~/assets/svg/alarm.svg" alt="icon" />
            <p class="text-lg font-medium text-mirage">40:00 мин</p>
          </div>
          <UButton
            v-if="$route.params.id == 1"
            :to="`/cabinet/test/item/${Number($route.params.id) + 1}`"
            class="md:w-fit px-5 text-sm"
            size="xs"
            >{{ $t("next_question") }}</UButton
          >
          <UButton
            v-else
            @click="isConfirmOpen = true"
            class="md:w-fit px-5 text-sm text-white bg-black hover:bg-black/80"
            size="xs"
            >{{ $t("finish_test") }}</UButton
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
              'bg-purple-heart/10  border-0': i < 10,
            }"
          >
            {{ i }}
          </button>
        </div>

        <WidgetsTestVariantSingle v-if="$route.params.id == 1" />
        <WidgetsTestVariantMultiple v-if="$route.params.id == 2" />
        <ModalsTestConfirm v-model="isConfirmOpen" />
      </div>
    </div>
  </main>
</template>
