<script setup lang="ts">
import type { UserAuth } from "@/utils/types/user";
const { login } = useCustomAuth();

const onSubmit = async (data: UserAuth): void => {
  await login(data).then(() => {
    useRouter().push("/cabinet/subjects");
  });
};
</script>

<template>
  <main class="main-container py-10">
    <UBreadcrumb
      separatorIcon="i-lucide-arrow-right"
      :items="[{ label: $t('home'), to: '/' }, { label: $t('login') }]"
    />

    <WidgetsAuthLogin @submit="onSubmit" />
  </main>
</template>
