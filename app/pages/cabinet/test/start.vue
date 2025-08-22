<script setup>
const { data } = await useAPI("list/subjects");
const route = useRoute();
const main_subjects = computed(() => {
  return data.value?.data.filter((sbj) => sbj.is_main);
});

const sbj1 = computed(() => {
  return data.value?.data.find(
    (sbj) => sbj.id === Number(route.query?.sbj1 || 0)
  );
});
const sbj2 = computed(() => {
  return data.value?.data.find(
    (sbj) => sbj.id === Number(route.query?.sbj2 || 0)
  );
});

const onStart = () => {
  const data = new FormData();

  data.append("subjects[0][id]", sbj1.value.id);
  data.append("subjects[0][is_main_subject]", 0);
  data.append("subjects[1][id]", sbj2.value.id);
  data.append("subjects[1][is_main_subject]", 0);

  useFetchApi("ent/store", {
    method: "POST",
    body: data,
  }).then((res) => {
    // console.log(res);
    navigateTo(
      `/cabinet/test/item?ent_id=${res.data?.user_progress?.id}&subject_id=${res?.data?.test_subject?.subject_id}&round=1`
    );
  });
};
</script>

<template>
  <main class="bg-wild-sand-300 py-0 lg:py-10">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 md:pt-0">
      <div class="bg-white lg:rounded-2xl px-4 md:px-8 py-6">
        <p class="text-xl font-semibold text-black">
          {{ $t("you_selected_items") }}:
        </p>
        <div class="mt-4 flex gap-6 flex-col lg:flex-row">
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("main_subjects") }}
            </p>
            <p
              v-for="sbj in main_subjects"
              :key="sbj.id"
              class="text-sm font-normal text-cod-gray"
            >
              {{ sbj.name }}
            </p>
          </div>
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("profile_subjects") }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ sbj1?.name }}
            </p>
            <p class="text-sm font-normal text-cod-gray">
              {{ sbj2?.name }}
            </p>
          </div>
        </div>
        <UButton @click="onStart" class="mt-6">{{ $t("start_test") }}</UButton>
        <UButton to="/cabinet/test" class="mt-2" variant="ghost">{{
          $t("change_subjects")
        }}</UButton>
      </div>
    </div>
  </main>
</template>
