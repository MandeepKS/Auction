export function bidStatusCheck(endsAt){
    const now = new Date();
    const endDate = new Date(endsAt);
    const statusText = endDate > now ? "Active" : "Bid Ended";
    return statusText;
}

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