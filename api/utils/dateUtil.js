export const compareDates = (date1, date2) => {
  // Convert the date strings to Date objects
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Compare the dates
  let diff = 0;
  if (d1 < d2) {
    // earlier
    diff = -1;
  } else if (date1 > date2) {
    // later
    diff = 1;
  } else {
    // same
    diff = 0;
  }
  // console.log(`KMJ -- compareDates ${d1}, ${d2} is ${diff}`);
  return diff;
};
