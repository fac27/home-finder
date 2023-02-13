const crimeInfoOutput = document.querySelector('#output__crime');

export const displayCrimeInfo = (crimes, postcode) => {
    // clear the output element first
    crimeInfoOutput.innerHTML = '';

    // Get bounding dates of crime search period (can be unspecified in CrimeData constructor)
    const monthFrom = crimes.monthFrom == "" ? crimes.crimeIncidents[0].month : crimes.monthFrom;
    const monthTo = crimes.monthTo == "" ? crimes.crimeIncidents[0].month : crimes.monthTo;

    const crimeSummary = document.createElement('p');
    crimeSummary.textContent = `There were ${crimes.total} crimes in '${postcode}' in the period ${monthFrom} to ${monthTo}.`;

    const crimeSummaryByCategory = crimes.summariseCrimeIncidents("category");
    const ul = document.createElement('ul');

    for (let category in crimeSummaryByCategory) {
        const li = document.createElement('li');
        li.textContent = `${category}: ${crimeSummaryByCategory[category]} (${Math.floor(crimeSummaryByCategory[category] / crimes.total * 100)}%)`;
        ul.appendChild(li);
    }

    crimeInfoOutput.append(crimeSummary);
    crimeInfoOutput.append(ul);
};