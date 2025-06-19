<script setup>
const isOpen = defineModel();
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-3">
        <button
          class="flex ml-auto p-1 rounded-full bg-wild-sand cursor-pointer"
          @click="isOpen = false"
        >
          <UIcon name="i-lucide-x" class="size-4 text-scorpion" />
        </button>
        <div class="px-10 pb-10">
          <p class="text-2xl font-semibold text-mirage">
            {{ $t("exchange_successful") }}
          </p>
          <p class="text-base font-medium text-cod-gray/70 mt-2.5">
            {{ $t("exchanged_30_diamonds_for_3_lives") }}
          </p>
          <p class="text-base font-medium text-cod-gray/70">
            {{ $t("remaining_balance") }}
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
