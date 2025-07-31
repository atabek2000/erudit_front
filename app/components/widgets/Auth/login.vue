<script setup lang="ts">
import * as z from "zod";
import type { UserAuth } from "@/utils/types/user";

const emits = defineEmits(["submit"]);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Must be at least 8 characters"),
});

const state = reactive<UserAuth>({
  email: "",
  password: "",
});

async function onSubmit() {
  emits("submit", state);
}
</script>

<template>
  <div class="mt-6 max-w-[424px] mx-auto">
    <h2 class="text-xl md:text-3xl font-semibold text-black">
      {{ $t("login_to_account") }}
    </h2>

    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 mt-6"
      @submit="onSubmit"
    >
      <UFormField :label="$t('email')" name="email" class="w-full">
        <UInput v-model="state.email" :placeholder="$t('enter_email')" />
      </UFormField>

      <UFormField :label="$t('password')" name="password" class="mb-3">
        <UInput
          v-model="state.password"
          type="password"
          :placeholder="$t('enter_password')"
        />
      </UFormField>

      <nuxt-link
        to="/auth/forgot"
        class="block w-full text-end text-base font-normal text-primary m-0"
        >{{ $t("forgot_password") }}</nuxt-link
      >

      <UButton type="submit" class="mt-5">
        {{ $t("sign_in") }}
      </UButton>
    </UForm>

    <p class="text-base font-medium text-dove-gray mt-6 text-center">
      {{ $t("no_account") }}
      <nuxt-link to="/auth/register" class="text-primary">{{
        $t("register")
      }}</nuxt-link>
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
