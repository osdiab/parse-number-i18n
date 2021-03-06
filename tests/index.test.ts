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
        // we compare against a formatted value since Intl.NumberFormat has a
        // maximum precision limit, causing the test to fail unnecessarily
        const [formattedToEn, formattedToLocale] = ["en", locale].map((l) =>
          Intl.NumberFormat(l).format(value)
        );
        // parseFloat can't deal with comma thousands separators, so we strip
        // them
        const expected = parseFloat(formattedToEn.replace(/,/g, ""));
        const parsed = parseNumberI18n(formattedToLocale, locale);

        t.is(
          parsed,
          expected,
          `Parsing ${formattedToEn} in ${locale} (Formatted: ${formattedToLocale}) resulted in unexpected value`
        );
      }
    ),
    { numRuns: 10000 } // run it more than the default 100 times
  );
});
