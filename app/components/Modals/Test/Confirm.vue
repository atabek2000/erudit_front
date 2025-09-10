<script setup>
const props = defineProps({
  url: {
    type: String,
    default: undefined,
  },
});

const isOpen = defineModel();
const emits = defineEmits(["submit"]);
const isLoading = ref(false);

const onSubmit = () => {
  isLoading.value = true;

  try {
    if (props.url) {
      useRouter().push(props.url);
    } else {
      emits("submit");
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'md:max-w-[480px]' }">
    <template #content>
      <div class="p-4 md:px-14 md:py-11">
        <p class="text-2xl text-mirage font-semibold">
          {{ $t("confirm_finish_test") }}
        </p>
        <p class="text-base font-medium text-cod-gray/70 mt-2.5">
          {{ $t("results_saved_info") }}
        </p>
        <div class="flex gap-2 mt-8">
          <UButton
            @click="isOpen = false"
            class="bg-black/20 hover:bg-black/30 text-cod-gray font-normal"
            size="md"
            >{{ $t("cancel") }}</UButton
          >
          <UButton class="" size="md" :loading="isLoading" @click="onSubmit">{{
            $t("finish")
          }}</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
