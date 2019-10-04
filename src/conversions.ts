interface Country {
    name: string;
    region: string;
    population: number;
    area: number;
    languages: Array<Language>;
    subregion: string;
    currencies: Array<Currency>;
  }
  
  interface Currency {
    code: string;
    name: string;
    symbol: string;
  }
  
  interface Language {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }
  
  export class Conversions {
    
    static excercise1(input: Array<Country>): Array<string> {
      return input.map(country => country.name);
    }
  
    
    static excercise2(input: Array<Country>): Array<string> {
      return input
        .filter(({ region }) => region === "Europe")
        .map(country => country.name);
    }
  

    static excercise3(
      input: Array<Country>
    ): Array<{ name: string; area: string }> {
      return input
        .filter(({ population }) => population > 100000000)
        .map(({ name, area }) => ({ name, area: area + " km2" }));
    }
  

    static excercise4(input: Array<Country>): Array<Language> {
      return input
        .filter(({ subregion }) => subregion === "South America")
        .map(({ languages }) => languages)
        .flat()
        .reduce((acc, lang) => {
          return acc.some(langFromAcc => langFromAcc.name === lang.name)
            ? acc
            : [...acc, lang];
        }, []);
    }
  
   
    static excercise5(input: Array<Country>): { [key: string]: Array<string> } {
      const addCountry = (
        languages: Array<Language>,
        country: string
      ): Array<{ language: string; country: string }> => {
        return languages.map(({ name }) => ({ language: name, country }));
      };
  
      return input
        .filter(({ subregion }) => subregion === "South America")
        .map(({ name, languages }) => addCountry(languages, name))
        .flat()
        .reduce((acc, pair) => {
          return {
            ...acc,
            [pair.language]: [...(acc[pair.language] || []), pair.country]
          };
        }, {});
    }
  
    
    static excercise6(
      input: Array<Country>
    ): Array<{ language: string; countries: Array<string> }> {
      return Object.entries(Conversions.excercise5(input)).map(
        //      ([language, countries]) => ({ language, countries })
        pair => ({ language: pair[0], countries: pair[1] })
      );
    }
  
   
    static excercise7(input: Array<Country>): any {
      const addCountry = (currencies: Array<Currency>, country: string) => {
        return currencies.map(({ name }) => ({ currency: name, country }));
      };
  
      const getCurrencyAndCountryArray = (input: Array<Country>) => {
        return input.flatMap(({ currencies, name }) =>
          addCountry(currencies, name)
        );
      };
  
      const combineCountries = input => {
        return input.reduce((acc, pair) => {
          return {
            ...acc,
            [pair.currency]: [...(acc[pair.currency] || []), pair.country]
          };
        }, {});
      };
  
      const arrayOfCurrenciesAndArraysOfCountries = (input: { countries }) => {
        return Object.entries(input).map(([currency, countries]) => ({
          currency,
          countries,
          count: countries.length
        }));
      };
  
      const filterFivePlusCurrencies = input => {
        return input.filter(({ count }) => count >= 5);
      };
  
      return filterFivePlusCurrencies(
        arrayOfCurrenciesAndArraysOfCountries(
          combineCountries(getCurrencyAndCountryArray(input))
        )
      );
    }
  }