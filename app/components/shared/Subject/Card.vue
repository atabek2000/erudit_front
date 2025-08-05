<script setup>
const props = defineProps({
  subject: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <nuxt-link
    :to="`/cabinet/lessons?subject_id=${subject.id}`"
    class="border border-gray/30 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out cursor-pointer hover:scale-[1.02] hover:-translate-y-1.5"
  >
    <div class="bg-[#FFF1C7] flex justify-center items-center">
      <img
        :src="`${useRuntimeConfig().public.API_STORAGE}${subject.image}`"
        alt="img"
        class="w-full object-cover"
      />
    </div>
    <div class="px-4 py-5">
      <p class="text-sm font-medium text-cod-gray text-center">
        {{ subject.name }}
      </p>
    </div>
  </nuxt-link>
</template>
