// method to get basic info about a postcode

export const getBasicInfo = (postcode) => {
  return fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => data.result);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => console.log(error));
};
