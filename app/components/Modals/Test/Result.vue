<script setup>
const emits = defineEmits(["submit"]);
const isOpen = defineModel();
const props = defineProps({
  right: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'md:max-w-[480px]' }">
    <template #content>
      <div class="py-10 px-14">
        <div class="flex gap-2">
          <div class="flex-1">
            <p class="text-2xl font-semibold text-mirage">
              {{ $t("test_passed") }}
            </p>
            <p class="text-base font-medium text-cod-gray/70 mt-2.5">
              {{ $t("correct_answers", { result: `${right}/${count}` }) }}
            </p>
          </div>
          <img src="/fire.png" alt="fire" width="70" height="70" />
        </div>

        <UButton @click="emits('submit')" class="mt-8">{{ $t("ok") }}</UButton>
      </div>
    </template>
  </UModal>
</template>
