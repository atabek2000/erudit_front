<script setup>
const props = defineProps({
  question: {
    type: Object,
    default: {},
  },
});

const emits = defineEmits(["onAnswer"]);

const selectedAnswer = ref(null);

const disabled = ref(false);
const onChangeAnswer = () => {
  disabled.value = true;
  emits(
    "onAnswer",
    props?.question?.answers?.find((ans) => ans?.id === selectedAnswer.value)
      ?.is_correct
  );
};
</script>

<template>
  <div class="max-w-[670px] mt-6 mx-auto">
    <p class="text-base md:text-xl font-medium text-mirage text-center">
      {{ question?.text }}
    </p>

    <URadioGroup
      v-model="selectedAnswer"
      :items="
        question?.answers?.map((ans) => ({
          label: ans?.text,
          value: ans?.id,
          is_correct: ans?.is_correct,
        }))
      "
      :ui="{
        base: 'hidden',
        wrapper: 'ms-0',
      }"
      @change="onChangeAnswer"
      :disabled="disabled"
      class="mt-6"
    >
      <template #label="{ item }">
        <div
          class="flex gap-4 p-4 rounded-xl bg-alabaster border border-catskill-white hover:bg-catskill-white w-full my-2.5 cursor-pointer"
          :class="{
            'bg-bright-green/10':
              selectedAnswer === item.value && item?.is_correct,
            'bg-red-orange/10':
              selectedAnswer === item.value && !item?.is_correct,
          }"
        >
          <div class="">
            <img
              v-if="selectedAnswer === item.value && item?.is_correct"
              src="~/assets/svg/radio/select-green.svg"
              alt="icon"
              width="20"
              height="20"
            />
            <img
              v-else-if="selectedAnswer === item.value"
              src="~/assets/svg/radio/select-red.svg"
              alt="icon"
              width="20"
              height="20"
            />
            <img
              v-else
              src="~/assets/svg/radio/noselect.svg"
              alt="icon"
              width="20"
              height="20"
            />
          </div>

          <span class="text-sm font-normal text-black">{{ item.label }}</span>
        </div>
      </template>
    </URadioGroup>
  </div>
</template>
