<script setup>
const isOpen = defineModel();
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'ring-0' }">
    <template #content>
      <div
        class="p-5 bg-gradient-to-b from-electric-violet-700 via-electric-violet-600 to-medium-purple text-white rounded-2xl"
      >
        <button class="block ml-auto cursor-pointer" @click="isOpen = false">
          <UIcon name="i-lucide-x" class="size-6" />
        </button>
        <div class="px-8 pb-8">
          <p class="text-2xl font-semibold">{{ $t("erudit_premium") }}</p>
          <p class="text-base font-medium text-white/70 mt-2.5">
            {{ $t("premium_prepare_4x_faster") }}
          </p>

          <p
            class="text-base font-semibold flex justify-between items-center mt-6"
          >
            {{ $t("unlimited_lives_feature") }}
            <UIcon name="i-lucide-check" class="text-tundora size-6" />
          </p>
          <p
            class="text-base font-semibold flex justify-between items-center mt-5"
          >
            {{ $t("unlimited_test_attempts") }}
            <UIcon name="i-lucide-check" class="text-tundora size-6" />
          </p>
          <p
            class="text-base font-semibold flex justify-between items-center mt-5"
          >
            {{ $t("mistake_analysis") }}
            <UIcon name="i-lucide-check" class="text-tundora size-6" />
          </p>
          <UButton
            @click="isOpen = false"
            to="/cabinet/premium/plans"
            class="mt-8 py-3 bg-white hover:bg-white text-cod-gray"
            >{{ $t("try_free") }}</UButton
          >
        </div>
      </div>
    </template>
  </UModal>
</template>
