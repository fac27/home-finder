// display the postcodes returned from the autocompelete
const formSection = document.querySelector('.form__section');
const postcodeError = document.querySelector('.postcode__error');
const postcodeSearch = document.querySelector('#postcode');

const postcodesContainer = document.createElement('ul');
postcodesContainer.className = 'postcodes__container';

export const displayPostcodes = (postcodes) => {
  // first clear the previous results before appending new ones
  postcodesContainer.innerHTML = '';

  // check autocompleted postcodes array is not empty
  if (postcodes) {
    for (let postcode of postcodes) {
      const postcodeEl = document.createElement('li');
      postcodeEl.textContent = postcode;
      postcodeEl.className = 'postcode__element';
      postcodesContainer.append(postcodeEl);
    }
  } else {
    null;
  }

  formSection.insertBefore(postcodesContainer, postcodeError);

  // fill the search with the selected postcode
  const postcodesEls = document.getElementsByClassName('postcode__element');
  Array.from(postcodesEls).forEach((el) =>
    el.addEventListener(
      'click',
      (e) => (postcodeSearch.value = e.target.textContent)
    )
  );
};
