<script setup>
const isOpen = defineModel();
const emits = defineEmits(["submit"]);
const props = defineProps({
  hasExitButton: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :dismissible="!hasExitButton"
    :ui="{ content: 'md:max-w-[480px]' }"
  >
    <template #content>
      <div class="py-10 px-14">
        <p class="text-2xl font-semibold text-mirage">
          ⏳ {{ $t("lost_all_lives") }}
        </p>
        <p class="text-base font-medium text-cod-gray">
          {{ $t("one_returns", { time: "4:00 min" }) }}
        </p>
        <div class="flex flex-col gap-2 mt-8">
          <UButton to="/cabinet/diamonds">
            {{ $t("exchange_diamonds_for_lives") }}</UButton
          >
          <UButton
            to="/cabinet/lifes"
            class="bg-gradient-to-r from-purple-heart to-dodger-blue hover:from-purple-heart-600 hover:to-dodger-blue/60"
          >
            {{ $t("refill_lives") }}</UButton
          >
          <UButton
            v-if="hasExitButton"
            to="/cabinet/subjects"
            class="bg-silver hover:bg-silver text-cod-gray"
          >
            {{ $t("exit_test") }}</UButton
          >
        </div>
      </div>
    </template></UModal
  >
</template>
