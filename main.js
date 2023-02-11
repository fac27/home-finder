import { validatePostcode } from './utils/validatePostcode.js';
import { getBasicInfo } from './utils/getBasicInfo.js';
import { displayBasicInfo } from './ui/displayBasicInfo.js';

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
};

const chosenArea = document.querySelector('#info-postcode');
const postcodeError = document.querySelector('#postcode-error');
const postcodeForm = document.querySelector('#form-search');

postcodeForm.addEventListener('submit', handleSubmit);
