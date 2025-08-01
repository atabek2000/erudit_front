<script setup>
const isLangOpen = defineModel();
const emits = defineEmits(["submit"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
const closeModal = () => {
  isLangOpen.value = false;
};
</script>

<template>
  <UModal
    v-model:open="isLangOpen"
    :ui="{
      overlay: 'bg-black/70',
    }"
  >
    <template #content>
      <div class="p-4 md:p-10">
        <p class="text-2xl font-semibold text-mirage">{{ title }}</p>

        <div class="flex gap-2.5 mt-8">
          <UButton
            @click="closeModal"
            class="font-normal text-cod-gray bg-black/20 hover:bg-black/30"
          >
            {{ $t("no") }}
          </UButton>
          <UButton @click="emits('submit')">
            {{ $t("yes") }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
