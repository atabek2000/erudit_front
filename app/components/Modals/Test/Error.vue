<script setup>
const isOpen = defineModel();
const emits = defineEmits(["onContinue"]);
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'md:max-w-[480px]' }">
    <template #content>
      <div class="py-10 px-14">
        <div class="flex gap-2 justify-center">
          <img
            v-for="i in 5"
            :key="i"
            src="~/assets/svg/heart.svg"
            alt="heart"
            class="w-8"
          />
        </div>

        <p class="text-2xl font-semibold text-mirage mt-6">
          {{ $t("mistake_costs_life") }}
        </p>
        <p class="text-base font-medium text-cod-gray/70 mt-2.5">
          {{ $t("collect_be_careful") }}
        </p>

        <UButton @click="emits('onContinue')" class="mt-8">{{
          $t("continue")
        }}</UButton>
      </div>
    </template>
  </UModal>
</template>
