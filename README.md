# **countries-codes**

Comprehensive data on countries, languages, and continents, including:

- **Continents & Countries**: Features ISO 3166-1 alpha-2 codes (with mappings to alpha-3), country names, ISO 639-1 languages, capitals, ISO 4217 currency codes, native names, and calling codes.
- **Formats**: Available in JSON, CSV, and SQL formats for easy integration.
- **Additional Data**: Includes separate JSON files with country emoji flags for enhanced representation.

## Installation

You can install the package using **npm**, **yarn**, or **pnpm**.

```bash
pnpm add countries-codes

yarn install countries-codes

npm install countries-codes
```

## Usage

```tsx
import { textSimilarity } from "countries-codes";

const similarity1 = textSimilarity("hello world", "hello", 2); // Default parameters (substring length: 2, case insensitive)
console.log(similarity1);

const similarity2 = textSimilarity("JavaScript", "javascript", 2, true); // Comparison is case-sensitive and the strings differ in case
console.log(similarity2);

const similarity3 = textSimilarity("apple pie", "apple", 3); // Substring length of 3, ignoring case by default
console.log(similarity3);
```

## Countries & Languages: minimal size files

This directory contains simplified data for each list,
converting `Object` with fields to `Array` with fields in predefined order to decrease the file size (and traffic).

### Country codes: ISO 3166-1 **alpha-2** to **alpha-3** ~2.7KB

Example: `{"UA":"UKR"}`

### Country codes: ISO 3166-1 **alpha-3** to **alpha-2** ~2.7KB

Example: `{"UKR":"UA"}`

### Country emoji by **ISO 3166-1 alpha-2** code ~3.9KB

Example: `{"UA":"🇺🇦"}`

### Country names (English) by **ISO 3166-1 alpha-2** code ~4.3KB

Example: `{"UA":"Ukraine"}`

### Country names (native) by **ISO 3166-1 alpha-2** code ~4.8KB

Example: `{"UA":"Україна"}`

### Language names (English) by **ISO 639-1 alpha-2** code ~1.7KB

Example: `{"uk":"Ukrainian"}`

### Language names (native) by **ISO 639-1 alpha-2** code ~2.2KB

Example: `{"uk":"Українська"}`

## tsup

Bundle your TypeScript library with no config, powered by esbuild.

https://tsup.egoist.dev/

## How to use this

1. install dependencies

```
# pnpm
$ pnpm install

# yarn
$ yarn install

# npm
$ npm install
```

2. Add your code to `src`
3. Add export statement to `src/index.ts`
4. Test build command to build `src`.
   Once the command works properly, you will see `dist` folder.

```zsh
# pnpm
$ pnpm run build

# yarn
$ yarn run build

# npm
$ npm run build
```

5. Publish your package

```zsh
$ npm publish
```

## test package

https://www.npmjs.com/package/countries-codes
