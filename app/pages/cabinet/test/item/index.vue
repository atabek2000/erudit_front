<script setup>
const { data } = await useAPI("ent");
const {
  init,
  currentRound,
  rounds,
  goToRound,
  onAnswer,
  answeredQuestions,
  answeredQuestionList,
  goNextSubject,
  goPrevSubject,
  hasNextSubject,
  hasPrevSubject,
} = useEntTest();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const loadingData = ref(true);
const isConfirmOpen = ref(false);

const totalDuration = 40 * 60;
const remainingTime = ref(totalDuration);
let intervalId;

onMounted(() => {
  const status = init(data.value?.data, route.query.ent_id);
  if (!status) {
    useToast().add({
      title: t("toast.error"),
      color: "red",
      description: "Данный тест вам недоступен!",
    });

    router.push("/cabinet/test");
  } else {
    loadingData.value = false;
  }
  remainingTime.value = updateTimer(
    data.value?.data?.user_progress?.created_at,
    40 * 60
  );
  intervalId = setInterval(() => {
    remainingTime.value = updateTimer(
      data.value?.data?.user_progress?.created_at,
      40 * 60
    );
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <main class="py-0 lg:py-10 bg-wild-sand-300">
    <SharedScorePanelBack />

    <div class="lg:main-container pt-16 lg:pt-0">
      <div v-if="!loadingData" class="bg-white py-6 px-4 md:px-8 rounded-xl">
        <div class="flex justify-between">
          <p class="text-xl font-semibold text-black">
            {{ currentRound?.subject?.name }}
          </p>
          <div class="flex gap-x-2">
            <UButton
              class="hidden md:block md:w-fit px-5 text-sm"
              size="xs"
              variant="soft"
              :disabled="!hasPrevSubject"
              @click="goPrevSubject"
              >{{ $t("prev_subject") }}</UButton
            >
            <UButton
              class="hidden md:block md:w-fit px-5 text-sm"
              size="xs"
              variant="soft"
              :disabled="!hasNextSubject"
              @click="goNextSubject"
              >{{ $t("next_subject") }}</UButton
            >
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 flex-wrap gap-2">
          <p class="text-lg font-semibold text-mirage">
            Сұрақ №{{ currentRound.round }}
          </p>
          <div class="flex gap-2 items-center">
            <img src="~/assets/svg/alarm.svg" alt="icon" />
            <p class="text-lg font-medium text-mirage">
              {{ formatTime(remainingTime) }} мин
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              @click="goToRound(currentRound.round - 1)"
              class="md:w-fit px-5 text-sm hidden md:block"
              size="xs"
              :disabled="currentRound.round <= 1"
              >{{ $t("prev_question") }}</UButton
            >
            <UButton
              v-if="rounds?.length > currentRound.round"
              @click="goToRound(currentRound.round + 1)"
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
            v-for="i in rounds"
            :key="i"
            @click="goToRound(i.round)"
            class="w-9 min-w-9 h-9 rounded-lg cursor-pointer text-sm font-normal text-finn text-cod-gray border border-alto flex justify-center items-center"
            :class="{
              'border border-purple-heart bg-purple-heart/10 ':
                i.round === currentRound.round &&
                answeredQuestionList.includes(i.question_id),
              'bg-purple-heart/10  border-0':
                answeredQuestionList.includes(i.question_id) &&
                i.round !== currentRound.round,
              'border border-purple-heart': i.round === currentRound.round,
            }"
          >
            {{ i.round }}
          </button>
        </div>

        <WidgetsTestVariantSingleEnt
          v-if="
            currentRound?.question?.answers?.filter((ans) => !ans.is_correct)
              .length == 1
          "
          :question="currentRound?.question"
          :selectedAnswer="answeredQuestions[currentRound?.question?.id]?.[0]"
          @onAnswer="onAnswer"
          :key="currentRound?.question?.id"
        />
        <WidgetsTestVariantMultiple
          v-else
          :question="currentRound?.question"
          :key="currentRound?.question?.id"
        />

        <div class="flex gap-3 mt-6 md:hidden">
          <UButton
            @click="goToRound(currentRound.round - 1)"
            class="md:w-fit px-5 bg-purple-heart/10 hover:bg-purple-heart/20 aria-disabled:bg-purple-heart/10 text-cod-gray"
            size="sm"
            :disabled="currentRound.round <= 1"
            >{{ $t("prev_btn") }}</UButton
          >
          <UButton
            v-if="rounds?.length > currentRound.round"
            @click="goToRound(currentRound.round + 1)"
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
        <div class="flex justify-between">
          <UButton
            class="md:hidden md:w-fit text-sm mt-5 px-0"
            size="xs"
            variant="ghost"
            :disabled="!hasPrevSubject"
            @click="goPrevSubject"
            >{{ $t("prev_subject") }}</UButton
          >
          <UButton
            class="md:hidden md:w-fit text-sm mt-5 px-0"
            size="xs"
            variant="ghost"
            :disabled="!hasNextSubject"
            @click="goNextSubject"
            >{{ $t("next_subject") }}</UButton
          >
        </div>

        <ModalsTestConfirm v-model="isConfirmOpen" />
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
