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
  const barChartUrl = `https://quickchart.io/chart?c={type:'bar',data:{labels:[${labels}],datasets:[{label:'Crimes',data:[${data}]}]},options:{title:{display:true,text:'Total crimes by month from 2021/12 to 2022/10'}} }`;

  return barChartUrl;
};
