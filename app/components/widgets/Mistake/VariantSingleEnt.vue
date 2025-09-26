<script setup>
import "katex/dist/katex.min.css";
const props = defineProps({
  question: {
    type: Object,
    default: {},
  },
  selectedAnswer: {
    default: null,
  },
});

const emits = defineEmits(["onAnswer"]);

const selectedAnswer = ref(props.selectedAnswer ? props.selectedAnswer : null);

const onChangeAnswer = () => {
  emits(
    "onAnswer",
    props?.question?.id,
    props?.question?.answers?.filter((ans) => ans?.id === selectedAnswer.value)
  );
};
</script>

<template>
  <div class="max-w-[670px] mt-6 mx-auto">
    <p
      class="text-base md:text-xl font-medium text-mirage text-center"
      v-html="renderTextWithMath(question?.text)"
      :key="question?.text"
    ></p>

    <img
      v-if="question?.image"
      :src="useRuntimeConfig().public.API_STORAGE + question?.image"
      alt="img"
      class="w-full rounded-xl mb-4 mt-5"
    />

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
      class="mt-6"
    >
      <template #label="{ item }">
        <div
          class="flex gap-4 p-4 rounded-xl bg-alabaster border border-catskill-white hover:bg-catskill-white w-full my-2.5 cursor-pointer"
          :class="{
            'bg-bright-green/10': selectedAnswer && item?.is_correct,
            'bg-red-orange/10':
              selectedAnswer === item.value && !item?.is_correct,
          }"
        >
          <div class="">
            <img
              v-if="selectedAnswer === item.value"
              src="~/assets/svg/radio/select-black.svg"
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

          <span
            class="text-base font-normal text-black"
            v-html="renderTextWithMath(item?.label)"
          ></span>
        </div>
      </template>
    </URadioGroup>
  </div>
</template>
