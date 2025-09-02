<script setup>
const { data } = await useAPI("ent/results");
</script>

<template>
  <main class="bg-wild-sand-300 py-0 lg:py-10">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 md:pt-0">
      <div class="bg-white lg:rounded-2xl px-4 md:px-8 py-6">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ $t("your_results") }}:
          </p>
          <p class="text-xl font-semibold text-black">
            {{ data?.data?.total?.score }}
          </p>
        </div>
        <div class="mt-4 flex gap-6 flex-col md:flex-row">
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("main_subjects") }}
            </p>
            <p
              v-for="subject in data.data?.main_subjects"
              :key="subject.id"
              class="text-sm font-normal text-cod-gray flex justify-between"
            >
              {{ subject.name }}
              <span> {{ subject?.correct }}/{{ subject?.count }} </span>
            </p>
          </div>
          <div class="p-3 bg-white-pointer rounded-xl flex-1 space-y-2">
            <p class="text-base font-medium text-cod-gray">
              {{ $t("profile_subjects") }}
            </p>
            <p
              v-for="subject in data.data?.profile_subjects"
              :key="subject.id"
              class="text-sm font-normal text-cod-gray flex justify-between"
            >
              {{ subject.name }}
              <span>{{ subject?.correct }}/{{ subject?.count }}</span>
            </p>
          </div>
        </div>
        <UButton to="/cabinet/subjects" class="mt-6">{{
          $t("back_to_learning")
        }}</UButton>
      </div>
    </div>
  </main>
</template>
