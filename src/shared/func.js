export const getCurrentDate = (separator = "-") => {
  return new Date().getFullYear() + separator + (new Date().getMonth() + 1) + separator + new Date().getDate();
};

export const getFormattedISODateTime = () => {
  return getCurrentDate() + "T" + (("0" + new Date().getHours()).slice(-2) + ":" + ("0" + new Date().getMinutes()).slice(-2));
};
