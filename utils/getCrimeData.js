export class CrimeData {
  constructor(latitude, longitude, monthFrom = '', monthTo = '') {
    this.latitude = latitude;
    this.longitude = longitude;
    this.monthFrom = monthFrom;
    this.monthTo = monthTo;
    this.crimeIncidents = [];
  }

  get total() {
    return this.crimeIncidents.length;
  }

  async fetchCrimeData() {
    const baseUrl = 'https://data.police.uk/api/crimes-street/all-crime';

    let urlWithQueryString = `${baseUrl}?lat=${this.latitude}&lng=${this.longitude}`;
    // Add date to query string if specified in function call
    urlWithQueryString += this.monthFrom == '' ? '' : `&date=${this.monthFrom}`;

    try {
      const response = await fetch(urlWithQueryString);

      if (response.ok) {
        const crimeDataJson = await response.json();
        this.createCrimeDataFromJson(crimeDataJson);
        return this;
      } else {
        throw new Error(`Unable to fetch crime data:\n${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  createCrimeDataFromJson(crimeDataJson) {
    crimeDataJson.forEach((item) => {
      const { category, month } = item;
      const { latitude, longitude } = item.location;

      this.crimeIncidents.push({
        category: category,
        latitude: latitude,
        longitude: longitude,
        month: month,
      });
    });
  }

  summariseCrimeIncidents(field) {
    // Make a copy of all crime data array
    const allCrimes = this.crimeIncidents.slice();
    // Iterate through each item in the array and create a tally of each crime category
    const summary = allCrimes.reduce((tally, allCrimes) => {
      if (tally[allCrimes[field]]) {
        tally[allCrimes[field]] += 1;
      } else {
        tally[allCrimes[field]] = 1;
      }

      return tally;
    }, {});
    return summary;
  }
}
