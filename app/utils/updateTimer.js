export default (createdAt, totalDuration) => {
  const created = new Date(createdAt);

  const elapsed = Math.floor((Date.now() - created.getTime()) / 1000);
  const left = totalDuration - elapsed;
  return left > 0 ? left : 0;
};
