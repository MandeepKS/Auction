import { headers, LISTINGS_URL } from "../constants.mjs";

/**
 * Creates a new auction listing by sending the listing data to the API.
 *
 * This function formats the provided `listingData` and sends it to the server
 * using a POST request. If the listing creation is successful, it alerts the user.
 * If the request fails, it throws an error.
 *
 * @function createListing
 * @param {Object} listingData - The data for the new auction listing.
 * @param {string} listingData.title - The title of the auction listing.
 * @param {string} listingData.description - A description of the auction listing.
 * @param {number} listingData.endsAt - The number of hours from now when the auction ends.
 * @param {string} listingData.media - The URL of the media image for the listing.
 * @throws {Error} Throws an error if the API request fails or is unsuccessful.
 */
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
/**
 * Converts a number of hours from the current time to an ISO string.
 *
 * This helper function takes the number of hours to add to the current time
 * and converts the resulting time into an ISO string.
 *
 * @function convertHoursToISOString
 * @param {number} hours - The number of hours to add to the current time.
 * @returns {string} The ISO string representing the future time.
 */
function convertHoursToISOString(hours) {
    const now = new Date(); // Get the current date and time
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000); // Add the hours in milliseconds
    return futureTime.toISOString(); // Convert to ISO string
  }