export default () => {
  const route = useRoute();

  const data = ref({});
  const answeredQuestions = reactive({});
  const answeredQuestionList = reactive([]);

  function init(init_data) {
    if (!init_data || !init_data.test_round) return false;
    else {
      data.value = init_data;
      return true;
    }
  }

  const sendAnswer = async (answers = []) => {
    const fd = {
      ent_id: currentRound.value.ent_id,
      round_id: currentRound.value.id,
      question_id: currentRound.value.question.id,
      answer_ids: [],
    };
    answers.forEach((ans) => fd.answer_ids.push(ans));

    await useFetchApi("ent/store/round", {
      method: "POST",
      body: JSON.stringify(fd),
    });
  };

  const sendAnswerMatch = async (left_answers = [], right_answers = []) => {
    if (left_answers.length !== right_answers.length) return false;
    const fd = {
      ent_id: currentRound.value.ent_id,
      round_id: currentRound.value.id,
      question_id: currentRound.value.question.id,
      matches: [],
    };

    left_answers.forEach((ans, index) => {
      fd.matches.push({
        left_id: ans.id,
        right_id: right_answers[index],
      });
    });

    await useFetchApi("ent/store/round", {
      method: "POST",
      body: JSON.stringify(fd),
    });
  };

  const goToRound = (to_round_id) => {
    navigateTo(
      `/cabinet/mistakes/test/${route.params.id}?round_id=${to_round_id}`
    );
  };

  const goToNextRound = () => {
    const index = rounds.value.findIndex(
      (rd) => rd.id === currentRound.value.id
    );
    if (index < rounds.value.length - 1) goToRound(rounds.value[index + 1].id);
  };

  const goToPrevRound = () => {
    const index = rounds.value.findIndex(
      (rd) => rd.id === currentRound.value.id
    );
    if (index > 0) goToRound(rounds.value[index - 1].id);
  };

  const onAnswer = async (question_id, answers) => {
    // compute points
    await sendAnswer(answers.map((ans) => ans.id)).then(() => {
      answeredQuestions[question_id] = answers.map((ans) => ans.id);
      answeredQuestionList.push(question_id);
    });
  };

  const onAnswerMatch = async (question_id, left_answers, right_answers) => {
    await sendAnswerMatch(left_answers, right_answers).then(() => {
      answeredQuestions[question_id] = right_answers;
      answeredQuestionList.push(question_id);
    });
  };

  const rounds = computed(
    () =>
      data.value?.test_round?.map((rd) => ({
        id: rd.id,
        round: rd.round,
        ent_id: rd.ent_id,
        question_id: rd.question?.id,
      })) || []
  );

  const currentRound = computed(() => {
    if (Number(route.query?.round_id || 0))
      return (
        data.value?.test_round?.find(
          (rd) => rd.id === Number(route.query?.round_id || 0)
        ) || {}
      );
    else return data.value?.test_round?.[0] || {};
  });

  const currentIndex = computed(() => {
    return (
      rounds.value?.findIndex((rd) => rd.id === currentRound.value.id) || 0
    );
  });

  return {
    data,
    init,
    rounds,
    currentRound,
    answeredQuestions,
    answeredQuestionList,
    currentIndex,
    sendAnswer,
    onAnswerMatch,
    onAnswer,
    goToRound,
    goToNextRound,
    goToPrevRound,
  };
};
