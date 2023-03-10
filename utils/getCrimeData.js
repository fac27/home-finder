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
    let fetchError = false;

    let baseUrlWithQueryString = `${baseUrl}?lat=${this.latitude}&lng=${this.longitude}`;
    let url = '';
    const allQueryStrings = [];

    // Check if only one month is requested (or if both are not specified)
    if (this.monthFrom === this.monthTo || this.monthTo === '') {
      // Add date to query string if specified in function call
      url =
        baseUrlWithQueryString + this.monthFrom == ''
          ? ''
          : `&date=${this.monthFrom}`;
      allQueryStrings.push(url);
    }
    // Otherwise multiple months are requested
    else {
      // Split this.monthTo (e.g. 2022-12) into month and year pair and insert into object
      let monthToObj = {
        month: +this.monthTo.slice(-2),
        year: +this.monthTo.slice(0, 4),
      };
      // Do same for monthFrom. This will be used to store the current month when constructing url query string
      let currentMonthObj = {
        month: +this.monthFrom.slice(-2),
        year: +this.monthFrom.slice(0, 4),
      };

      // Loop backwards from monthFrom to monthTo and generate url for each month/year pair
      while (
        monthToObj['month'] != currentMonthObj['month'] ||
        monthToObj['year'] != currentMonthObj['year']
      ) {
        let { month } = currentMonthObj;
        let { year } = currentMonthObj;
        let monthPadding = month < 10 ? '0' : '';

        url = baseUrlWithQueryString + `&date=${year}-${monthPadding + month}`;

        allQueryStrings.push(url);

        currentMonthObj = CrimeData.getMonthsBefore(month, year);
      }
    }

    // Track how many fetches we have done and how many will there be
    let fetchNumber = 0;
    let totalFetches = allQueryStrings.length;

    // Set up references for progress bar and info message to user during fetch
    const userInfoContainer = document.querySelector('#app__info-container');
    const userInfo = document.querySelector('#app__info');
    const p = document.createElement('p');
    p.textContent = 'Fetching crime data (0%)';
    const progressBar = document.createElement('progress');
    progressBar.max = 100;
    progressBar.value = 0;
    progressBar.textContent = '0%';
    userInfoContainer.style.display = 'block';

    // Clear contents of user info box
    userInfo.innerHTML = '';

    userInfo.append(p);
    userInfo.append(progressBar);
    let crimeDataJson = [];

    await Promise.all(
      allQueryStrings.map((qs) =>
        fetch(qs)
          .then((response) => {
            if (response.ok) {
              progressBar.value = Math.floor(
                (++fetchNumber / totalFetches) * 100
              );
              progressBar.textContent = `${progressBar.value}%`;
              p.textContent = `Fetching crime data (${progressBar.value}%)`;
              return response.json();
            }
          }).catch((error) => {
            console.error("OH NO! This happened when fetching crime data:\n" + error);
            userInfoContainer.style.display = 'none';
          })
      )
    )
      .then((json) => {
        userInfoContainer.style.display = 'none';
        crimeDataJson.push(json);
        crimeDataJson = crimeDataJson.flat(2);
        this.#createCrimeDataFromJson(crimeDataJson);
      });
    return this;
  }

  // Private helper function to get the month before the supplied month and year and return as JS object
  static getMonthsBefore(month, year, monthsToSubtract = 1) {
    const yearsToSubtract = Math.floor(monthsToSubtract / 12);
    monthsToSubtract -= yearsToSubtract * 12;

    let monthSubtracted = month - monthsToSubtract;
    let yearSubtracted = year - yearsToSubtract;

    if (monthSubtracted <= 0) {
      yearSubtracted -= 1;
      monthSubtracted += 12;
    }

    return { month: monthSubtracted, year: yearSubtracted };
  }

  #createCrimeDataFromJson(crimeDataJson) {

    crimeDataJson.forEach((item) => {
      if (item) {
        const { category, month } = item;
        const { latitude, longitude } = item.location;

        this.crimeIncidents.push({
          category: category,
          latitude: latitude,
          longitude: longitude,
          month: month,
        });
      }
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
