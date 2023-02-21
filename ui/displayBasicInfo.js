import { getPostcodeMap } from '../utils/getPostcodeMap.js';

const basicInfoOutput = document.querySelector('#output__info');

export const displayBasicInfo = (info) => {
  // clear the output element first
  basicInfoOutput.innerHTML = '';
  basicInfoOutput.style.visibility = 'visible';

  const basicInfoDiv = document.createElement('div');
  basicInfoDiv.className = 'basic__info-div';

  const basicInfoDetails = document.createElement('div');
  basicInfoDetails.className = 'basic__info-details';

  const basicInfoHeader = document.createElement('h3');
  basicInfoHeader.className = 'basic__info-header';
  basicInfoHeader.textContent = 'Basic information';

  const postcodeImg = document.createElement('img');
  postcodeImg.src = getPostcodeMap(info.postcode);
  postcodeImg.alt = 'Map image of the postcode';

  const locationInfo = document.createElement('p');
  locationInfo.textContent = `${info.country}, ${info.region}, ${info.admin_district}, ${info.admin_ward}, ${info.postcode}`;
  const locationInfoSpan = document.createElement('span');
  locationInfoSpan.textContent = 'Location: ';
  locationInfo.insertAdjacentElement('afterbegin', locationInfoSpan);

  // prettier-ignore
  const dashedDateOfIntroduction = `${info.date_of_introduction.slice(0, 4)}-${info.date_of_introduction.slice(4)}`;
  const dateOfIntroduction = document.createElement('p');
  dateOfIntroduction.textContent = dashedDateOfIntroduction;
  const dateOfIntroductionSpan = document.createElement('span');
  dateOfIntroductionSpan.textContent = 'Date of introduction: ';
  dateOfIntroduction.insertAdjacentElement(
    'afterbegin',
    dateOfIntroductionSpan
  );

  const parliamentaryConstituency = document.createElement('p');
  parliamentaryConstituency.textContent = info.parliamentary_constituency;
  const parliamentaryConstituencySpan = document.createElement('span');
  parliamentaryConstituencySpan.textContent = 'Parliamentary Constituency: ';
  parliamentaryConstituency.insertAdjacentElement(
    'afterbegin',
    parliamentaryConstituencySpan
  );

  const primaryCareTrust = document.createElement('p');
  primaryCareTrust.textContent = info.primary_care_trust;
  const primaryCareTrustSpan = document.createElement('span');
  primaryCareTrustSpan.textContent = 'Primary Care Trust: ';
  primaryCareTrust.insertAdjacentElement('afterbegin', primaryCareTrustSpan);

  const policeForce = document.createElement('p');
  policeForce.textContent = info.pfa;
  const policeForceSpan = document.createElement('span');
  policeForceSpan.textContent = 'Police Force: ';
  policeForce.insertAdjacentElement('afterbegin', policeForceSpan);

  // add info icon to the first part of all info details elements
  [
    locationInfo,
    dateOfIntroduction,
    parliamentaryConstituency,
    primaryCareTrust,
    policeForce,
  ].forEach((el) => {
    const infoIcon = document.createElement('span');
    infoIcon.className = 'info__icon';
    infoIcon.innerHTML = '<i class="uil uil-info-circle"></i>';
    el.insertAdjacentElement('afterbegin', infoIcon);
  });

  basicInfoDetails.append(locationInfo);
  basicInfoDetails.append(dateOfIntroduction);
  basicInfoDetails.append(parliamentaryConstituency);
  basicInfoDetails.append(primaryCareTrust);
  basicInfoDetails.append(policeForce);

  basicInfoDiv.append(postcodeImg);
  basicInfoDiv.append(basicInfoDetails);

  basicInfoOutput.append(basicInfoHeader);
  basicInfoOutput.append(basicInfoDiv);
};
