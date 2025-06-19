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
      :items="[
        { label: $t('home'), to: '/' },
        { label: $t('forgot_password') },
      ]"
    />

    <div class="my-48 max-w-[424px] mx-auto">
      <h2 class="text-3xl font-semibold text-black">
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
        <UFormField :label="$t('password')" name="email" class="w-full">
          <UInput v-model="state.email" :placeholder="$t('enter_password')" />
        </UFormField>

        <UFormField :label="$t('password')" name="email" class="w-full">
          <UInput v-model="state.email" :placeholder="$t('enter_password')" />
        </UFormField>

        <UButton type="submit" class="mt-5" to="/">
          {{ $t("change") }}
        </UButton>
      </UForm>
    </div>
  </main>
</template>
