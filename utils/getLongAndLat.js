// method to return an object containing longitude and latitude of a given postcode.

export const getLongAndLat = (postcode) => {
  return fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => ({
          latitude: data.result.latitude,
          longitude: data.result.longitude,
        }));
      } else {
        throw new Error(response.status);
      }
    })
    .catch((error) => console.log(error));
};
