export default () => {
  const point = () => useState("user_point", () => 0);
  const diamond = () => useState("user_diamond", () => 0);
  const live = () => useState("user_live", () => 0);

  const init = (data) => {
    point().value = data?.point || 0;
    diamond().value = data?.diamond || 0;
    live().value = data?.live || 0;
  };

  const setPoint = (val) => {
    point().value = val;
  };

  const setDiamond = (val) => {
    diamond().value = val;
  };

  const setLive = (val) => {
    if (val < 0) live().value = 0;
    else if (val > 5) live().value = 5;
    else live().value = val;
  };

  return {
    point,
    diamond,
    live,
    init,
    setPoint,
    setDiamond,
    setLive,
  };
};
