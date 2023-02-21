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
import { convertToMonthName } from './utils/convertToMonthName.js';

const crimeError = document.querySelector('#crime__error');
const postcodeError = document.querySelector('#postcode__error');
const postcodeForm = document.querySelector('#form__search');
const postcodeSearch = document.querySelector('#postcode');
const welcomeSection = document.querySelector('.welcome__section');
const crimeChartOverlay = document.querySelector('#crime__chart--large');

// get postcode from from, validate it, then display basic info on the page
const handleSubmit = (e) => {
  e.preventDefault();
  const postcode = e.target.children[1].value;

  // clear the postcode suggestions container
  document.querySelector('.postcodes__container').innerHTML = '';

  validatePostcode(postcode)
    .then((result) => {
      if (result) {
        // postcodeError.innerHTML = '';
        welcomeSection.style.display = 'none';

        getBasicInfo(postcode).then((data) => displayBasicInfo(data));
        getNearestBuses(postcode).then((data) => displayTransportInfo(data));

        const date = new Date();
        const currentMonth = date.getMonth() + 1; // Get zero based month from current date object and add one to it
        const currentYear = date.getFullYear();

        // Set monthFrom to two months before the current month
        const monthFrom = CrimeData.getMonthsBefore(currentMonth, currentYear, 2);
        // Get 12 months before monthFrom
        const monthTo = CrimeData.getMonthsBefore(monthFrom.month, monthFrom.year, 12);

        getLongAndLat(postcode)
          .then((result) => {
            const { longitude, latitude } = result;
            const crimeData = new CrimeData(
              latitude,
              longitude,
              // Zero pad single digit months in monthFrom and monthTo and build 2023-02 style string
              `${monthFrom.year}-${(monthFrom.month < 10) ? ' ' + monthFrom.month : monthFrom.month}`,
              `${monthTo.year}-${(monthTo.month < 10) ? ' ' + monthTo.month : monthTo.month}`,
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
        throw new Error("Couldn't fetch data!");
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
