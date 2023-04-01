import { getRefs } from "./css/refs";

const refs = getRefs();

export function fetchCountries(countryName) {
    const BASE_URL = `https://restcountries.com/v3.1/name/`;
    return fetch(`${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
            console.log(response)
            if (!response.ok) {
                refs.countryList.innerHTML = ``;
                throw new Error();
            }
        return response.json();
    })
}