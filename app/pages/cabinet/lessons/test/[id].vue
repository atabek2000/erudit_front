<script setup>
const route = useRoute();
const { data } = await useAPI(`test?id=${route.params?.id}`);

const isErrorOpen = ref(false);
const isResultOpen = ref(false);
const hasAnswer = ref(false);
const answers = ref([]);
const onContinue = () => {
  isErrorOpen.value = false;
};

const question_index = ref(0);
const prevQuestion = () => {
  if (question_index.value - 1 > 0) {
    question_index.value--;
  }
};

const nextQuestion = () => {
  if (question_index.value < data.value?.data?.questions?.length - 1) {
    question_index.value++;
    hasAnswer.value = false;
  } else {
    isResultOpen.value = true;
  }
};

const onAnswer = async (question_id, answer) => {
  answers.value.push(answer.is_correct);
  hasAnswer.value = true;
  if (answer.is_correct) {
  } else {
    isErrorOpen.value = true;
  }
  await useFetchApi("test/store/user/answer", {
    method: "POST",
    body: {
      question_id: question_id,
      answer_id: answer.id,
      test_id: data.value?.data?.id,
    },
  });
};

const onFinish = () => {
  isResultOpen.value = false;
  useRouter().push("/cabinet/subjects");
};

const totalSeconds = ref((data.value?.data?.time || 20) * 60);
const timerText = ref("");

let timerInterval = null;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

onMounted(() => {
  timerText.value = formatTime(totalSeconds.value);

  timerInterval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
      timerText.value = formatTime(totalSeconds.value);
    } else {
      clearInterval(timerInterval);
      onFinish();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<template>
  <main class="py-0 lg:py-10 bg-wild-sand-300">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 lg:pt-0">
      <div class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ data?.data?.title }}
          </p>
          <SharedScorePanel
            score="10"
            life="6"
            diamond="8"
            class="hidden lg:flex"
          />
        </div>

        <div class="flex justify-between items-center mt-6 flex-wrap gap-2">
          <p class="text-lg font-semibold text-mirage">
            Сұрақ №{{ question_index + 1 }}
          </p>
          <div class="flex gap-2 items-center">
            <img src="~/assets/svg/alarm.svg" alt="icon" />
            <p class="text-lg font-medium text-mirage min-w-[100px]">
              {{ timerText }} мин
            </p>
          </div>

          <UButton
            v-if="
              question_index === data?.data?.questions?.length - 1 && hasAnswer
            "
            @click="nextQuestion()"
            class="md:w-fit px-5 text-sm text-white bg-black hover:bg-black/80 hidden md:block"
            size="sm"
            >{{ $t("finish_test") }}</UButton
          >
          <UButton
            v-else
            @click="nextQuestion()"
            class="hidden md:block md:w-fit px-5"
            size="sm"
            :disabled="!hasAnswer"
            >{{ $t("next_question") }}</UButton
          >
        </div>

        <div
          class="flex gap-3 overflow-x-auto pb-4 scrollbar-thin select-none mt-6"
        >
          <button
            v-for="i in data?.data?.questions?.length"
            :key="i"
            class="w-9 min-w-9 h-9 rounded-lg cursor-pointer text-sm font-normal text-finn text-cod-gray border border-alto flex justify-center items-center"
            :class="{
              'bg-emerald text-white border-0':
                answers[i - 1] && answers.length >= i,
              'bg-radical-red text-white border-0':
                !answers[i - 1] && answers.length >= i,
            }"
          >
            {{ i }}
          </button>
        </div>

        <WidgetsTestVariantSingle
          :question="data?.data?.questions[question_index]"
          @onAnswer="onAnswer"
          :key="question_index"
        />

        <div class="flex gap-3 md:hidden">
          <UButton
            @click="isErrorOpen = true"
            class="md:w-fit px-5 bg-purple-heart/10 hover:bg-purple-heart/20 aria-disabled:bg-purple-heart/10 text-cod-gray"
            size="sm"
            >{{ $t("prev_btn") }}</UButton
          >
          <UButton
            @click="isErrorOpen = true"
            class="md:w-fit px-5"
            size="sm"
            >{{ $t("next_btn") }}</UButton
          >
        </div>
        <ModalsTestError v-model="isErrorOpen" @onContinue="onContinue" />
        <ModalsTestResult v-model="isResultOpen" @submit="onFinish" />
      </div>
    </div>
  </main>
</template>
