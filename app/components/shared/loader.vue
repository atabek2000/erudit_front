<script setup>
const { loading } = useLoader();
</script>
<template>
  <div
    v-if="loading().value"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/10"
    style="z-index: 10000"
  >
    <UIcon
      name="i-lucide-loader-circle"
      class="text-4xl text-punch animate-spin w-20 h-20"
    />
  </div>
</template>
