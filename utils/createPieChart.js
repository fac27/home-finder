export const createPieChart = (crimes) => {
  // Prepare data for crime pie chart by aggregating low percentage categories into 'all-other-crime' category
  const crimesForPieChart = filterDataForPieChart(crimes);

  const categoriesAsString = `'${Object.keys(crimesForPieChart).join("','")}'`;
  const totalsAsString = Object.values(crimesForPieChart).join(',');
  const pieChartUrl = `https://quickchart.io/chart?c={type:'pie',data:{labels:[${categoriesAsString}],datasets:[{data:[${totalsAsString}]}]}}`;

  return pieChartUrl;
}

export const getPieChartDescription = (crimes) => {
  const pieChartFilteredData = filterDataForPieChart(crimes);

  let pieChartDescription = "Description of pie chart data:\n";

  for (let category in pieChartFilteredData) {
    pieChartDescription += `There were ${pieChartFilteredData[category]} ${category} incidents.\n`;
  }
  return pieChartDescription;
}

function filterDataForPieChart(crimes) {
  const crimeSummaryByCategory = crimes.summariseCrimeIncidents('category');

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
  return crimesForPieChart;
}