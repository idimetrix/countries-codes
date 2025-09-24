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

### Basic Usage

```typescript
import {
  continents,
  countries,
  languages,
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from "countries-codes";

// Get country code by name
const countryCode = getCountryCode("United States"); // "US"
const countryCodeCaseInsensitive = getCountryCode("germany"); // "DE"

// Get complete country data
const usData = getCountryData("US");
console.log(usData);
// {
//   iso2: "US",
//   iso3: "USA",
//   name: "United States",
//   native: "United States",
//   capital: "Washington D.C.",
//   continent: "NA",
//   currency: ["USD"],
//   languages: ["en"],
//   phone: [1]
// }

// Get emoji flag
const flag = getEmojiFlag("US"); // "🇺🇸"
const germanFlag = getEmojiFlag("DE"); // "🇩🇪"

// Get all countries data
const allCountries = getCountryDataList();
console.log(`Total countries: ${allCountries.length}`);

// Access raw data
console.log(continents.NA); // "North America"
console.log(countries.US.name); // "United States"
console.log(languages.en.name); // "English"
```

### Advanced Usage

```typescript
import {
  getCountryDataList,
  getCountryCode,
  getEmojiFlag,
} from "countries-codes";

// Find countries by continent
const allCountries = getCountryDataList();
const europeanCountries = allCountries.filter(
  (country) => country.continent === "EU",
);

// Create a country selector with flags
const countryOptions = allCountries.map((country) => ({
  value: country.iso2,
  label: `${getEmojiFlag(country.iso2)} ${country.name}`,
  native: country.native,
}));

// Search functionality
function searchCountries(query: string) {
  return allCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.native.toLowerCase().includes(query.toLowerCase()),
  );
}

// Get country by phone code
function getCountryByPhone(phoneCode: number) {
  return allCountries.find((country) => country.phone.includes(phoneCode));
}
```

## API Reference

### Functions

#### `getCountryCode(countryName: string): TCountryCode | false`

Returns the ISO 3166-1 alpha-2 country code for a given country name (case-insensitive).

#### `getCountryData(iso2: TCountryCode): ICountryData`

Returns complete country data including ISO codes, name, capital, continent, currencies, languages, and phone codes.

#### `getCountryDataList(): ICountryData[]`

Returns an array of all countries with complete data.

#### `getEmojiFlag(countryCode: TCountryCode): string`

Returns the emoji flag for a given ISO 3166-1 alpha-2 country code.

### Data Objects

#### `continents: TContinents`

Object mapping continent codes to continent names.

#### `countries: TCountries`

Object mapping country codes to country data.

#### `languages: TLanguages`

Object mapping language codes to language data.

### TypeScript Types

```typescript
interface ICountry {
  capital: string;
  continent: TContinentCode;
  continents?: TContinentCode[];
  currency: string[];
  languages: TLanguageCode[];
  name: string;
  native: string;
  partOf?: string;
  phone: number[];
  userAssigned?: boolean;
}

interface ICountryData extends ICountry {
  iso2: TCountryCode;
  iso3: string;
}

interface ILanguage {
  name: string;
  native: string;
  rtl?: number;
}
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
