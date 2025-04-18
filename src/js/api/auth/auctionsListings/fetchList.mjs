import {headers, LISTINGS_URL} from "../constants.mjs";

/**
 * Fetches all auction listings from the API.
 *
 * This function sends a GET request to the listings URL and returns the
 * result as a JSON object if the request is successful. If the request fails,
 * it throws an error with the appropriate message.
 *
 * @function fetchListings
 * @returns {Promise<Object>} The response containing the listings data.
 * @throws {Error} Throws an error if the request fails or is not successful.
 */
export async function fetchListings() {
    try {
        const response = await fetch(LISTINGS_URL,{
            method:"GET",
            headers: headers(),
        });
        if(!response.ok){
            throw new Error("Failed to fetch listings: "+ response.statusText);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        console.log("Error fetching listings:",error);

    }

}


/**
 * Fetches a single auction listing by its ID from the API.
 *
 * This function sends a GET request to the listing URL with query parameters
 * to fetch the associated bids and seller data, returning the result as a
 * JSON object. If the request fails, it throws an error with the appropriate message.
 *
 * @function fetchSingleList
 * @param {string} id - The ID of the listing to be fetched.
 * @returns {Promise<Object>} The response containing the single listing data.
 * @throws {Error} Throws an error if the request fails or is not successful.
 */
export async function fetchSingleList(id){
    const url = LISTINGS_URL + "/" + id +"?_bids=true&_seller=true";
    try {
        const response = await fetch(url,{
              method: "GET",
              headers: headers(),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch list: " + response.statusText);
        }
        const listData = await response.json();
        return listData;
    } catch (error) {
        console.log("Error fetching list:",error);
    }
}