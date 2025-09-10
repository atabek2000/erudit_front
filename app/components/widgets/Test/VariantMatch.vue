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

const questions = ref(
  props.question?.answers?.filter((ans) => ans?.match_side === "left") || []
);
const selectedAnswers = ref(
  props.selectedAnswer
    ? props.selectedAnswer
    : Array(
        props.question?.answers?.filter((ans) => ans?.match_side === "left")
          .length
      ).fill(0)
);
const answers = ref(
  props.question?.answers?.filter((ans) => ans?.match_side === "right") || []
);

function checkAnswers() {
  if (questions.value.length === selectedAnswers.value.length) {
    // console.log(selectedAnswers.value);
    emits(
      "onAnswer",
      props?.question?.id,
      questions.value,
      selectedAnswers.value
    );
  }
}
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
    <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
      <!-- Левая колонка -->
      <div>
        <ul class="space-y-2">
          <li
            v-for="q in questions"
            :key="q.id"
            class="p-2 md:p-4 rounded-md md:rounded-xl bg-alabaster border border-catskill-white hover:bg-catskill-white w-full"
            v-html="renderTextWithMath(q.text)"
          ></li>
        </ul>
      </div>

      <!-- Правая колонка -->
      <div class="space-y-2">
        <USelect
          v-for="(item, index) in questions"
          :key="item.id"
          v-model="selectedAnswers[index]"
          :items="answers"
          value-key="id"
          label-key="text"
          class="w-full p-2 md:p-4 border-1 border-catskill-white ring-0 bg-alabaster"
          @change="checkAnswers"
        >
          <template #item-label="{ item }"
            ><span v-html="renderTextWithMath(item?.text)"></span
          ></template>
          <template #default="{ modelValue }">
            <span
              v-html="
                renderTextWithMath(
                  answers?.find((q) => q.id == modelValue)?.text
                )
              "
            ></span>
          </template>
        </USelect>
      </div>
    </div>
    <p class="mt-4 text-xs text-gray-500">👉 {{ $t("match_info") }}.</p>
  </div>
</template>
