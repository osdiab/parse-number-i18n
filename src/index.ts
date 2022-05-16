export function parseNumberI18n(value: string, locale: string) {
  const parts = Intl.NumberFormat(locale).formatToParts(123456.78);
  const [decimalSeparator, groupSeparator] = (
    ["decimal", "group"] as const
  ).map((search) => parts.find(({ type }) => type === search)?.value);
  const neutralNumber = decimalSeparator
    ? (groupSeparator
        ? value.replace(new RegExp(`[${groupSeparator}]`, "g"), "")
        : value
      ).replace(new RegExp(`[${decimalSeparator}]`, "g"), ".")
    : value;
  return parseFloat(neutralNumber);
}
