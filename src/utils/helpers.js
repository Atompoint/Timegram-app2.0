export const checkAppVersion = (a, b) => {
  const value = a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });

  if (value === 1) {
    return true;
  }
  return false;
};
