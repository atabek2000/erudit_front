export default function (num) {
  const { t } = useI18n();
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${num} ${t("diamond_3")}`; // алмазов
  }

  switch (lastDigit) {
    case 1:
      return `${num} ${t("diamond_1")}`; // алмаз
    case 2:
    case 3:
    case 4:
      return `${num} ${t("diamond_2")}`; // алмаза
    default:
      return `${num} ${t("diamond_3")}`; // алмазов
  }
}
