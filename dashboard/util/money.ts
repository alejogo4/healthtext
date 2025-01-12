export const convertTextToMoney = (
  text: string,
  options?: Intl.NumberFormatOptions
): string => {
  const locale = "es-CO";
  const number = parseFloat(text);
  if (isNaN(number)) {
    throw new Error("The provided text is not a valid number");
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  });

  return formatter.format(number);
};
