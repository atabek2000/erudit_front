export default () => {
  const point = () => useState("user_point", () => 0);
  const diamond = () => useState("user_diamond", () => 0);
  const live = () => useState("user_live", () => 0);
  const lastAddedTime = () => useState("last_added_time", () => null);
  const timeLeft = () => useState("time_left", () => 0); // миллисекунды до новой жизни

  const MAX_LIVES = 5;
  const RECOVERY_TIME = 10 * 60 * 1000; // 4 минуты в мс

  const init = (data) => {
    point().value = Math.max(0, Number(data?.point) || 0);
    diamond().value = Math.max(0, Number(data?.diamond) || 0);
    live().value = Math.max(
      0,
      Math.min(MAX_LIVES, Number(data?.live) || MAX_LIVES)
    );
  };

  const setPoint = (val) => {
    point().value = val < 0 ? 0 : val;
  };

  const setDiamond = (val) => {
    diamond().value = val < 0 ? 0 : val;
  };

  const setLive = (val) => {
    live().value = Math.max(0, Math.min(MAX_LIVES, val));
    if (live().value < MAX_LIVES && !lastAddedTime().value) {
      lastAddedTime().value = Date.now();
    }
    if (live().value >= MAX_LIVES) {
      lastAddedTime().value = null;
      timeLeft().value = 0;
    }
  };

  const saveState = () => {
    localStorage.setItem("user_live", live().value);
    localStorage.setItem("last_added_time", lastAddedTime().value || "");
  };

  // === Загрузка из localStorage ===
  const loadState = () => {
    const storedLives = Number(localStorage.getItem("user_live"));
    const storedTime = localStorage.getItem("last_added_time");

    if (!isNaN(storedLives)) live().value = Math.min(MAX_LIVES, storedLives);
    if (storedTime) lastAddedTime().value = Number(storedTime);
  };

  // Проверяем таймер и восстанавливаем жизни
  const checkRecovery = () => {
    // console.log("checkRecovery");

    // уже максимум — таймер не нужен
    if (live().value >= MAX_LIVES) {
      timeLeft().value = 0;
      lastAddedTime().value = null;
      return;
    }

    // первая инициализация метки, когда жизней < MAX
    if (!lastAddedTime().value) {
      lastAddedTime().value = Date.now();
    }

    const now = Date.now();
    const elapsed = now - lastAddedTime().value; // прошло мс с последнего начисления
    const gained = Math.floor(elapsed / RECOVERY_TIME); // сколько полных интервалов прошло
    const remainder = elapsed % RECOVERY_TIME; // остаток до следующей жизни

    if (gained > 0) {
      const need = MAX_LIVES - live().value;
      const toAdd = Math.min(gained, need);

      // аккуратно прибавляем, без setLive (чтобы не сбить lastAddedTime)
      live().value = Math.min(MAX_LIVES, live().value + toAdd);

      if (live().value < MAX_LIVES) {
        // сохраняем прогресс интервала
        lastAddedTime().value = now - remainder;
        timeLeft().value = RECOVERY_TIME - remainder;
      } else {
        // достигли максимума — обнуляем таймер
        lastAddedTime().value = null;
        timeLeft().value = 0;
      }

      saveState();
    } else {
      // ещё не набежал полный интервал — считаем обратный отсчёт
      timeLeft().value = RECOVERY_TIME - elapsed;
    }
  };

  // Форматирование оставшегося времени (MM:SS)
  const formattedTimeLeft = computed(() => {
    const totalSeconds = Math.ceil(timeLeft().value / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  });

  // Запускаем интервал восстановления
  // onNuxtReady(() => {
  //   setInterval(checkRecovery, 1000); // проверяем каждую секунду
  // });

  return {
    point,
    diamond,
    live,
    init,
    setPoint,
    setDiamond,
    setLive,
    formattedTimeLeft,
    checkRecovery,
    loadState,
  };
};
