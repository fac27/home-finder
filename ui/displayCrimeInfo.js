const crimeInfoOutput = document.querySelector('#output__crime');

export const displayCrimeInfo = (crimes, postcode) => {
  // clear the output element first
  crimeInfoOutput.innerHTML = '';

  if (!crimes.total) {
    crimeInfoOutput.textContent = `No recent crime data available for '${postcode}'.`;
    return;
  }

  // Get bounding dates of crime search period (can be unspecified in CrimeData constructor)
  const monthFrom =
    crimes.monthFrom == '' ? crimes.crimeIncidents[0].month : crimes.monthFrom;
  const monthTo =
    crimes.monthTo == '' ? crimes.crimeIncidents[0].month : crimes.monthTo;

  const crimeSummary = document.createElement('p');
  crimeSummary.textContent = `There were ${crimes.total} crimes in '${postcode}' in the period ${monthFrom} to ${monthTo}.`;

  const crimeSummaryByCategory = crimes.summariseCrimeIncidents('month');
  const ul = document.createElement('ul');

  console.log(crimeSummaryByCategory);

  for (let category in crimeSummaryByCategory) {
    const li = document.createElement('li');
    li.textContent = `${category}: ${
      crimeSummaryByCategory[category]
    } (${Math.floor(
      (crimeSummaryByCategory[category] / crimes.total) * 100
    )}%)`;
    ul.appendChild(li);
  }

  crimeInfoOutput.append(crimeSummary);
  crimeInfoOutput.append(ul);

  // Prepare data for crime pie chart by aggregating low percentage categories into 'all-other-crime' category
  const crimesForPieChart = {};
  const THRESHOLD = 0.05; // Set threshold for inclusion in pie chart as an individual category (e.g. 0.1 = 10%)
  let otherCrime = 0; // Aggregate total of crimes less than threshold

  for (let crime in crimeSummaryByCategory) {
    if (crimeSummaryByCategory[crime] / crimes.total < THRESHOLD) {
      otherCrime += crimeSummaryByCategory[crime];
    } else {
      crimesForPieChart[crime] = crimeSummaryByCategory[crime];
    }
  }
  // Add 'all-other-crime' category of any crime categories < threshold
  if (otherCrime > 0) {
    crimesForPieChart['all-other-crime'] = otherCrime;
  }

  const categoriesAsString = `'${Object.keys(crimesForPieChart).join("','")}'`;
  const totalsAsString = Object.values(crimesForPieChart).join(',');
  const pieChartUrl = `https://quickchart.io/chart?c={type:'pie',data:{labels:[${categoriesAsString}],datasets:[{data:[${totalsAsString}]}]}}`;

  const pieChart = document.createElement('img');
  pieChart.src = pieChartUrl;
  crimeInfoOutput.append(pieChart);
};
