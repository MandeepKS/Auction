import { createListing } from "../api/auth/auctionsListings/createAuctionListing.mjs";

export function createAuctionRoute() {
  const auctionModal = document.getElementById('createAuctionModalForm');
  if(auctionModal){
    auctionModal.addEventListener("submit",(event)=>{
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const auctionListing = Object.fromEntries(formData.entries());
      createListing(auctionListing);
      form.reset();
    });
  }
}