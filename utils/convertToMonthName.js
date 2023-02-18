export const convertToMonthName = (monthNumber) => {
  const monthNames = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const year = monthNumber.split('-')[0].slice(-2);
  const month = monthNumber.split('-')[1];

  // check if month has leading zero or not. if it has, remove it, then get the
  // corresponding month from the object
  return month.startsWith('0')
    ? `${monthNames[month.slice(1)]} ${year}`
    : `${monthNames[month]} ${year}`;
};
