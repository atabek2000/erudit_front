<script setup>
import * as z from "zod";
const emits = defineEmits(["submit"]);
const { t } = useI18n();

const props = defineProps({
  email: {
    type: String,
    default: "",
  },
});

const schema = z.object({
  code: z
    .array(z.number().int().min(0).max(9))
    .length(4, t("toast.min_symbol", { min: 4 })),
});

const state = reactive({
  code: [],
});

const isFormValid = computed(() => {
  return !schema.safeParse(state).success;
});

async function onSubmit() {
  emits("submit", { email: props.email, code: state.code.join("") });
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
      <UFormField name="code" class="w-full">
        <UPinInput
          color="neutral"
          size="2xl"
          placeholder=""
          :length="4"
          type="number"
          class="my-4"
          otp
          v-model="state.code"
        />
      </UFormField>
      <UButton type="submit" class="mt-5" :disabled="isFormValid">
        {{ $t("send") }}
      </UButton>
    </UForm>
  </div>
</template>
