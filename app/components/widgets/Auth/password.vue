<script setup>
import * as z from "zod";
const emits = defineEmits(["submit"]);
const { t } = useI18n();

const schema = z.object({
  password: z.string().min(3, t("toast.min_symbol", { min: 3 })),
  password_repeat: z.string().min(3, t("toast.min_symbol", { min: 3 })),
});

const state = reactive({
  password: "",
  password_repeat: "",
});

const isFormValid = computed(() => {
  return !schema.safeParse(state).success;
});

const isPasswordVisible = ref(false);
const isPasswordVisible2 = ref(false);

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
        <UInput
          v-model="state.password"
          :placeholder="$t('enter_password')"
          :type="isPasswordVisible ? 'text' : 'password'"
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

      <UFormField :label="$t('password')" name="password_repeat" class="w-full">
        <UInput
          v-model="state.password_repeat"
          :placeholder="$t('enter_password')"
          :type="isPasswordVisible2 ? 'text' : 'password'"
        >
          <template #trailing>
            <button
              v-if="!isPasswordVisible2"
              @click="isPasswordVisible2 = true"
              class="flex items-center bg-white"
            >
              <img src="/eye_close.png" alt="eye" class="w-5 object-contain" />
            </button>
            <button
              v-if="isPasswordVisible2"
              @click="isPasswordVisible2 = false"
              class="flex items-center"
            >
              <img src="/eye.png" alt="eye" class="w-5 object-contain" />
            </button>
          </template>
        </UInput>
      </UFormField>

      <UButton type="submit" class="mt-5" :disabled="isFormValid">
        {{ $t("change") }}
      </UButton>
    </UForm>
  </div>
</template>
