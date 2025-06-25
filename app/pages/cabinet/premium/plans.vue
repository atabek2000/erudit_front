<script setup>
definePageMeta({
  layout: "premium",
});

const selected_plan = ref(0);

const plans = [
  {
    title: "1_month",
    price: "4 999 т",
  },
  {
    title: "3_months",
    price: "4 667 ₸ / мес",
  },
  {
    title: "6_months",
    price: "4 250 ₸ / мес",
  },
  {
    title: "9_months",
    price: "4 000 ₸ / мес",
  },
  {
    title: "12_months",
    price: "3 750 ₸ / мес",
  },
];

const isConfirmOpen = ref(false);
</script>
<template>
  <main class="min-h-screen">
    <div class="rounded-xl p-4 md:py-6 md:px-8 text-white bg-white/10">
      <p class="text-xl font-semibold text-center">
        {{ $t("choose_subscription") }}
      </p>

      <div class="max-w-[426px] mx-auto space-y-4">
        <button
          v-for="(plan, index) in plans"
          :key="plan.price"
          @click="selected_plan = index"
          class="mt-6 bg-white relative border-2 border-selective-yellow rounded-xl cursor-pointer w-full text-cod-gray flex justify-between px-5 py-4 text-base font-normal"
        >
          {{ $t(plan.title) }}
          <span class="text-ms font-medium">
            {{ plan.price }}
          </span>

          <img
            v-if="selected_plan === index"
            src="~/assets/svg/check/purple.svg"
            alt="check"
            class="absolute -right-2 -top-2"
          />
        </button>
        <UButton class="bg-white hover:bg-white/80 mt-6 text-purple-heart">{{
          $t("start_7_days_free")
        }}</UButton>
        <UButton class="bg-white hover:bg-white/80 mt-6 text-purple-heart">{{
          $t("subscribe")
        }}</UButton>
        <UButton
          @click="isConfirmOpen = true"
          class="mt-1 text-white"
          variant="ghost"
          >{{ $t("cancel_subscription") }}</UButton
        >
        <ModalsConfirm
          v-model="isConfirmOpen"
          :title="$t('cancel_subscription_confirm')"
        />
      </div>
    </div>
  </main>
</template>
