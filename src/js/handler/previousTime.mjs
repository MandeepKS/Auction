/**
 * Returns a human-readable string representing how many days ago
 * a given date was, such as "today", "yesterday", or "X days ago".
 *
 * @function
 * @param {string} dateString - A string representation of the past date (e.g., ISO format).
 * @returns {string} - A formatted string indicating the time difference.
 */
export function previousTime(dateString){
    const pastDate = new Date(dateString);
    const now = new Date();
    const differenceInMilliseconds = now - pastDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (differenceInDays === 0) {
    return "today";
  } else if (differenceInDays === 1) {
    return "yesterday";
  } else {
    return `${differenceInDays} days ago`;
  }
}
