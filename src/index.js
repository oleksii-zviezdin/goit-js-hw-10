import './css/styles.css';
import Notiflix from 'notiflix';
import { getRefs } from './css/refs';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce')

const REFS = getRefs();
const DEBOUNCE_DELAY = 300;

REFS.inputEl.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    const searchCountry = REFS.inputEl.value.trim();
    
    fetchCountries(searchCountry).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
            REFS.countryList.innerHTML = ``;
            return;
        } else if (data.length >= 2 && data.length <= 10) {
            return renderListInfoAboutCountries(data);
        } return renderCardInfoAboutCountries(data)
    })
        .catch(error => Notiflix.Notify.failure(`Oops, there is no country with that name`))
        .finally(() => {
            function checkForm() {
                if (REFS.inputEl.value.length < 1) {
                    Notiflix.Notify.info(`Enter the name of the country`)
                    REFS.countryList.innerHTML = ``;
                }
            }           
            setTimeout(checkForm, 500);
        });
}

function renderCardInfoAboutCountries(country){
            console.log(country)
    REFS.countryList.innerHTML = ``;
    const markup = country.map(({ name, flags, languages, capital, population }) =>
        `<div style="display: flex;"><img width="40px" height="auto" style="margin-right: 10px" src="${flags.svg}" alt="Flag of ${name.official}"><span style="font-size: 24px; font-weight: 700">${name.official}</span></div><div style="margin-top: 10px"><b>Capital: </b>${capital}</div><div><b>Population: </b>${population}</div></div><div><b>Languages: </b>${Object.values(languages)}</div>`).join("");
    REFS.countryInfo.innerHTML = markup;
    REFS.countryInfo.children.style.display = `flex`;

}

function renderListInfoAboutCountries(countries) {
            console.log(countries)
    REFS.countryInfo.innerHTML = ``;
    const markup = countries.map(({name, flags}) => `<li><img width="25px" style="margin-right: 10px;" src="${flags.svg}" alt="Flag of ${name.official}"><span style="font-weight: 700">${name.common}</span></li>`).join("");
        REFS.countryList.innerHTML = markup;
        REFS.countryList.style.listStyle = "none";
        REFS.countryList.style.margin = "0";
        REFS.countryList.style.padding = "0";
}