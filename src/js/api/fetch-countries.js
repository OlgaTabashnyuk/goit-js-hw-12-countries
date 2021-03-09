import TemplateMarkup from '../../templates/handlebars.hbs';
import CountiesList from '../../templates/countries-list.hbs'
var debounce = require('lodash.debounce');

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

const refs = {
    searchInput: document.querySelector('.search-input'),
    countryContainer: document.querySelector('.country-container'),
}

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
    refs.countryContainer.innerHTML = ''
    const searchCountry = event.target.value;
   
    fetchCountries(searchCountry)
        .then(response => {
            refs.countryContainer.innerHTML = '';
            
            if (response.length === 1) {
                refs.countryContainer.insertAdjacentHTML('beforeend', TemplateMarkup(response))
            }
            if (response.length >= 2 && response.length <= 10) {
                 refs.countryContainer.insertAdjacentHTML('beforeend', CountiesList(response))
            }
            else if (response.length > 10) {
                error({
  title: 'Error! :(',
  text: 'Too many matches found! Please enter a more spesific query!'
});
            }
    });

} 


    function fetchCountries(searchQuery) {
        return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
            .then(response => {
                return response.json();
            })
};

function renderCountryCard(country) {
     const markup = TemplateMarkup(country);
     refs.countryContainer.innerHTML = markup; 
}

export default fetchCountries;