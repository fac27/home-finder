// method to return a random uk postocode.
// might be useful later?

export const getRandomPostcode = () => {
  return fetch(`https://api.postcodes.io/random/postcodes`)
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => data.result.postcode);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => console.log(error));
};
