<script setup>
import * as z from "zod";
const { deleteUser, profileEdit } = useCustomAuth();
const cookie_jwt = useCookie("jwt");
const { t } = useI18n();

const { data, refresh } = await useAsyncData(() =>
  $fetch(useRuntimeConfig().public.API_URL + "user/profile", {
    headers: {
      Authorization: `Bearer ${cookie_jwt.value}`,
    },
  })
);

const schema = {
  name: z.string().min(3, t("toast.invalid_fio")),
  email: z.string().email(t("toast.invalid_email")),
  password: z.string().min(3, t("toast.min_symbol", { min: 3 })),
};

const validate = (state) => {
  const errors = [];

  if (!schema.name.safeParse(state.name).success)
    errors.push({
      path: "name",
      message: t("toast.invalid_fio"),
    });

  if (!schema.email.safeParse(state.email).success) {
    errors.push({
      path: "email",
      message: t("toast.invalid_email"),
    });
  }

  if (!schema.password.safeParse(state.password).success || !state.password) {
    errors.push({
      path: "password",
      message: t("toast.min_symbol", { min: 3 }),
    });
  }

  return errors;
};

const state = reactive({
  name: data.value?.data.name,
  email: data.value?.data.email,
  password: "",
});

const deleteConfirm = ref(false);
const isPasswordVisible = ref(false);
const loading = ref(false);

const onChangeAvatar = async (e) => {
  const target = e.target;
  if (!target.files || target.files.length === 0) return;

  const file = target.files[0]; // Берем первый выбранный файл
  const formData = new FormData();
  formData.append("avatar", file);
  loading.value = true;
  await profileEdit(formData).then(async () => {
    await refresh();
  });
};

definePageMeta({
  layout: "menu",
});

const onSubmit = async () => {
  const user_data = {};
  if (data.value?.data?.name !== state.name) {
    user_data.name = state.name;
  }
  if (String(data.value?.data?.email) !== String(state.email)) {
    user_data.email = state.email || null;
  }
  if (state.password) {
    user_data.password = state.password;
  }
  await profileEdit(user_data).then(() => {
    refresh();
  });
};
</script>
<template>
  <main class="bg-white lg:rounded-xl p-4 md:px-8 md:py-6">
    <p class="text-xl font-semibold text-black">{{ $t("edit_profile") }}</p>
    <div class="mt-6 mb-4">
      <label
        for="avatar"
        class="mx-auto rounded-full flex items-center justify-center cursor-pointer"
        :style="`background:  linear-gradient(rgba(235, 237, 240, 0.5), rgba(235, 237, 240, 0.5)), url('/temp/ava.png') no-repeat center; width: 90px; height: 90px;`"
      >
        <img src="~/assets/svg/camera.svg" alt="camera" />
        <input
          type="file"
          class="hidden"
          accept="image/*"
          id="avatar"
          @change="onChangeAvatar"
        />
      </label>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4 mt-6"
        @submit="onSubmit"
      >
        <UFormField :label="$t('full_name')" name="name" class="w-full">
          <UInput v-model="state.name" :placeholder="$t('enter_full_name')" />
        </UFormField>

        <UFormField :label="$t('email')" name="email" class="w-full">
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
                <img
                  src="/eye_close.png"
                  alt="eye"
                  class="w-5 object-contain"
                />
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
      <ModalsConfirm
        v-model="deleteConfirm"
        :title="$t('delete_account')"
        @submit="deleteUser"
      />
    </div>
  </main>
</template>
