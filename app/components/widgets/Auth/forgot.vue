<script setup>
import * as z from "zod";
const { t } = useI18n();

const emits = defineEmits(["submit"]);

const schema = z.object({
  email: z.string().email(t("toast.invalid_email")),
});

const state = reactive({
  email: "",
});

const isFormValid = computed(() => {
  return !schema.safeParse(state).success;
});

async function onSubmit() {
  emits("submit", state);
}
</script>

<template>
  <div class="mt-7 max-w-[424px] mx-auto">
    <h2 class="text-xl md:text-3xl font-semibold text-black">
      {{ $t("forgot_password") }}
    </h2>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-4"
      @submit="onSubmit"
    >
      <UFormField :label="$t('email')" name="email" class="w-full">
        <UInput v-model="state.email" :placeholder="$t('enter_email')" />
      </UFormField>

      <UButton type="submit" class="mt-5" :disabled="isFormValid">
        {{ $t("next") }}
      </UButton>
    </UForm>
  </div>
</template>
