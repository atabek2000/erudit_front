export default function (num) {
  const { t } = useI18n();
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${num} ${t("life_3")}`; // жизней
  }

  switch (lastDigit) {
    case 1:
      return `${num} ${t("life_1")}`; // жизнь
    case 2:
    case 3:
    case 4:
      return `${num} ${t("life_2")}`; // жизни
    default:
      return `${num} ${t("life_3")}`; // жизней
  }
}
