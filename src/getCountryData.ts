import { countries } from "./data/countries";
import { countries2to3 } from "./data/countries.2to3";
import { ICountryData, TCountryCode } from "./types";

export const getCountryData = (iso2: TCountryCode): ICountryData => ({
  ...countries[iso2],
  iso2,
  iso3: countries2to3[iso2],
});

export const getCountryDataList = (): ICountryData[] =>
  (Object.keys(countries) as TCountryCode[]).map((iso2) =>
    getCountryData(iso2),
  );
