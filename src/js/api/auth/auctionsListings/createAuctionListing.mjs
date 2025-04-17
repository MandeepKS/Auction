import { headers, LISTINGS_URL } from "../constants.mjs";

export async function createListing(listingData) {
    const formattedData = {
        title: listingData.title,
        description:listingData.description,
        endsAt : convertHoursToISOString(listingData.endsAt),
        media:[{
            url: listingData.media,
            alt: listingData.title,
        }],
    };
    try {
        const response = await fetch(LISTINGS_URL,{
            method:'POST',
            body:JSON.stringify(formattedData),
            headers:headers(),
        });
        console.log(response);
        const userData = await response.json();
        console.log('Submitted auction data Test',userData);

        if(response.ok){
            alert("Listing has been created successfully!");
        } else{
            throw new Error("Failed to fetch list: " + response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}
function convertHoursToISOString(hours) {
    const now = new Date(); // Get the current date and time
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000); // Add the hours in milliseconds
    return futureTime.toISOString(); // Convert to ISO string
  }