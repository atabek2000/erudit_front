<script setup>
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
    <p class="text-base md:text-xl font-medium text-mirage">
      {{ question?.context }}
    </p>
    <p class="text-base md:text-lg font-semibold text-mirage text-center">
      {{ question?.text }}
    </p>
    <img
      v-if="question?.image"
      :src="question?.image"
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

          <span class="text-sm font-normal text-black">{{ item.label }}</span>
        </div>
      </template>
    </UCheckboxGroup>
  </div>
</template>
