import { headers, LISTINGS_URL } from "../api/auth/constants.mjs";

/**
 * Submits a bid for a specific listing using its ID and the given bid amount.
 *
 * @async
 * @function
 * @param {number|string} bidAmount - The amount to bid (will be parsed as an integer).
 * @param {string} listID - The ID of the listing to place the bid on.
 * @returns {Promise<void>} - Alerts the user with the result of the bid submission.
 */
export async function bidSubmit(bidAmount, listID){
    const urlBid = LISTINGS_URL + "/" + listID + "/bids";
    const formattedData = { amount : parseInt(bidAmount)};
    try{
        const response = await fetch(urlBid,{
            method:'POST',
            body:JSON.stringify(formattedData),
            headers:headers(),
        });
        if(!response.ok){
            const userData = await response.json();
            alert('Failed to place a bid'+ userData.errors[0].message);
        }else{
            alert('Your bid placed successfully');
        }
    }catch(error){
        console.error(error);
    }
}