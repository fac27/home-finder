// - map url = https://map.getthedata.com/local/${postcode}.png

export const getPostcodeMap = (postcode) => {
  // the map url only accepts lower cased postcodes seperated by a dash
  // e.g sl4-3aa

  const sanitizedPostcode = postcode
    .split('')
    .filter((char) => char !== ' ')
    .map((char) => char.toLowerCase())
    .join('');

  // prettier-ignore
  const dashedPostcode = `${sanitizedPostcode.slice(0, -3)}-${sanitizedPostcode.slice(-3)}`;

  return `https://map.getthedata.com/local/${dashedPostcode}.png`;
};
