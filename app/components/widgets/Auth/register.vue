<script setup lang="ts">
import * as z from "zod";
import type { UserAuth } from "@/utils/types/user";
const emits = defineEmits(["submit"]);
const { t } = useI18n();

const schema = z.object({
  name: z.string().min(3, t("toast.invalid_fio")),
  email: z.string().email(t("toast.invalid_email")),
  password: z.string().min(3, t("toast.min_symbol", { min: 3 })),
});

const state = reactive<UserAuth>({
  name: "",
  email: "",
  password: "",
});

const isFormValid = computed(() => {
  return !schema.safeParse(state).success;
});
const isPasswordVisible = ref(false);

async function onSubmit() {
  emits("submit", state);
}
</script>

<template>
  <div class="mt-6 max-w-[424px] mx-auto">
    <h2 class="text-xl md:text-3xl font-semibold text-black">
      {{ $t("create_account") }}
    </h2>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-6"
      @submit="onSubmit"
    >
      <UFormField :label="$t('full_name')" name="name" class="w-full">
        <UInput v-model="state.name" :placeholder="$t('enter_full_name')" />
      </UFormField>

      <UFormField :label="$t('email')" name="email" class="mb-3">
        <UInput v-model="state.email" :placeholder="$t('enter_email')" />
      </UFormField>

      <UFormField :label="$t('password')" name="password" class="mb-3">
        <UInput
          v-model="state.password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :placeholder="$t('enter_password')"
        >
          <template #trailing>
            <button
              v-if="!isPasswordVisible"
              @click="isPasswordVisible = true"
              class="flex items-center bg-white"
            >
              <img src="/eye_close.png" alt="eye" class="w-5 object-contain" />
            </button>
            <button
              v-if="isPasswordVisible"
              @click="isPasswordVisible = false"
              class="flex items-center"
            >
              <img src="/eye.png" alt="eye" class="w-5 object-contain" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <UButton type="submit" class="mt-5" :disabled="isFormValid">
        {{ $t("sign_up") }}
      </UButton>
    </UForm>

    <p class="text-sm font-normal text-dusty-gray mt-3">
      {{ $t("terms_agreement") }}
      <nuxt-link to="/auth/login" class="text-shark">{{
        $t("privacy_policy")
      }}</nuxt-link>
      {{ $t("data_processing_consent") }}
    </p>

    <USeparator :label="$t('or_continue')" class="my-8" />

    <div class="flex gap-6">
      <UButton
        class="text-cod-gray text-xs md:text-sm bg-athens-gray hover:bg-athens-gray/60"
        size="sm"
      >
        <img src="~/assets/svg/apple.svg" alt="appls" />
        {{ $t("login_with_apple") }}
      </UButton>
      <UButton
        class="text-cod-gray text-xs md:text-sm bg-athens-gray hover:bg-athens-gray/60"
        size="sm"
      >
        <img src="~/assets/svg/google.svg" alt="appls" />

        {{ $t("login_with_google") }}
      </UButton>
    </div>
  </div>
</template>
