interface Country {
    name:string;
    region:string;
    population: number;
    area: number;
    languages: Array<Language>;
    subregion:string;
}
    
    interface Language {
        iso639_1: string;
        iso639_2: string;
        name: string;
        nativeName:string;
    }
    
    export class Conversions {
    
        static exercise(input: Array<Country>):Array<string>{
            return input.map(country => country.name);
        }
        
        static exercise3(
            input: Array<Country>
        ): Array<{ name: string; area: string}> {
            return input 
                .filter(({population}) => population > 1000000)
                .map(({name, area}) => ({name,area: area + "km2"}));
        }

        static exercise4(
            input: Array<Country>): Array<Language>{
                return input.filter((subregion) => "South America")
            .map(({languages}) => languages).flat()
            .reduce((acc,lang)=> {
                return acc.some(langFromAcc => langFromAcc.name === lang.name) ? acc : [...acc,lang];
            }, []);
            }
        
        static exercise5(input: Array<Country>): any {
            const addCountry = (
                languages: Array<Language>,
                country: string
            ): Array<{ language: string; country: string}> => {
                return languages.map(({name}) => ({ language: name, country}));
            };

            return input 
            .filter(({ subregion}) => subregion === "South America")
            .map(({name , languages}) => addCountry(languages,name))
            .flat()
            .reduce((acc,pair) => {
                return {
                    ...acc,
                    [pair.language]: [...(acc[pair.language] || []), pair.country]
                };
            }, {});
        }

        static exercise6(
            input: Array<Country>
            ): Array<{language:string,countries:Array<String>}> {
            return Object.entries(Conversions.exercise5(input)).map(
               // ([language,countries]) => ({ language,countries})
               pair => ({ language: pair[0], countries: pair[1]})
            );
        }
    }