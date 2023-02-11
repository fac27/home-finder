// validates given UK postocdes.
// Returns a promise that resolves to either true or false

export const validatePostcode = (postocde) => {
  return fetch(`https://api.postcodes.io/postcodes/${postocde}/validate`)
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => data.result);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => console.log(error));
};
