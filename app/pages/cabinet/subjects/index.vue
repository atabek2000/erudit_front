<script setup>
const { fetchUser } = useCustomAuth();
const { data } = await useAPI("list/subjects", {
  params: {
    type: "test",
  },
});

onMounted(async () => {
  await fetchUser();
});

definePageMeta({
  layout: "menu",
});
</script>

<template>
  <main class="">
    <WidgetsCabinetPremiumBlock class="lg:hidden" />
    <div class="bg-white lg:rounded-xl p-4 lg:px-8 lg:py-6 mt-2">
      <div class="flex justify-between">
        <p class="text-xl font-semibold text-black">{{ $t("subjects") }}</p>
        <SharedScorePanel class="hidden lg:flex" />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-6 gap-x-8 gap-y-6">
        <SharedSubjectCard
          v-for="sbj in data?.data"
          :key="sbj.id"
          :subject="sbj"
        />
      </div>
    </div>
  </main>
</template>
