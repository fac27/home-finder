import { validatePostcode } from './utils/validatePostcode.js';
import { getBasicInfo } from './utils/getBasicInfo.js';
import { displayBasicInfo } from './ui/displayBasicInfo.js';
import { CrimeData } from './utils/getCrimeData.js';
import { displayCrimeInfo } from './ui/displayCrimeInfo.js';
import { getLongAndLat } from './utils/getLongAndLat.js';
import { autocompletePostcode } from './utils/autocompletePostcode.js';
import { displayPostcodes } from './ui/displayPostcodes.js';
import { getNearestBuses } from './utils/getNearestTransport.js';
import { displayTransportInfo } from './ui/displayTransportInfo.js';

const crimeError = document.querySelector('#crime__error');
const postcodeError = document.querySelector('#postcode__error');
const postcodeForm = document.querySelector('#form__search');
const postcodeSearch = document.querySelector('#postcode');
const welcomeSection = document.querySelector('.welcome__section');

// get postcode from from, validate it, then display basic info on the page
const handleSubmit = (e) => {
  e.preventDefault();
  const postcode = e.target.children[1].value;

  // clear the postocode suggestions container
  document.querySelector('.postcodes__container').innerHTML = '';

  validatePostcode(postcode)
    .then((result) => {
      if (result) {
        // postcodeError.innerHTML = '';
        welcomeSection.style.display = 'none';

        getBasicInfo(postcode).then((data) => displayBasicInfo(data));
        getNearestBuses(postcode).then((data) => displayTransportInfo(data));
        getLongAndLat(postcode)
          .then((result) => {
            const { longitude, latitude } = result;
            const crimeData = new CrimeData(
              latitude,
              longitude,
              '2022-10',
              '2021-11'
            );

            crimeData.fetchCrimeData().then((response) => {
              if (!response.toString().includes('Error')) {
                displayCrimeInfo(crimeData, postcode.toUpperCase());
              } else {
                crimeError.textContent = 'Unable to fetch crime data';
                console.error(response);
              }
            });
          })
          .catch((error) => {
            console.log(error);
            crimeError.textContent = 'Unable to fetch crime data';
          });
      } else {
        postcodeError.textContent = 'Please enter a valid UK postcode';
        throw new Error("Couldn'nt fetch data!");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  postcodeForm.reset();
};

// autocomplete postcode
const handleInput = (e) => {
  const value = e.target.value;

  // if search is empty clear postcode container from previous results
  // else send search value to autocomplete function
  value
    ? autocompletePostcode(value).then((data) => displayPostcodes(data))
    : (document.querySelector('.postcodes__container').innerHTML = '');
};

// clear error message when user starts typing new postcode
postcodeSearch.addEventListener('click', () => {
  postcodeError.innerHTML = '';
});

postcodeSearch.addEventListener('input', handleInput);
postcodeForm.addEventListener('submit', handleSubmit);
