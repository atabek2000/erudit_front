<script setup>
const { data } = await useAPI("list/subjects");
const { t } = useI18n();
const { data: results } = await useAPI("ent/results");
const { hasPremium } = useCustomAuth();

const main_subjects = computed(() => {
  return data.value?.data.filter((sbj) => sbj.is_main);
});
const not_main_subjects = computed(() => {
  return data.value?.data.filter((sbj) => !sbj.is_main);
});
const selected_subjects = ref([]);

const addSubject = (sbj) => {
  if (
    !selected_subjects.value.includes(sbj) &&
    selected_subjects.value.length < 2
  ) {
    selected_subjects.value.push(sbj);
  } else if (selected_subjects.value.includes(sbj)) {
    selected_subjects.value.splice(selected_subjects.value.indexOf(sbj), 1);
  }
};

const onStart = () => {
  if (selected_subjects.value.length === 2) {
    navigateTo({
      path: "/cabinet/test/start",
      query: {
        sbj1: selected_subjects.value[0],
        sbj2: selected_subjects.value[1],
      },
    });
  } else {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: t("select_2_subjects"),
    });
  }
};
definePageMeta({
  layout: "menu",
});
</script>

<template>
  <main class="pb-10">
    <div
      v-if="!results && !hasPremium"
      class="flex lg:hidden gap-2 p-3 w-full bg-selective-yellow-600/35 rounded-2xl items-center mb-2"
    >
      <img src="/lamp.png" alt="lamp" />
      <div>
        <p class="text-sm font-medium text-cod-gray">
          {{ $t("free_first_test") }}
        </p>
        <p class="text-sm font-medium text-cod-gray">
          {{ $t("premium_required_after") }}
        </p>
      </div>
    </div>
    <div
      v-if="results && !hasPremium"
      class="lg:hidden p-3 w-full bg-athens-gray rounded-2xl mt-6 items-center space-y-4"
    >
      <div class="flex gap-2 w-full">
        <img src="/warning.png" alt="warning" width="34" />
        <div>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("ent_passed") }}
          </p>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("ent_with_premium") }}
          </p>
        </div>
      </div>
      <nuxt-link
        to="/cabinet/premium"
        class="ml-auto block w-fit bg-button-gradient text-white rounded-xl text-sm font-medium px-5 py-2"
      >
        {{ $t("purchase") }}
      </nuxt-link>
    </div>
    <div class="bg-white lg:rounded-xl px-4 py-4 md:px-8 md:py-6">
      <div class="">
        <p class="text-xl font-semibold text-black">{{ $t("subjects") }}</p>
        <p class="text-base font-normal text-scorpion mt-2">
          {{ $t("select_subjects") }}
        </p>
      </div>

      <p class="text-base font-medium text-shark/70 mt-6">
        {{ $t("main_subjects") }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-4 gap-x-8 gap-y-6">
        <SharedSubjectCard
          v-for="sbj in main_subjects"
          :key="sbj.id"
          :subject="sbj"
          :isEnt="true"
        />
      </div>
      <p class="text-base font-medium text-shark/70 mt-6">
        {{ $t("profile_subjects") }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 mt-4 gap-x-8 gap-y-6">
        <div
          class="relative"
          v-for="sbj in not_main_subjects"
          :key="sbj.id"
          @click="addSubject(sbj.id)"
        >
          <SharedSubjectCard :subject="sbj" :isEnt="true" class="block" />
          <img
            v-if="selected_subjects.includes(sbj.id)"
            src="~/assets/svg/radio/select-black.svg"
            alt=""
            class="absolute top-2 right-2 w-6"
          />
          <img
            v-else
            src="~/assets/svg/radio/noselect.svg"
            alt=""
            class="absolute top-2 right-2 w-6"
          />
        </div>
      </div>

      <div
        v-if="!results && !hasPremium"
        class="hidden lg:flex gap-2 p-3 w-full bg-sea-buckthorn/10 rounded-2xl mt-6 items-center"
      >
        <img src="/lamp.png" alt="lamp" />
        <div>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("free_first_test") }}
          </p>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("premium_required_after") }}
          </p>
        </div>
      </div>

      <div
        v-if="results && !hasPremium"
        class="hidden lg:flex gap-2 p-3 w-full bg-athens-gray rounded-2xl mt-6 items-center"
      >
        <img src="/warning.png" alt="warning" width="34" />
        <div>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("ent_passed") }}
          </p>
          <p class="text-sm font-medium text-cod-gray">
            {{ $t("ent_with_premium") }}
          </p>
        </div>
        <nuxt-link
          to="/cabinet/premium"
          class="ml-auto bg-button-gradient text-white rounded-xl text-sm font-medium px-5 py-2"
        >
          {{ $t("purchase") }}
        </nuxt-link>
      </div>

      <UButton
        @click="onStart"
        :disabled="results && !hasPremium"
        class="mt-6 fixed lg:static bottom-20 left-4 right-4 w-auto lg:w-full"
        >{{ $t("confirm_selection") }}</UButton
      >
    </div>
  </main>
</template>

<style scoped>
.bg-button-gradient {
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
}
</style>
