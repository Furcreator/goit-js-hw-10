import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const list = document.querySelector('#country-list');
const info = document.querySelector('#country-info');

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    let inputText = e.target.value.trim();
    console.log(inputText);
    fetchCountries(inputText)
    .then(countryArray => {
        return countryArray;
      })
      .catch(error => {
        console.log(error);
      });
}