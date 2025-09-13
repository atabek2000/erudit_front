<script setup>
import "katex/dist/katex.min.css";

const props = defineProps({
  question: {
    type: Object,
    default: {},
  },
  selectedAnswer: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["onAnswer"]);

const selectedAnswerModel = ref(
  props.selectedAnswer ? props.selectedAnswer.filter((ans) => ans) : []
);

const onChangeAnswer = () => {
  const MAX_ANSWER = 3;

  if (selectedAnswerModel.value.length > MAX_ANSWER) {
    selectedAnswerModel.value = selectedAnswerModel.value.slice(
      selectedAnswerModel.value.length - MAX_ANSWER
    );
  }

  const correct_answers = [];
  for (let i = 0; i < MAX_ANSWER; i++) {
    if (selectedAnswerModel.value[i])
      correct_answers.push({ id: selectedAnswerModel.value[i] });
    else correct_answers.push({ id: 0 });
  }
  // if (selectedAnswerModel.value.length >= MAX_ANSWER)
  emits("onAnswer", props?.question?.id, correct_answers);
};
</script>

<template>
  <div class="max-w-[900px] mt-6 mx-auto">
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

    <UCheckboxGroup
      v-model="selectedAnswerModel"
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
        >
          <div class="">
            <img
              v-if="selectedAnswerModel.includes(item.value)"
              src="~/assets/svg/check/select-black.svg"
              alt="icon"
              width="20"
              height="20"
            />
            <img
              v-else
              src="~/assets/svg/check/noselect.svg"
              alt="icon"
              width="20"
              height="20"
            />
          </div>

          <span
            class="text-sm font-normal text-black"
            v-html="renderTextWithMath(item?.label)"
          ></span>
        </div>
      </template>
    </UCheckboxGroup>
  </div>
</template>
