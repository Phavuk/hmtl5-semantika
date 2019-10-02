interface Country {
name:string;
region:string;
}

/*

Vráťte pole s názvami všetkých krajín.
Vráťte pole s názvami európskych krajín.
Vráťte pole objektov s vlastnosťami name a area, popisujúce krajiny s počtom obyvateľov nad 100 miliónov, teda:
  [ { name: 'Bangladesh', area: '147570 km2' },
    { name: 'Brazil', area: '8515767 km2' },
    { name: 'China', area: '9640011 km2' },
    ...
  ]
 
 */

export class Conversions {

    static exercise(input: Array<Country>):Array<string>{
        return input.map(country => country.name);
    }


    static exercise2(input: Array<Country>):Array<string>{
        return input.filter(country => country.region === "Europe").map(country => country.name);
    }

    static exercise3(input: Array<Country>):Array<string>{
        return input.filter(country => country.region === "Europe").map(country => country.name);
    }

}