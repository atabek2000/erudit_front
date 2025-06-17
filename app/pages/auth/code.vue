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

const value = ref([]);

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
        {{ $t("confirmation_code") }}
      </h2>

      <p class="text-sm font-normal text-dove-gray mt-3">
        {{ $t("enter_confirmation_code") }}
      </p>
      <p class="text-sm font-normal text-dove-gray">user12@gmail.com</p>

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
  </main>
</template>
