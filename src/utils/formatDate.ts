const formatDate = (dateTime: string, format: string, separator: string) => {
  const date = dateTime.split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2];

  if (format === 'us') return month + separator + day + separator + year;
  return day + separator + month + separator + year;
};

export default formatDate;
