import katex from "katex";

export default (input) => {
  if (!input) {
    return "";
  }
  // проверка на LaTeX-формулы
  const regex = /\$([^$]+)\$/g;

  if (!regex.test(input)) {
    // если формул нет → вернуть текст как есть
    return escapeHTML(input);
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
