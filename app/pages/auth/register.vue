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
      :items="[{ label: $t('home'), to: '/' }, { label: $t('sign_up') }]"
    />

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
        <UFormField :label="$t('full_name')" name="fio" class="w-full">
          <UInput v-model="state.fio" :placeholder="$t('enter_full_name')" />
        </UFormField>

        <UFormField :label="$t('email')" name="email" class="mb-3">
          <UInput v-model="state.email" :placeholder="$t('enter_email')" />
        </UFormField>

        <UButton type="submit" class="mt-5" to="/cabinet/subjects">
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
  </main>
</template>
