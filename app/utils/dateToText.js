export default (dateString) => {
  const { t } = useI18n();

  const date = new Date(dateString);

  const day = date.getDate();
  const month = t(`months_genitive.${date.getMonth() + 1}`);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
