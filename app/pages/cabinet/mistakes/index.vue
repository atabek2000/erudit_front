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
  <main class="bg-white lg:rounded-xl p-4 md:px-8 md:py-6">
    <div class="flex justify-between">
      <div>
        <p class="text-xl font-semibold text-black">
          {{ $t("work_on_mistakes") }}
        </p>
        <p class="mt-2 text-base font-normal text-scorpion">
          {{ $t("mistake_choose_subject") }}
        </p>
      </div>
      <SharedFilterDropdown
        v-model="selectedSubject"
        :label="'Английский'"
        :items="subjects"
        class="w-fit"
      />
    </div>

    <UButton class="mt-6" to="/cabinet/mistakes/test/1">{{
      $t("retake")
    }}</UButton>
  </main>
</template>
