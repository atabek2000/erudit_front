import katex from "katex";

export default (input) => {
  // проверка на LaTeX-формулы
  const regex = /\$([^$]+)\$/g;

  if (!regex.test(input)) {
    // если формул нет → вернуть текст как есть
    return input;
  }

  // заменить формулы на готовый HTML
  return input.replace(regex, (_, expr) => {
    try {
      return katex.renderToString(expr, { throwOnError: false });
    } catch {
      return expr; // если не парсится — оставить как текст
    }
  });
};
