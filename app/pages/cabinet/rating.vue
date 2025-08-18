<script setup>
const { t } = useI18n();
definePageMeta({
  layout: "menu",
});

const selectedSubject = ref(undefined);
const selectedPeriod = ref(undefined);

const { data, status } = await useAPI("main/rating", {
  params: {
    subject_id: selectedSubject,
    period: selectedPeriod,
  },
  watch: [selectedSubject, selectedPeriod],
});
const { data: subjects } = await useAPI("list/subjects");

const columns = [
  { accessorKey: "id", header: "№" },
  {
    accessorKey: "user.name",
    header: t("name_surname"),
  },
  {
    accessorKey: "point",
    header: t("pointss"),
    meta: { class: { td: "text-dodger-blue-600 " } },
  },
];

const periods = ref([
  {
    id: "by_days",
    name: t("by_days"),
  },
  {
    id: "by_weeks",
    name: t("by_weeks"),
  },
  {
    id: "by_months",
    name: t("by_months"),
  },
]);
</script>

<template>
  <main class="bg-white lg:rounded-xl p-4 lg:px-8 lg:py-6 max-w-full">
    <div class="flex justify-between flex-col md:flex-row gap-3">
      <div class=" ">
        <p class="text-xl font-semibold text-black">{{ $t("rating") }}</p>
        <p class="text-base font-normal text-scorpion mt-2">
          {{ $t("rating_description") }}
        </p>
      </div>
      <div class="flex gap-3">
        <SharedFilterDropdown
          v-model="selectedSubject"
          :label="$t('by_subjects')"
          :items="subjects.data"
        />
        <SharedFilterDropdown
          v-model="selectedPeriod"
          :label="$t('by_days')"
          :items="periods"
        />
      </div>
    </div>
    <UTable
      v-if="status === 'success'"
      :columns="columns"
      :data="data?.data"
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
    <div
      v-else-if="status === 'pending'"
      class="border border-athens-gray-500 rounded-xl mt-6"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="flex justify-around p-3"
        :class="i % 2 == 0 ? 'bg-wild-sand' : 'bg-white'"
      >
        <USkeleton
          class="h-5 w-20 rounded-md"
          :class="i % 2 == 0 ? 'bg-white' : ''"
        />
        <USkeleton
          class="h-5 w-20 rounded-md"
          :class="i % 2 == 0 ? 'bg-white' : ''"
        />
        <USkeleton
          class="h-5 w-20 rounded-md"
          :class="i % 2 == 0 ? 'bg-white' : ''"
        />
      </div>
    </div>
    <div class="w-fit mx-auto">
      <UPagination v-model:page="page" :total="100" class="mt-6" />
    </div>
  </main>
</template>
