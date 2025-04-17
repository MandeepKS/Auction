import {headers, LISTINGS_URL} from "../constants.mjs";

// export async function fetchBid(type, currentPage, limit) {
//     let ADD_ON_URL = `?sort=created&order=desc&limit=${limit}&page=${currentPage}`;
// }
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