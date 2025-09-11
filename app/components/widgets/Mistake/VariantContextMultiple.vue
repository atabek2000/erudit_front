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

const selectedAnswer = ref(props.selectedAnswer ? props.selectedAnswer : []);

const onChangeAnswer = () => {
  console.log(
    props?.question?.answers?.filter((ans) =>
      selectedAnswer.value.includes(ans.id)
    )
  );

  emits(
    "onAnswer",
    props?.question?.id,
    props?.question?.answers?.filter((ans) =>
      selectedAnswer.value.includes(ans.id)
    )
  );
};
</script>

<template>
  <div class="max-w-[900px] mt-6 mx-auto">
    <p class="text-sm md:text-base font-normal text-tuna text-justify">
      {{ question?.context }}
    </p>
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
            'bg-bright-green/10': selectedAnswer.length && item?.is_correct,
            'bg-red-orange/10':
              selectedAnswer.includes(item.value) && !item?.is_correct,
          }"
        >
          <div class="">
            <img
              v-if="selectedAnswer.includes(item.value)"
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
