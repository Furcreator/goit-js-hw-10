import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const list = document.querySelector('#country-list');
const info = document.querySelector('#country-info');

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(searchInput) {
    let inputText = searchInput.target.value.trim();

    if (inputText === '') {
        clearList();
        clearInfo();
        return;
    }

    fetchCountries(inputText).then(countries => {
        clearInfo();
        clearList();
        showAllMessage(countries);
    })
}
function showAllMessage(countries) {
    if (countries.length === 0){
        showErrorMessage()
    }
    if(countries.length > 10){
        showInfoMessage();
    }
    if(countries.length === 1){
        showCountryInfo(countries[0]);
    }
    if(countries.length > 1 && countries.length <= 10){
        showCountriesList(countries);
    }
}

function clearList() {
    list.innerHTML = '';
}
function clearInfo() {
    info.innerHTML = '';
}

function showErrorMessage() {
    Notify.failure("Oops, there is no country with that name", {timeout: 1200});
}

function showInfoMessage() {
    Notify.info("Too many matches found. Please enter a more specific name.", {timeout: 1200});
}

function showCountryInfo(country) {

    let countryInfo = `<img class="i-flag" src="" alt="" />
    <h2 class="i-title"></h2>
    <p><strong>Capital:</strong></p>
    <p><strong>Population:</strong></p>
    <p><strong>Languages:</strong></p>`
    info.innerHTML = countryInfo;
}

function showCountriesList(countries) {
    console.log(countries);

    let listItems = countries.map(country => {
        return `<li>
        <img class="l-flag" src="" alt="" />
        <h2 class="l-title"></h2>
                </li>`
    }).join('')

    list.innerHTML = listItems;
}