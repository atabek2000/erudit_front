<script setup>
const { t } = useI18n();
definePageMeta({
  layout: "menu",
});

const columns = [
  { accessorKey: "id", header: "№" },
  {
    accessorKey: "fullName",
    header: t("name_surname"),
    meta: { class: { td: "text-center" } },
  },
  {
    accessorKey: "score",
    header: t("pointss"),
    meta: { class: { td: "text-dodger-blue-600" } },
  },
];

const table = ref([
  {
    id: 1,
    fullName: "Аружан Нурланқызы",
    score: "200 XP",
  },
  {
    id: 2,
    fullName: "Арманова Айгуль",
    score: "100 XP",
  },
  {
    id: 3,
    fullName: "Аскаров Айдос",
    score: "90 XP",
  },
  {
    id: 4,
    fullName: "Әсел Куаныш",
    score: "80 XP",
  },
  {
    id: 5,
    fullName: "Мадияр Талгат",
    score: "70 XP",
  },
  {
    id: 6,
    fullName: "Алтынай Саматқызы",
    score: "60 XP",
  },
  {
    id: 7,
    fullName: "Рауан Әли",
    score: "50 XP",
  },
]);

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

const periods = ref([
  {
    id: 1,
    name: t("by_days"),
  },
  {
    id: 2,
    name: t("by_weeks"),
  },
  {
    id: 3,
    name: t("by_months"),
  },
]);

const selectedSubject = ref(subjects.value[0].id);
const periodPeriod = ref(subjects.value[0].id);
</script>

<template>
  <main class="px-8 py-6 bg-white rounded-xl">
    <div class="flex justify-between flex-col md:flex-row">
      <div class="">
        <p class="text-xl font-semibold text-black">{{ $t("rating") }}</p>
        <p class="text-base font-normal text-scorpion mt-2">
          {{ $t("rating_description") }}
        </p>
      </div>
      <div class="flex gap-3">
        <SharedFilterDropdown
          v-model="selectedSubject"
          :label="$t('by_subjects')"
          :items="subjects"
        />
        <SharedFilterDropdown
          v-model="periodPeriod"
          :label="$t('by_days')"
          :items="periods"
        />
      </div>
    </div>
    <UTable
      :columns="columns"
      :data="table"
      class="rounded-xl border-1 border-athens-gray-500 [&_tr]:odd:bg-wild-sand [&_tr]:even:bg-white [&_tr]:border-0 divide-y-0 mt-6"
      :ui="{
        th: 'bg-alabaster-400',
        td: ' py-3 text-xs text-cod-gray font-normal',
      }"
    >
      <template #row-cell="{ row }">
        {{ row }}
      </template>
    </UTable>
  </main>
</template>
