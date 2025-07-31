<script setup>
import * as z from "zod";
const emits = defineEmits(["submit"]);
const props = defineProps({
  email: {
    type: String,
    default: "",
  },
});

const schema = z.object({
  code: z
    .array(z.string().regex(/^\d$/)) // каждая цифра — строка из одной цифры
    .length(4, "PIN-код должен содержать 4 цифры"),
});

const state = reactive({
  code: [],
});

const value = ref([]);

async function onSubmit() {
  emits("submit", state);
}
</script>

<template>
  <div class="mt-7 max-w-[424px] mx-auto">
    <h2 class="text-xl md:text-3xl font-semibold text-black">
      {{ $t("confirmation_code") }}
    </h2>

    <p class="text-sm font-normal text-dove-gray mt-3">
      {{ $t("enter_confirmation_code") }}
    </p>
    <p class="text-sm font-normal text-dove-gray">{{ email }}</p>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-4"
      @submit="onSubmit"
    >
      <UPinInput
        color="neutral"
        size="2xl"
        placeholder=""
        :length="4"
        type="number"
        class="my-4"
        otp
        v-model="value"
      />

      <UButton type="submit" class="mt-5">
        {{ $t("send") }}
      </UButton>
    </UForm>
  </div>
</template>
