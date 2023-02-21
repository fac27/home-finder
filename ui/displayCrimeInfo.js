import { createPieChart, getPieChartDescription } from '../utils/createPieChart.js';
import { createBarChart } from '../utils/createBarChart.js';
import { convertToMonthName } from '../utils/convertToMonthName.js';

const crimeInfoOutput = document.querySelector('#output__crime');
const crimeChartOverlay = document.querySelector('#crime__chart--large');
crimeChartOverlay.addEventListener('mouseup', () => {crimeChartOverlay.style.display='none';}, false);

export const displayCrimeInfo = (crimes, postcode) => {
  // clear the output element first
  crimeInfoOutput.innerHTML = '';

  const crimeInfoDiv = document.createElement('div');
  crimeInfoDiv.className = 'crime__info-div';

  const crimeInfoHeader = document.createElement('h3');
  crimeInfoHeader.className = 'crime__info-header';
  crimeInfoHeader.textContent = 'Crime statistics';

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

  const crimeSummaryByCategory = crimes.summariseCrimeIncidents('category');
  const ul = document.createElement('ul');

  for (let category in crimeSummaryByCategory) {
    const li = document.createElement('li');
    li.textContent = `${category}: ${crimeSummaryByCategory[category]
      } (${Math.floor(
        (crimeSummaryByCategory[category] / crimes.total) * 100
      )}%)`;
    ul.appendChild(li);
  }

  // Set up month name array for chart titles

  const dateRangeString =
    'from ' + convertToMonthName(crimes.monthTo) +
    ' to ' + convertToMonthName(crimes.monthFrom);

  const barChartTitle = `Total crimes by month for ${postcode.toUpperCase()} ${dateRangeString}`;
  const pieChartTitle = `Crime incident types for ${postcode.toUpperCase()} ${dateRangeString}`;

  const pieChartHeading = document.createElement('H3');
  pieChartHeading.textContent = pieChartTitle;
  const barChartHeading = document.createElement('H3');
  barChartHeading.textContent = barChartTitle;
  const pieChartDescription = document.createElement('p');
  pieChartDescription.id = 'pie-desc';
  pieChartDescription.className = 'screen-reader-only';
  pieChartDescription.innerText = getPieChartDescription(crimes);

  const barChartDescription = document.createElement('p');
  barChartDescription.id = 'bar-desc';
  barChartDescription.className = 'screen-reader-only';

  pieChartHeading.classList.add('text-center');
  pieChartHeading.classList.add('text-pad-above');
  barChartHeading.classList.add('text-center');
  barChartHeading.classList.add('text-pad-above');

  const pieChartUrl = createPieChart(crimes);
  const barChartUrl = createBarChart(crimes);

  const pieChart = document.createElement('img');
  pieChart.src = pieChartUrl;
  pieChart.alt = `Pie chart showing ${pieChartTitle}`;
  pieChart.setAttribute('aria-details', 'pie-desc');
  
  const barChart = document.createElement('img');
  barChart.src = barChartUrl;
  barChart.alt = `Bar chart showing ${barChartTitle}`;
  barChart.setAttribute('aria-details', 'bar-desc');

  pieChart.style.cursor = barChart.style.cursor = 'zoom-in';
  pieChart.addEventListener('mouseup', () => {toggleChartToFullScreen(pieChart);}, false);
  barChart.addEventListener('mouseup', () => {toggleChartToFullScreen(barChart);}, false);


  crimeInfoDiv.append(crimeInfoHeader);
  crimeInfoDiv.append(crimeSummary);
  crimeInfoDiv.append(ul);

  crimeInfoOutput.append(crimeInfoDiv);
  crimeInfoOutput.append(barChartHeading);
  crimeInfoOutput.append(barChart);
  crimeInfoOutput.append(barChartDescription);
  crimeInfoOutput.append(pieChartHeading);
  crimeInfoOutput.append(pieChart);
  crimeInfoOutput.append(pieChartDescription);
}

function toggleChartToFullScreen(image) {
  crimeChartOverlay.style.backgroundImage = 'url(' + image.src + ')';
  crimeChartOverlay.style.display = 'block';
}