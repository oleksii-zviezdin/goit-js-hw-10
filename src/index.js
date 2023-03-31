import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
debounce = require('lodash.debounce')

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
    countryInfo: document.querySelector(`.country-info`),
}

refs.inputEl.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    const searchCountry = refs.inputEl.value.trim();
    
    fetchCountries(searchCountry).then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
            refs.countryList.innerHTML = ``;
            return;
        } else if (data.length >= 2 && data.length <= 10) {
            return renderListInfoAboutCountries(data);
        } return renderCardInfoAboutCountries(data)
    })
        .catch(error => console.log(error))
        .finally(() => {
            function checkForm() {
                if (refs.inputEl.value.length < 1) {
                    Notiflix.Notify.info(`Enter the name of the country`)
                    refs.countryList.innerHTML = ``;
                }
            }           
            setTimeout(checkForm, 500);
        });
}

function renderCardInfoAboutCountries(countries){
    refs.countryList.innerHTML = ``;
    const markup = countries.map(({ name, flags, languages, capital, population }) =>
        `<div><img width="20px" style="margin-right: 10px" src="${flags.svg}" alt="Flag of ${name.official}"><span style="font-size: 24px; font-weight: 700">${name.official}</span><div><b>Capital: </b>${capital}</div><div><b>Population: </b>${population}</div></div><div><b>Languages: </b>${languages.ukr}</div>`).join("");
    refs.countryInfo.innerHTML = markup;
    refs.countryInfo.children.style.display = `flex`;

}

function renderListInfoAboutCountries(countries) {
    refs.countryInfo.innerHTML = ``;
    const markup = countries.map(({name, flags}) => `<li><img width="20px" style="margin-right: 10px" src="${flags.svg}" alt="Flag of ${name.official}"><span style="font-weight: 700">${name.common}</span></li>`).join("");
        refs.countryList.innerHTML = markup;
        refs.countryList.style.listStyle = "none";
        refs.countryList.style.margin = "0";
        refs.countryList.style.padding = "0";
}