import { getPostcodeMap } from '../utils/getPostcodeMap.js';

const basicInfoOutput = document.querySelector('#output__info');

export const displayBasicInfo = (info) => {
  // clear the output element first
  basicInfoOutput.innerHTML = '';

  const postcodeImg = document.createElement('img');
  postcodeImg.src = getPostcodeMap(info.postcode);
  postcodeImg.alt = 'Map image of the postcode';

  const locationInfo = document.createElement('p');
  locationInfo.textContent = `Location: ${info.country}, ${info.region}, ${info.admin_district}, ${info.admin_ward}, ${info.postcode}`;

  // prettier-ignore
  const dashedDateOfIntroduction = `${info.date_of_introduction.slice(0, 4)}-${info.date_of_introduction.slice(4)}`;
  const dateOfIntroduction = document.createElement('p');
  dateOfIntroduction.textContent = `Date of introduction: ${dashedDateOfIntroduction}`;

  const parliamentaryConstituency = document.createElement('p');
  parliamentaryConstituency.textContent = `Parliamentary Constituency: ${info.parliamentary_constituency}`;

  const primaryCareTrust = document.createElement('p');
  primaryCareTrust.textContent = `Primary Care Trust: ${info.primary_care_trust}`;

  const clinicalComissionGroup = document.createElement('p');
  clinicalComissionGroup.textContent = `Clinical Comission Group: ${info.ccg}`;

  const policeForce = document.createElement('p');
  policeForce.textContent = `Police Force: ${info.pfa}`;

  basicInfoOutput.append(postcodeImg);
  basicInfoOutput.append(locationInfo);
  basicInfoOutput.append(dateOfIntroduction);
  basicInfoOutput.append(parliamentaryConstituency);
  basicInfoOutput.append(primaryCareTrust);
  basicInfoOutput.append(clinicalComissionGroup);
  basicInfoOutput.append(policeForce);
};
