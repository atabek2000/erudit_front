<script setup>
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
        <SharedScorePanel
          score="10"
          life="6"
          diamond="8"
          class="hidden lg:flex"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-6 gap-x-8 gap-y-6">
        <SharedSubjectCard v-for="i in 10" :key="i" />
      </div>
    </div>
  </main>
</template>
