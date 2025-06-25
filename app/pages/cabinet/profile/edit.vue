<script setup>
import * as z from "zod";

const schema = z.object({
  fio: z.string().min(3, "Must be at least 8 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  fio: "",
  password: "",
});

const deleteConfirm = ref(false);

definePageMeta({
  layout: "menu",
});

const onSubmit = (event) => {};
</script>
<template>
  <main class="p-4 md:px-8 md:py-6">
    <p class="text-xl font-semibold text-black">{{ $t("edit_profile") }}</p>
    <div class="mt-6 mb-4">
      <label
        for="avatar"
        class="mx-auto rounded-full flex items-center justify-center cursor-pointer"
        :style="`background:  linear-gradient(rgba(235, 237, 240, 0.5), rgba(235, 237, 240, 0.5)), url('/temp/ava.png') no-repeat center; width: 90px; height: 90px;`"
      >
        <img src="~/assets/svg/camera.svg" alt="camera" />
        <input type="file" class="hidden" id="avatar" />
      </label>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 mt-6"
        @submit="onSubmit"
      >
        <UFormField :label="$t('full_name')" name="fio" class="w-full">
          <UInput v-model="state.fio" :placeholder="$t('enter_full_name')" />
        </UFormField>

        <UFormField :label="$t('password')" name="password" class="mb-3">
          <UInput
            v-model="state.password"
            type="password"
            :placeholder="$t('enter_password')"
          />
        </UFormField>
        <UButton type="submit" class="mt-5">
          {{ $t("save") }}
        </UButton>
        <UButton
          @click="deleteConfirm = true"
          class="text-dove-gray font-normal"
          variant="ghost"
        >
          {{ $t("delete_account") }}
        </UButton>
      </UForm>
      <ModalsConfirm v-model="deleteConfirm" :title="$t('delete_account')" />
    </div>
  </main>
</template>
