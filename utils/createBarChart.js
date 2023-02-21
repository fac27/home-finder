import { convertToMonthName } from './convertToMonthName.js';

export const createBarChart = (crimes) => {
  const crimeSummaryByMonth = crimes.summariseCrimeIncidents('month');
  const crimeSummaryByMonthName = [];

  // change month dates to month names.
  for (let month of Object.keys(crimeSummaryByMonth)) {
    crimeSummaryByMonthName.push(convertToMonthName(month));
  }

  const labels = `'${crimeSummaryByMonthName.reverse().join("','")}'`;
  const data = Object.values(crimeSummaryByMonth).reverse().join(',');
  const barChartUrl = `https://quickchart.io/chart?c={type:'bar',data:{labels:[${labels}],datasets:[{label:'Crimes',data:[${data}]}]},options:{title:{display:false}} }`;

  return barChartUrl;
}

export const getBarChartDescription = (crimes) => {

  const crimeSummaryByMonth = crimes.summariseCrimeIncidents('month');
  const crimeSummaryByMonthName = {};

  // change month dates to month names.
  for (let month in crimeSummaryByMonth) {
    crimeSummaryByMonthName[convertToMonthName(month, true)] = crimeSummaryByMonth[month];
  }

  // Reverse month keys to put data in order earliest to latest
  const reversedCrimeSummaryKeys = Object.keys(crimeSummaryByMonthName).reverse();

  let barChartDescription = "Description of bar chart data:\n";
  
  reversedCrimeSummaryKeys.forEach((key) => {
    barChartDescription += `In ${key} there were ${crimeSummaryByMonthName[key]} incidents.\n`;
  });

  return barChartDescription;
}