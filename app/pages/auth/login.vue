<script setup>
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event) {}
</script>

<template>
  <main class="main-container py-10">
    <UBreadcrumb
      separatorIcon="i-lucide-arrow-right"
      :items="[{ label: $t('home'), to: '/' }, { label: $t('login') }]"
    />

    <div class="mt-6 max-w-[424px] mx-auto">
      <h2 class="text-3xl font-semibold text-black">
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

        <UButton type="submit" class="mt-5" disabled>
          {{ $t("sign_in") }}
        </UButton>
      </UForm>

      <USeparator :label="$t('or_continue')" class="my-8" />

      <div class="flex gap-6">
        <UButton
          class="text-cod-gray bg-athens-gray hover:bg-athens-gray/60"
          size="sm"
        >
          <img src="~/assets/svg/apple.svg" alt="appls" />
          {{ $t("login_with_apple") }}
        </UButton>
        <UButton
          class="text-cod-gray bg-athens-gray hover:bg-athens-gray/60"
          size="sm"
        >
          <img src="~/assets/svg/google.svg" alt="appls" />

          {{ $t("login_with_google") }}
        </UButton>
      </div>
    </div>
  </main>
</template>
