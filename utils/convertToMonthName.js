export const convertToMonthName = (monthNumber, longName = false) => {
  let monthNames =
    {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };

  const year = monthNumber.split('-')[0].slice(-2);
  const month = monthNumber.split('-')[1];

  // check if month has leading zero or not. if it has, remove it, then get the
  // corresponding month from the object
  let monthName = month.startsWith('0')
    ? `${monthNames[month.slice(1)]} ${year}`
    : `${monthNames[month]} ${year}`;

  return longName ? monthName : monthName.slice(0,3);
}