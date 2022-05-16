/**
 * Parses a number in the format of the given locale
 * @param value The number to parse, as a string
 * @param locale The locale to parse it in
 * @returns A JavaScript number parsed with the provided locale
 */
export function parseNumberI18n(value: string, locale: string) {
  // use a dummy number to get the decimal and group separators for the locale
  const parts = Intl.NumberFormat(locale).formatToParts(123456.78);
  const [decimalSeparator, groupSeparator] = (
    ["decimal", "group"] as const
  ).map((search) => parts.find(({ type }) => type === search)?.value);

  // regardless of the underlying format, if we know the decimal separator then
  // the group separator can be dropped safely. That said, this won't work with
  // numbers that use other separators, like Chinese/Japanese numbers using
  // Chinese characters (e.g. ２万３千４百５６); this library currently does not support
  // those. I could be wrong through so please tell me if I am!
  const neutralNumber = decimalSeparator
    ? (groupSeparator
        ? value.replace(new RegExp(`[${groupSeparator}]`, "g"), "")
        : value
      ).replace(new RegExp(`[${decimalSeparator}]`, "g"), ".")
    : value;

  return parseFloat(neutralNumber);
}
