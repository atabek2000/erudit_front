export default () => {
  const route = useRoute();

  const data = ref({});
  const subject_id = computed(() => Number(route.query?.subject_id || 0));
  const ent_id = computed(() => Number(route.query?.ent_id || 0));
  const answeredQuestions = reactive({});
  const answeredQuestionList = reactive([]);
  const subjects = ref([]);

  function init(init_data, init_ent_id) {
    if (
      !init_data ||
      !init_data.test_round ||
      !init_data?.test_subject ||
      !init_data?.user_progress ||
      init_data?.user_progress?.status !== "active"
    )
      return false;
    else {
      data.value = init_data;
      subjects.value = init_data?.test_subject;
      return true;
    }
  }

  const sendAnswer = async (answers = []) => {
    const fd = new FormData();
    answers.forEach((ans, index) => fd.append(`answer_ids[${index}]`, ans));
    fd.append("ent_id", ent_id.value);
    fd.append("round_id", currentRound.value.id);
    fd.append("question_id", currentRound.value.question.id);

    await useFetchApi("ent/store/round", {
      method: "POST",
      body: fd,
    });
  };

  const sendAnswerMatch = async (left_answers = [], right_answers = []) => {
    const fd = new FormData();
    right_answers.forEach((ans, index) => {
      fd.append(`left_keys[${index}]`, left_answers[index].match_key);
      fd.append(`right_keys[${index}]`, ans.match_key);
      fd.append(`left_ids[${index}]`, left_answers[index].id);
      fd.append(`right_ids[${index}]`, ans.id);
    });
    fd.append("ent_id", ent_id.value);
    fd.append("round_id", currentRound.value.id);
    fd.append("question_id", currentRound.value.question.id);

    await useFetchApi("ent/store/round", {
      method: "POST",
      body: fd,
    });
  };

  const goToRound = (to_round) => {
    if (to_round > rounds.value.length) return;
    navigateTo(
      `/cabinet/test/item?ent_id=${ent_id.value}&subject_id=${subject_id.value}&round=${to_round}`
    );
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
      answeredQuestions[question_id] = right_answers.map((ans) => ans.id);
      answeredQuestionList.push(question_id);
    });
  };

  const goNextSubject = () => {
    const index = subjects.value.findIndex(
      (sbj) => sbj.subject_id === subject_id.value
    );

    if (index < subjects.value.length - 1) {
      navigateTo(
        `/cabinet/test/item?ent_id=${ent_id.value}&subject_id=${
          subjects.value[index + 1].subject_id
        }&round=${1}`
      );
    }
  };

  const goPrevSubject = () => {
    const index = subjects.value.findIndex(
      (sbj) => sbj.subject_id === subject_id.value
    );
    if (index > 0) {
      navigateTo(
        `/cabinet/test/item?ent_id=${ent_id.value}&subject_id=${
          subjects.value[index - 1].subject_id
        }&round=${1}`
      );
    }
  };

  const hasNextSubject = computed(() => {
    const index = subjects.value.findIndex(
      (sbj) => sbj.subject_id === subject_id.value
    );

    return index < subjects.value.length - 1;
  });

  const hasPrevSubject = computed(() => {
    const index = subjects.value.findIndex(
      (sbj) => sbj.subject_id === subject_id.value
    );
    return index > 0;
  });

  const rounds = computed(
    () =>
      data.value?.test_round
        ?.filter((rd) => rd.subject_id === subject_id.value)
        ?.map((rd) => ({
          id: rd.id,
          round: rd.round,
          question_id: rd.question?.id,
        }))
        ?.sort((a, b) => a.round - b.round) || []
  );

  const currentRound = computed(
    () =>
      data.value?.test_round?.find(
        (rd) =>
          rd.round === Number(route.query?.round || 0) &&
          rd.subject_id === subject_id.value
      ) || {}
  );

  return {
    data,
    init,
    rounds,
    currentRound,
    subject_id,
    answeredQuestions,
    answeredQuestionList,
    hasNextSubject,
    hasPrevSubject,
    sendAnswer,
    onAnswerMatch,
    goToRound,
    onAnswer,
    goNextSubject,
    goPrevSubject,
  };
};
