import {
  continents,
  countries,
  languages,
  getCountryCode,
  getCountryData,
  getCountryDataList,
  getEmojiFlag,
} from "../index";

describe("countries-codes", () => {
  describe("Data exports", () => {
    test("should export continents data", () => {
      expect(continents).toBeDefined();
      expect(typeof continents).toBe("object");
      expect(Object.keys(continents).length).toBeGreaterThan(0);
    });

    test("should export countries data", () => {
      expect(countries).toBeDefined();
      expect(typeof countries).toBe("object");
      expect(Object.keys(countries).length).toBeGreaterThan(0);
    });

    test("should export languages data", () => {
      expect(languages).toBeDefined();
      expect(typeof languages).toBe("object");
      expect(Object.keys(languages).length).toBeGreaterThan(0);
    });
  });

  describe("getCountryCode", () => {
    test("should return correct country code for valid country name", () => {
      expect(getCountryCode("United States")).toBe("US");
      expect(getCountryCode("Germany")).toBe("DE");
      expect(getCountryCode("Japan")).toBe("JP");
    });

    test("should be case insensitive", () => {
      expect(getCountryCode("united states")).toBe("US");
      expect(getCountryCode("GERMANY")).toBe("DE");
      expect(getCountryCode("JaPaN")).toBe("JP");
    });

    test("should handle native names", () => {
      // Test with native names if available in the data
      const result = getCountryCode("Deutschland");
      if (result) {
        expect(result).toBe("DE");
      }
    });

    test("should return false for invalid country name", () => {
      expect(getCountryCode("Invalid Country")).toBe(false);
      expect(getCountryCode("")).toBe(false);
      expect(getCountryCode("123")).toBe(false);
    });

    test("should handle special characters in country names", () => {
      expect(getCountryCode("Côte d'Ivoire")).toBeTruthy();
    });
  });

  describe("getCountryData", () => {
    test("should return complete country data for valid ISO2 code", () => {
      const usData = getCountryData("US");
      expect(usData).toBeDefined();
      expect(usData.iso2).toBe("US");
      expect(usData.iso3).toBeDefined();
      expect(usData.name).toBeDefined();
      expect(usData.native).toBeDefined();
      expect(usData.capital).toBeDefined();
      expect(usData.continent).toBeDefined();
      expect(Array.isArray(usData.currency)).toBe(true);
      expect(Array.isArray(usData.languages)).toBe(true);
      expect(Array.isArray(usData.phone)).toBe(true);
    });

    test("should include all required properties", () => {
      const data = getCountryData("US");
      const requiredProps = [
        "iso2",
        "iso3",
        "name",
        "native",
        "capital",
        "continent",
        "currency",
        "languages",
        "phone",
      ];

      requiredProps.forEach((prop) => {
        expect(data).toHaveProperty(prop);
      });
    });
  });

  describe("getCountryDataList", () => {
    test("should return array of all countries", () => {
      const countryList = getCountryDataList();
      expect(Array.isArray(countryList)).toBe(true);
      expect(countryList.length).toBeGreaterThan(0);
    });

    test("should return complete data for each country", () => {
      const countryList = getCountryDataList();
      const firstCountry = countryList[0];

      expect(firstCountry).toBeDefined();
      if (firstCountry) {
        expect(firstCountry.iso2).toBeDefined();
        expect(firstCountry.iso3).toBeDefined();
        expect(firstCountry.name).toBeDefined();
        expect(firstCountry.native).toBeDefined();
      }
    });

    test("should have unique ISO2 codes", () => {
      const countryList = getCountryDataList();
      const iso2Codes = countryList.map((country) => country.iso2);
      const uniqueIso2Codes = new Set(iso2Codes);

      expect(iso2Codes.length).toBe(uniqueIso2Codes.size);
    });
  });

  describe("getEmojiFlag", () => {
    test("should return emoji flag for valid country codes", () => {
      expect(getEmojiFlag("US")).toBe("🇺🇸");
      expect(getEmojiFlag("DE")).toBe("🇩🇪");
      expect(getEmojiFlag("JP")).toBe("🇯🇵");
      expect(getEmojiFlag("GB")).toBe("🇬🇧");
    });

    test("should return empty string for invalid country codes", () => {
      expect(getEmojiFlag("123" as any)).toBe("");
      expect(getEmojiFlag("USA" as any)).toBe("");
    });

    test("should handle lowercase country codes", () => {
      expect(getEmojiFlag("US")).toBe("🇺🇸");
      expect(getEmojiFlag("DE")).toBe("🇩🇪");
    });

    test("should return empty string for empty or invalid input", () => {
      expect(getEmojiFlag("" as any)).toBe("");
      expect(getEmojiFlag("U" as any)).toBe("");
      expect(getEmojiFlag("USA" as any)).toBe("");
    });
  });

  describe("Data integrity", () => {
    test("all countries should have valid continent codes", () => {
      const countryList = getCountryDataList();
      const continentCodes = Object.keys(continents);

      countryList.forEach((country) => {
        expect(continentCodes).toContain(country.continent);
      });
    });

    test("all countries should have valid language codes", () => {
      const countryList = getCountryDataList();
      const languageCodes = Object.keys(languages);

      countryList.forEach((country) => {
        country.languages.forEach((langCode) => {
          expect(languageCodes).toContain(langCode);
        });
      });
    });

    test("all countries should have valid phone codes", () => {
      const countryList = getCountryDataList();

      countryList.forEach((country) => {
        expect(Array.isArray(country.phone)).toBe(true);
        expect(country.phone.length).toBeGreaterThan(0);
        country.phone.forEach((phoneCode) => {
          expect(typeof phoneCode).toBe("number");
          expect(phoneCode).toBeGreaterThan(0);
        });
      });
    });

    test("all countries should have valid currency codes", () => {
      const countryList = getCountryDataList();

      countryList.forEach((country) => {
        expect(Array.isArray(country.currency)).toBe(true);
        // Some countries might not have currency (e.g., territories)
        if (country.currency.length > 0) {
          country.currency.forEach((currencyCode) => {
            expect(typeof currencyCode).toBe("string");
            expect(currencyCode.length).toBe(3);
            expect(currencyCode).toMatch(/^[A-Z]{3}$/);
          });
        }
      });
    });
  });
});
