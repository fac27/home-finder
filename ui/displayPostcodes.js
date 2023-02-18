// display the postcodes returned from the autocompelete
const infoSection = document.querySelector('.info__section');
const infoHeader = document.querySelector('.info__header');
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

  infoSection.insertBefore(postcodesContainer, infoHeader);

  // fill the search with the selected postcode
  const postcodesEls = document.getElementsByClassName('postcode__element');
  Array.from(postcodesEls).forEach((el) =>
    el.addEventListener(
      'click',
      (e) => (postcodeSearch.value = e.target.textContent)
    )
  );
};
