# parse-number-i18n

Lightweight library for locale-aware number parsing, using browser Intl locale
data. Well tested thanks to [`fast-check`](https://github.com/dubzzz/fast-check)

## Usage

```ts
import { parseNumberI18n } from "parse-number-i18n";

// all of these return 123456.78
parseNumberI18n("123.456,78", "de");
parseNumberI18n("123 456,78", "fr");
parseNumberI18n("1,23,456.78", "hi");
parseNumberI18n("123,456.78", "en");
```

## Requirements

- The environment needs to have the Intl object and the requested locales data
  present
  - [As of v13, Node ships with all locales by
    default](https://nodejs.org/api/intl.html)
  - Modern browsers ship with all locales by default (citation needed)
  - You can polyfill it with [FormatJS](https://formatjs.io/) if it does not

## Unsupported features (as of now)

- Locales with non-Western numerals (e.g. Arabic, Bengali)
- Numbers that don't use consistent separators (e.g. Chinese/Japanese numbers
  written with Chinese characters)

## TODO for release

- [ ] test that package is configured properly to be easily included
  - [ ] in web apps
  - [ ] in Node scripts
  - [ ] in Deno
- [ ] test that this doesn't break in modern environments
- [ ] allow parsing numbers with a third party number library (e.g. big.js)
