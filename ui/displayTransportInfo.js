const transportContainer = document.querySelector('#output__transport');

export const displayTransportInfo = (buses) => {
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

  for (let busStop of buses) {
    const busStopName = document.createElement('p');
    busStopName.textContent = `${busStop.commonName}  Stop: ${
      busStop.indicator
    }   Distance: ${Math.round(busStop.distance)}m`;

    const busesNames = document.createElement('p');
    busesNames.textContent = 'Buses:';

    for (let bus of busStop.lines) {
      busesNames.append(` ${bus.name}`);
    }

    busesDiv.append(busStopName);
    busesDiv.append(busesNames);
  }

  transportContainer.innerHTML = '';
  transportContainer.append(busesDiv);
};
