export default function (num) {
  const { t } = useI18n();
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${num} ${t("score_3")}`;
  }

  switch (lastDigit) {
    case 1:
      return `${num} ${t("score_1")}`;
    case 2:
    case 3:
    case 4:
      return `${num} ${t("score_2")}`;
    default:
      return `${num} ${t("score_3")}`;
  }
}
