import test from "ava";
import fc from "fast-check";
import { parseNumberI18n } from "../src";

// TODO: allow any locale once they're supported
const localeArbitrary = fc.oneof(
  ...(["en", "de", "fr", "in"] as const).map((v) => fc.constant(v))
);
test("it works for all locales", (t) => {
  fc.assert(
    fc.property(
      localeArbitrary,
      fc.float({ noNaN: true, noDefaultInfinity: true }),
      (locale, value) => {
        const [formattedToEn, formattedToLocale] = ["en", locale].map((l) =>
          Intl.NumberFormat(l).format(value)
        );
        const expected = parseFloat(formattedToEn.replace(/,/g, ""));
        const parsed = parseNumberI18n(formattedToLocale, locale);
        t.is(
          parsed,
          expected,
          `Parsing ${formattedToEn} in ${locale} (Formatted: ${formattedToLocale}) resulted in unexpected value`
        );
      }
    ),
    { numRuns: 10000 }
  );
});
