export function bidStatusCheck(endsAt){
    const now = new Date();
    const endDate = new Date(endsAt);
    const statusText = endDate > now ? "Active" : "Bid Ended";
    return statusText;
}