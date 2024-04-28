const formatDate = (dateTime: string, format: string, separator: string) => {
  const date = dateTime.split('T')[0];
  const newDate = date.split('-');
  const year = newDate[0];
  const month = newDate[1];
  const day = newDate[2];

  if (format === 'us') return month + separator + day + separator + year;
  return day + separator + month + separator + year;
};

export default formatDate;
