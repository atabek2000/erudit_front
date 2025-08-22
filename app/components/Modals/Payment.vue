<script setup>
const isOpen = defineModel();
const props = defineProps({
  html: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <UModal v-model:open="isOpen" :ui="{ content: 'ring-0' }">
      <template #content>
        <div v-html="html"></div>
      </template>
    </UModal>
  </div>
</template>
