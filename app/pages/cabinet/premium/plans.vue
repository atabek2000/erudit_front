<script setup>
const { locale, t } = useI18n();
const { startLoading, stopLoading } = useLoader();
const { data: plans } = await useAPI(`list/subscribes`, {
  watch: [locale],
});
const { useAuthUser, fetchUser } = useCustomAuth();
const user = useAuthUser();
const premiumId = computed(() => user.value?.subscribe?.id || 0);

const payment_html = ref("");
const isPaymentOpen = ref(false);

const selected_plan = ref(0);
const isConfirmOpen = ref(false);
const getPaymentForm = async () => {
  if (!selected_plan.value) {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: t("select_plan"),
    });
    return;
  }
  const body = {
    subscribe_id: selected_plan.value,
    amount: plans.value.data.find((plan) => plan.id === selected_plan.value)
      .amount,
    days: plans.value.data.find((plan) => plan.id === selected_plan.value).days,
  };
  useFetchApi("payment", {
    method: "POST",
    body: body,
  }).then((res) => {
    // console.log(res);

    payment_html.value = res;
    isPaymentOpen.value = true;
  });
};

const cancelPayment = async () => {
  isConfirmOpen.value = false;
  startLoading();
  await useFetchApi("payment/cancel", {
    method: "POST",
    body: {
      subscribe_id: premiumId.value,
    },
  })
    .then(async (res) => {
      await fetchUser();

      useToast().add({
        title: t("toast.success"),
        description: t("payment_cancelled"),
        color: "green",
      });
    })
    .finally(() => {
      stopLoading();
    });
};

definePageMeta({
  layout: "premium",
});
</script>
<template>
  <main class="min-h-screen">
    <div class="rounded-xl p-4 md:py-6 md:px-8 text-white bg-white/10">
      <p class="text-xl font-semibold text-center">
        {{ $t("choose_subscription") }}
      </p>

      <div class="max-w-[426px] mx-auto space-y-4">
        <button
          v-for="plan in plans?.data"
          :key="plan.price"
          @click="selected_plan = plan.id"
          class="mt-6 relative border-2 rounded-xl cursor-pointer w-full text-cod-gray flex justify-between items-center px-5 py-4 text-base font-normal"
          :class="
            premiumId === plan.id
              ? 'current_plan border-white text-white'
              : 'bg-white border-selective-yellow'
          "
        >
          <p>
            {{ plan.title }}
            {{ plan.month_amount != plan.amount ? ` - ${plan.amount} ₸` : "" }}
          </p>
          <div class="">
            <p class="text-ms font-medium">{{ plan.month_amount }} ₸ / мес</p>
            <p v-if="premiumId === plan.id" class="text-xs font-normal mt-1">
              {{ $t("current_plan") }}
            </p>
          </div>

          <img
            v-if="selected_plan === plan.id"
            src="~/assets/svg/check/purple.svg"
            alt="check"
            class="absolute -right-2 -top-2"
          />
        </button>

        <div v-if="user?.subscribe">
          <UButton
            @click="getPaymentForm"
            class="bg-white hover:bg-white/80 mt-6 text-purple-heart"
            >{{ $t("subscribe") }}</UButton
          >
          <UButton
            @click="isConfirmOpen = true"
            class="mt-1 text-white"
            variant="ghost"
            >{{ $t("cancel_subscription") }}</UButton
          >
          <ModalsConfirm
            v-model="isConfirmOpen"
            :title="$t('cancel_subscription_confirm')"
            @submit="cancelPayment"
          />
        </div>
        <UButton
          v-else
          @click="getPaymentForm"
          class="bg-white hover:bg-white/80 mt-6 text-purple-heart"
          >{{ $t("start_7_days_free") }}</UButton
        >
        <ModalsPayment v-model="isPaymentOpen" :html="payment_html" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.current_plan {
  background: linear-gradient(90deg, #b224ef 0%, #7579ff 100%);
}
</style>
