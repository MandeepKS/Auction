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