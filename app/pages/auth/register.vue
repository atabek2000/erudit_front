<script setup lang="ts">
import type { UserAuth } from "@/utils/types/user";
const { registration } = useCustomAuth();

const onSubmit = async (data: UserAuth) => {
  await registration(data).then(() => {
    useRouter().push("/cabinet/subjects");
  });
};
</script>

<template>
  <main class="main-container py-10">
    <UBreadcrumb
      separatorIcon="i-lucide-arrow-right"
      :items="[{ label: $t('home'), to: '/' }, { label: $t('sign_up') }]"
    />
    <WidgetsAuthRegister @submit="onSubmit" />
  </main>
</template>
