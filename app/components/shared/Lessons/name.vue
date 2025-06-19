<script setup>
const props = defineProps({
  background: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="px-5 py-4 rounded-xl w-fit"
    :style="{ background: background || '#FFEBF8' }"
  >
    <p class="text-lg font-semibold text-black">{{ title }}</p>
    <p class="text-base font-normal text-scorpion mt-2">{{ text }}</p>
  </div>
</template>
