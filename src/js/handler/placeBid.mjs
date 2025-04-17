import { headers, LISTINGS_URL } from "../api/auth/constants.mjs";

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
        console.log(error);
    }
}