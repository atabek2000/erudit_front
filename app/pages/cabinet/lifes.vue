<script setup>
const { live } = useAttribute();
const { useAuthUser, fetchUser } = useCustomAuth();
const { data: items } = await useAPI(`list/items`, {});

definePageMeta({
  layout: "menu",
});

const user = useAuthUser();
const lifeCount = ref(1);
const priceCount = ref(100);
const isSuccessOpen = ref(false);
const isErrorOpen = ref(false);
const liveItem = computed(() =>
  items.value?.data.find((item) => item.type === "live")
);

const plus = () => {
  if (lifeCount.value < 5) {
    lifeCount.value++;
    priceCount.value += liveItem.value?.amount;
  }
};
const minus = () => {
  if (lifeCount.value > 1) {
    lifeCount.value--;
    priceCount.value -= liveItem.value?.amount;
  }
};

const getPaymentForm = async () => {
  if (!priceCount.value) {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: t("select_plan"),
    });
    return;
  }
  const body = {
    entity_id: liveItem.value?.id,
    entity_type: "App\\Models\\AttributeItem",
    amount: priceCount.value,
    count: lifeCount.value,
  };
  useFetchApi("payment/init", {
    method: "POST",
    body: body,
  }).then((res) => {
    openPaymentWidgetHandler(res?.data);
  });
};

function openPaymentWidgetHandler(order_data) {
  const pay_data = {
    api_key: order_data?.data?.PAYMENT_API_KEY,
    amount: toRaw(priceCount.value),
    currency: "KZT",
    order_id: `${order_data?.order?.id}`,
    payment_type: "pay",
    payment_method: "ecom",
    items: [
      {
        merchant_id: order_data?.data?.PAYMENT_MID,
        service_id: order_data?.data?.PAYMENT_SID,
        merchant_name: "Erudit Web",
        name: `Оплата за покупку жизни на ${priceCount.value}тг`,
        quantity: 1,
        amount_one_pcs: 1,
        amount_sum: toRaw(priceCount.value),
      },
    ],
    user_id: String(user.value.id),
    email: toRaw(user.value.email),
    success_url: toRaw(order_data?.success_url),
    payment_lifetime: 600,
    create_recurrent_profile: false,
    recurrent_profile_lifetime: 0,
    lang: "ru",
    extra_params: {
      user: JSON.stringify(toRaw(user.value)),
    },
    payment_gateway_host: order_data?.data?.PAYMENT_HOST,
    payment_widget_host: "https://widget.paysage.kz",
  };

  openPaymentWidget(
    pay_data,
    (success) => {
      console.log(success);
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <main class="bg-white lg:rounded-xl p-4 md:px-8 md:py-6">
    <p class="text-xl font-semibold text-black">
      {{ $t("buy_lives") }}
    </p>
    <p class="text-base font-normal text-scorpion mt-2">
      {{ $t("refill_lives") }}
    </p>

    <div
      class="mt-6 flex flex-col-reverse md:flex-row gap-3 justify-between md:items-center"
    >
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
            :disabled="lifeCount + live().value >= 5"
          ></UButton>
        </div>
      </div>

      <UButton
        class="text-white w-fit bg-red-orange hover:bg-red-orange/80 active:bg-red-orange/80 py-2 h-fit"
      >
        {{ $t("you_have_5_lives") }} {{ getLifeLabel(live().value) }}

        <template #trailing>
          <img src="~/assets/svg/heart_white.svg" alt="diamond" />
        </template>
      </UButton>
    </div>

    <p class="py-6 text-base font-normal text-black/50">
      {{ $t("life_equals_100_tenge") }}
    </p>

    <UButton @click="getPaymentForm">{{
      $t("buy_2_lives_200_tenge", {
        life: getLifeLabel(lifeCount),
        price: priceCount,
      })
    }}</UButton>

    <ModalsLifeSuccess v-model="isSuccessOpen" />
    <ModalsLifeError v-model="isErrorOpen" />
  </main>
</template>
