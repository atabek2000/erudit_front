<script setup>
import draggable from "vuedraggable";

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
    <p class="text-base md:text-xl font-medium text-mirage text-center">
      {{ question?.text }}
    </p>

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
          >
            {{ q.text }}
          </li>
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
        />
        <!-- <client-only>
          <draggable
            v-model="answers"
            @change="checkAnswers"
            item-key="id"
            class="flex flex-col justify-between h-full space-y-2"
          >
            <template #item="{ element }">
              <div
                class="flex gap-4 p-2 md:p-4 rounded-md md:rounded-xl bg-alabaster border border-catskill-white hover:bg-catskill-white w-full select-none cursor-move"
              >
                <UIcon name="i-lucide-align-justify" class="w-5 h-5" />
                {{ element.text }}
              </div>
            </template>
          </draggable>
        </client-only> -->
      </div>
    </div>
    <p class="mt-4 text-xs text-gray-500">👉 {{ $t("match_info") }}.</p>
  </div>
</template>
