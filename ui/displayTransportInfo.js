const transportContainer = document.querySelector('#output__transport');

export const displayTransportInfo = (buses) => {
  transportContainer.innerHTML = '';

  // bus info section
  const busesDiv = document.createElement('div');
  busesDiv.className = 'buses__div';

  const busesDivHeader = document.createElement('h3');
  busesDivHeader.className = 'buses__div-header';
  busesDivHeader.textContent = 'Nearest bus stops';
  busesDiv.append(busesDivHeader);

  if (!buses || buses.length == 0) {
    const busNoData = document.createElement('p');
    busNoData.textContent = 'There is no bus data to display for this location';
    busesDiv.append(busNoData);
    transportContainer.append(busesDiv);
    return;
  }

  // container for all bus details
  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'details__div';

  // headers of the buses details (name, stop, distance...)
  const busNamesDiv = document.createElement('div');
  busNamesDiv.className = 'bus__names__div';

  const busNamesDivHeader = document.createElement('h4');
  busNamesDivHeader.textContent = 'Name';
  busNamesDiv.append(busNamesDivHeader);

  const busStopsDiv = document.createElement('div');
  busStopsDiv.className = 'bus__stops__div';

  const busStopsDivHeader = document.createElement('h4');
  busStopsDivHeader.textContent = 'Stop';
  busStopsDiv.append(busStopsDivHeader);

  const busDistancesDiv = document.createElement('div');
  busDistancesDiv.className = 'bus__distances__div';

  const busDistancesDivHeader = document.createElement('h4');
  busDistancesDivHeader.textContent = 'Distance';
  busDistancesDiv.append(busDistancesDivHeader);

  const busNumbersDiv = document.createElement('div');
  busNumbersDiv.className = 'bus__numbers__div';

  const busNumbersDivHeader = document.createElement('h4');
  busNumbersDivHeader.textContent = 'Buses';
  busNumbersDiv.append(busNumbersDivHeader);

  for (let busStop of buses) {
    const busStopName = document.createElement('p');
    busStopName.textContent = `${busStop.commonName}`;

    const busStopSpan = document.createElement('span');
    busStopSpan.className = 'bus__stop__icon';
    busStopSpan.innerHTML = '<i class="uil uil-map-marker-info"></i>';
    busStopName.insertAdjacentElement('afterbegin', busStopSpan);

    const busStopIndicator = document.createElement('p');
    // busStopIndicator.textContent = `Stop: `;

    const busStopIndicatorSpan = document.createElement('span');
    // busStopIndicatorSpan.innerHTML = `${
    //   busStop.indicator === 'Stop' ? '' : busStop.indicator
    // }`;
    busStopIndicatorSpan.innerHTML = busStop.indicator;
    busStopIndicator.insertAdjacentElement('beforeend', busStopIndicatorSpan);

    const busStopDistance = document.createElement('p');
    busStopDistance.textContent = `Distance: `;

    const busStopDistanceSpan = document.createElement('span');
    busStopDistanceSpan.innerHTML = `${Math.round(busStop.distance)}m`;
    busStopDistance.insertAdjacentElement('beforeend', busStopDistanceSpan);

    const busNumbers = document.createElement('p');
    busNumbers.textContent = 'Buses: ';

    for (let bus of busStop.lines) {
      const busNumbersSpan = document.createElement('span');
      busNumbersSpan.className = 'bus__numbers__span';
      busNumbersSpan.innerHTML = `${bus.name}`;
      busNumbers.insertAdjacentElement('beforeend', busNumbersSpan);
    }

    busNamesDiv.append(busStopName);
    busStopsDiv.append(busStopIndicator);
    busDistancesDiv.append(busStopDistance);
    busNumbersDiv.append(busNumbers);
  }

  detailsDiv.append(busNamesDiv);
  detailsDiv.append(busStopsDiv);
  detailsDiv.append(busDistancesDiv);
  detailsDiv.append(busNumbersDiv);

  busesDiv.append(detailsDiv);
  transportContainer.append(busesDiv);
};
