<script setup>
definePageMeta({
  layout: "menu",
});

const subjects = ref([
  {
    id: 1,
    name: "Математика",
  },
  {
    id: 2,
    name: "Русский",
  },
  {
    id: 3,
    name: "Английский",
  },
]);

const selectedSubject = ref(subjects.value[0].id);
</script>

<template>
  <main class="p-4 md:px-8 md:py-6">
    <div class="flex justify-between">
      <p class="text-xl font-semibold text-black">
        {{ $t("work_on_mistakes") }}
      </p>
      <SharedFilterDropdown
        v-model="selectedSubject"
        :label="'Английский'"
        :items="subjects"
        class="w-fit"
      />
    </div>
    <div class="my-6">
      <p class="text-xl font-semibold text-black text-center">126 / 140</p>
      <p class="text-base font-normal text-scorpion mt-1.5 text-center">
        {{ $t("result") }}
      </p>
    </div>
    <UButton>{{ $t("retake") }}</UButton>
  </main>
</template>
