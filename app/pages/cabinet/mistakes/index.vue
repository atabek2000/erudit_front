<script setup>
const { hasPremium } = useCustomAuth();

const { data: subjects } = await useAPI("list/subjects", {
  params: {
    type: "ent",
  },
});

const isLoading = ref(false);
const isPremiumOpen = ref(false);

const openTest = () => {
  isLoading.value = true;
  if (hasPremium.value) {
    useRouter().push(`/cabinet/mistakes/test/${selectedSubject.value}`);
  } else {
    isPremiumOpen.value = true;
    isLoading.value = false;
  }
};

definePageMeta({
  layout: "menu",
});

const selectedSubject = ref(subjects.value?.data?.[0].id);
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
        :items="subjects?.data"
        value-key="id"
        label-key="name"
        class="w-fit"
      />
    </div>

    <UButton class="mt-6" @click="openTest">{{ $t("retake") }}</UButton>
    <ModalsPremium v-model="isPremiumOpen" />
  </main>
</template>
