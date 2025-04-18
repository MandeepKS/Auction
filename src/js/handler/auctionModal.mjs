import { createListing } from "../api/auth/auctionsListings/createAuctionListing.mjs";

/**
 * Handles the creation of a new auction listing.
 *
 * Listens for the submit event on the auction creation form. When the form is submitted,
 * it prevents the default form submission, gathers the form data, creates an auction listing
 * object, and passes it to the `createListing` function to submit the auction listing.
 * Resets the form after submission.
 *
 * @function createAuctionRoute
 */
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