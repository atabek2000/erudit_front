<script setup>
import * as z from "zod";
const emits = defineEmits(["submit"]);

const schema = z.object({
  password: z.string().min(3, "Must be at least 8 characters"),
  password_repeat: z.string().min(3, "Must be at least 8 characters"),
});

const state = reactive({
  password: "",
  password_repeat: "",
});

async function onSubmit() {
  emits("submit", state);
}
</script>

<template>
  <div class="mt-7 max-w-[424px] mx-auto">
    <h2 class="text-xl md:text-3xl font-semibold text-black">
      {{ $t("password_recovery") }}
    </h2>
    <p class="text-sm font-normal text-dove-gray mt-2">
      {{ $t("create_password_description") }}
    </p>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-4"
      @submit="onSubmit"
    >
      <UFormField :label="$t('password')" name="password" class="w-full">
        <UInput v-model="state.password" :placeholder="$t('enter_password')" />
      </UFormField>

      <UFormField :label="$t('password')" name="password_repeat" class="w-full">
        <UInput
          v-model="state.password_repeat"
          :placeholder="$t('enter_password')"
        />
      </UFormField>

      <UButton type="submit" class="mt-5">
        {{ $t("change") }}
      </UButton>
    </UForm>
  </div>
</template>
