<script setup lang="ts">
const { resetPassword, verifyResetCode, changePassword } = useCustomAuth();
enum Block {
  form = "form",
  code = "code",
  password = "password",
}
const openedBlock = ref<Block>(Block.form);

const email = ref<string>("");

const onSubmitEmail = (data: { email: string }) => {
  email.value = data.email;
  resetPassword(data).then(() => {
    openedBlock.value = Block.code;
  });
};
const onSubmitCode = (data: { code: string }) => {
  verifyResetCode(data).then(() => {
    openedBlock.value = Block.password;
  });
};
const onSubmitPassword = (data: { password: string }) => {
  changePassword(data).then(() => {
    useRouter().push("/auth/login");
  });
};
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
    <WidgetsAuthForgot
      v-if="openedBlock === Block.form"
      @submit="onSubmitEmail"
    />
    <WidgetsAuthCode
      v-else-if="openedBlock === Block.code"
      @submit="onSubmitCode"
      :email="email"
    />
    <WidgetsAuthPassword
      v-else-if="openedBlock === Block.password"
      @submit="onSubmitPassword"
      :email="email"
    />
  </main>
</template>
