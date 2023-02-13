import { validatePostcode } from './utils/validatePostcode.js';
import { getBasicInfo } from './utils/getBasicInfo.js';
import { displayBasicInfo } from './ui/displayBasicInfo.js';
import { CrimeData } from './utils/getCrimeData.js';
import { displayCrimeInfo } from './ui/displayCrimeInfo.js';
import { getLongAndLat } from './utils/getLongAndLat.js';

// get postcode from from, validate it, then display basic info on the page
const handleSubmit = (e) => {
  e.preventDefault();
  const postcode = e.target.children[1].value;

  validatePostcode(postcode).then((result) => {
    if (result) {
      postcodeError.innerHTML = '';
      chosenArea.textContent = postcode;
      getBasicInfo(postcode).then((data) => displayBasicInfo(data));
    } else {
      postcodeError.textContent = 'Please enter a valid UK postcode';
    }
  });

  postcodeForm.reset();

  getLongAndLat(postcode)
    .then((result) => {
      const { longitude, latitude } = result;

      const crimeData = new CrimeData(latitude, longitude);

      crimeData.fetchCrimeData().then(() => {
        displayCrimeInfo(crimeData, postcode.toUpperCase());
      });
    })
    .catch((error) => console.log(error));
};

const chosenArea = document.querySelector('#info-postcode');
const postcodeError = document.querySelector('#postcode-error');
const postcodeForm = document.querySelector('#form-search');
const crimeError = document.querySelector('#crime-error');

postcodeForm.addEventListener('submit', handleSubmit);
