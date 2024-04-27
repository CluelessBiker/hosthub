const formatTime = (time: string, format: string) => {
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  const hoursNum = parseInt(hours);

  if (format === '24') return time;

  if (hoursNum === 12) {
    return `${hours}:${minutes} PM`;
  } else if (hoursNum > 12) {
    const newHours = hoursNum - 12;

    if (newHours < 9) {
      return `0${newHours.toString()}:${minutes} PM`;
    } else {
      return `${newHours.toString()}:${minutes} PM`;
    }
  } else {
    return `${hours}:${minutes} AM`;
  }
};

export default formatTime;
