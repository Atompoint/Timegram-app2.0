export const getDate = () => {
  const today = new Date();
  const day = `0${today.getDate()}`.slice(-2);
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

export const timeToMidnight = () => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    0
  );
  const msToMidnight = midnight.getTime() - now.getTime();
  return msToMidnight;
};
