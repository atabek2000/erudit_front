<script setup>
const isOpen = defineModel();
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #content>
      <div class="p-10">
        <div class="flex gap-3 justify-between">
          <div>
            <p class="text-2xl font-semibold text-mirage">
              {{ $t("payment_success") }}
            </p>
            <p class="text-base font-medium text-cod-gray/70 mt-2.5">
              {{ $t("lifes_added") }}
            </p>
          </div>
          <div>
            <img src="/heart.png" alt="heart" />
          </div>
        </div>

        <UButton class="mt-8" @click="isOpen = false"> Ok </UButton>
      </div>
    </template>
  </UModal>
</template>
