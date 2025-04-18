/**
 * Checks whether the bid is still active or has ended based on the end time.
 *
 * @function
 * @param {string|Date} endsAt - The ending date/time of the bid in ISO string or Date format.
 * @returns {string} Returns "Active" if current time is before end time, else "Bid Ended".
 */
export function bidStatusCheck(endsAt){
    const now = new Date();
    const endDate = new Date(endsAt);
    const statusText = endDate > now ? "Active" : "Bid Ended";
    return statusText;
}

/**
 * Calculates the time remaining until the bidding ends and returns a human-readable string.
 *
 * @function
 * @param {string|Date} endsAt - The ending date/time of the bid in ISO string or Date format.
 * @returns {string} A message like "Bidding ends in X days Y hours" or "The bidding is over!".
 */
export function bidEndTimeCheck(endsAt){
    const now = new Date();
    const endDate = new Date(endsAt);
    const differenceInMilliseconds = endDate - now;
    if (differenceInMilliseconds <= 0) {
        return "The bidding is over!";
      }

      const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;

      if (days === 0 && hours === 0) {
        return "Bidding ends soon";
      }

      let result = "Bidding ends in ";
      if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
      if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""}`;

      return result.trim();
}