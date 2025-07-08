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

        <UButton type="submit" class="mt-5" to="/auth/code">
          {{ $t("next") }}
        </UButton>
      </UForm>
    </div>
  </main>
</template>
