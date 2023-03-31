export function fetchCountries(countryName) {
    const BASE_URL = `https://restcountries.com/v3.1/name/`;
    return fetch(`${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(Notiflix.Notify.failure(`Oops, there is no country with that name`));
            }
        return response.json();
    });
}