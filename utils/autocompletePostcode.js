// method to return an list of matching postcodes
// limit= (not required) Limits number of postcodes matches to return.
// Defaults to 10. Needs to be less than 100.

export const autocompletePostcode = (postocde) => {
  return fetch(
    `https://api.postcodes.io/postcodes/${postocde}/autocomplete?limit=20`
  )
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => data.result);
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => console.log(error));
};
