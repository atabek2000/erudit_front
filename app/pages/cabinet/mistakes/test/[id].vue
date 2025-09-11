<script setup>
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { hasPremium } = useCustomAuth();
const { data } = await useAPI("ent/work/on/mistakes", {
  params: {
    subject_id: route.params.id,
  },
});

const loadingData = ref(true);

const {
  init,
  rounds,
  currentRound,
  onAnswerMatch,
  answeredQuestions,
  answeredQuestionList,
  currentIndex,
  onAnswer,
  goToRound,
  goToNextRound,
  goToPrevRound,
} = useEntMistake();

const isErrorOpen = ref(false);
const isResultOpen = ref(false);
const isConfirmOpen = ref(false);

const finishTest = async () => {
  isConfirmOpen.value = false;
  router.push("/cabinet/profile");
};

const beforeUnloadHandler = (event) => {
  event.preventDefault();
  event.returnValue = ""; // Обязательно, чтобы появилось окно
};

onMounted(() => {
  const status = init(data?.value?.data);
  if (!status) {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: t("test_not_available"),
    });

    router.push("/cabinet/test");
  } else {
    loadingData.value = false;
  }

  if (!hasPremium.value) {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: t("ent_with_premium"),
    });
    router.push("/cabinet/test");
    return;
  }

  window.addEventListener("beforeunload", beforeUnloadHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler);
});
</script>

<template>
  <main class="py-0 lg:py-10 bg-wild-sand-300">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 lg:pt-0">
      <div v-if="!loadingData" class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ data?.data?.subject?.name }}
          </p>
        </div>

        <div class="flex justify-between items-center mt-6 flex-wrap gap-2">
          <p class="text-lg font-semibold text-mirage">
            {{ $t("question") }} №{{ currentIndex + 1 }}
          </p>

          <div class="flex items-center gap-2">
            <UButton
              @click="goToPrevRound"
              class="md:w-fit px-5 text-sm hidden md:block"
              size="xs"
              :disabled="currentIndex <= 0"
              >{{ $t("prev_question") }}</UButton
            >
            <UButton
              v-if="rounds?.length > currentIndex + 1"
              @click="goToNextRound"
              class="md:w-fit px-5 text-sm hidden md:block"
              size="xs"
              >{{ $t("next_question") }}</UButton
            >
            <UButton
              v-else
              @click="isConfirmOpen = true"
              class="md:w-fit px-5 text-sm text-white bg-black hover:bg-black/80 hidden md:block"
              size="xs"
              >{{ $t("finish_test") }}</UButton
            >
          </div>
        </div>

        <div
          class="flex gap-3 overflow-x-auto pb-4 scrollbar-thin select-none mt-6"
        >
          <button
            v-for="(i, index) in rounds"
            :key="i"
            @click="goToRound(i.id)"
            class="w-9 min-w-9 h-9 rounded-lg cursor-pointer text-sm font-normal text-finn text-cod-gray border border-alto flex justify-center items-center"
            :class="{
              'border border-purple-heart bg-purple-heart/10 ':
                i.id === currentRound.id &&
                answeredQuestionList.includes(i.question_id),
              'bg-purple-heart/10  border-0':
                answeredQuestionList.includes(i.question_id) &&
                i.id !== currentRound.id,
              'border border-purple-heart': i.id === currentRound.id,
            }"
          >
            {{ index + 1 }}
          </button>
        </div>

        <WidgetsMistakeVariantMatch
          v-if="currentRound?.question?.type === 'matching'"
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]"
          @onAnswer="onAnswerMatch"
          :key="currentRound?.question?.id"
        />
        <WidgetsMistakeVariantContextSingle
          v-else-if="
            currentRound?.question?.context &&
            currentRound?.question?.answers.length &&
            currentRound?.question?.answers?.filter((ans) => ans.is_correct)
              .length == 1
          "
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]?.[0]"
          @onAnswer="onAnswer"
          :key="currentRound?.question?.id"
        />
        <WidgetsMistakeVariantContextMultiple
          v-else-if="
            currentRound?.question?.context &&
            currentRound?.question?.answers.length
          "
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]?.[0]"
          @onAnswer="onAnswer"
          :key="currentRound?.question?.id"
        />
        <WidgetsMistakeVariantSingleEnt
          v-else-if="
            currentRound?.question?.answers.length &&
            currentRound?.question?.answers?.filter((ans) => ans.is_correct)
              .length == 1
          "
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]?.[0]"
          @onAnswer="onAnswer"
          :key="currentRound?.question?.id"
        />
        <WidgetsMistakeVariantMultiple
          v-else-if="currentRound?.question?.answers.length"
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]"
          @onAnswer="onAnswer"
        />
        <div v-else>
          <p class="text-base font-semibold text-red-orange text-center">
            {{ $t("not_found") }}
          </p>
        </div>

        <div class="flex gap-3 mt-6 md:hidden">
          <UButton
            @click="goToPrevRound"
            class="md:w-fit px-5 bg-purple-heart/10 hover:bg-purple-heart/20 aria-disabled:bg-purple-heart/10 text-cod-gray"
            size="sm"
            :disabled="currentRound.round <= 1"
            >{{ $t("prev_btn") }}</UButton
          >
          <UButton
            v-if="rounds?.length > currentIndex + 1"
            @click="goToNextRound"
            class="md:w-fit px-5"
            size="sm"
            >{{ $t("next_btn") }}</UButton
          >
          <UButton
            v-else
            @click="isConfirmOpen = true"
            class="md:w-fit px-5 text-sm text-white bg-black hover:bg-black/80"
            size="xs"
            >{{ $t("finish_test") }}</UButton
          >
        </div>

        <ModalsTestConfirm v-model="isConfirmOpen" @submit="finishTest" />
      </div>
      <div v-else class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <USkeleton class="h-8 w-40 rounded-md" />
          <USkeleton class="h-8 w-20 rounded-md" />
        </div>
        <div class="flex justify-between mt-4 gap-2">
          <USkeleton class="h-8 w-40 rounded-md" />
          <USkeleton class="h-8 w-20 rounded-md" />
          <USkeleton class="h-8 w-40 rounded-md" />
        </div>
        <div class="overflow-x-auto">
          <div class="flex mt-8 gap-2">
            <USkeleton
              v-for="i in 20"
              :key="i"
              class="h-9 min-w-9 rounded-md"
            />
          </div>
        </div>
        <div class="mt-10">
          <USkeleton class="h-8 w-48 rounded-md mx-auto" />
          <USkeleton
            class="h-12 w-[600px] max-w-full rounded-md mt-6 mx-auto"
          />
          <USkeleton
            class="h-12 w-[600px] max-w-full rounded-md mt-3 mx-auto"
          />
          <USkeleton
            class="h-12 w-[600px] max-w-full rounded-md mt-3 mx-auto"
          />
          <USkeleton
            class="h-12 w-[600px] max-w-full rounded-md mt-3 mx-auto"
          />
        </div>
      </div>
    </div>
  </main>
</template>
