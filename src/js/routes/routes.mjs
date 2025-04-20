import { loginFormRoute } from "../handler/login.mjs";
import { signUpFormRoute } from "../handler/register.mjs";
import { checkActiveUser } from "../handler/checkUser.mjs";
import { renderListings, renderSingleList } from "../render/templates/listing.mjs";
import { adminProfile } from "../handler/admin/profile.mjs";
import { createAuctionRoute } from "../handler/auctionModal.mjs";
import { adminListings } from "../handler/admin/listings.mjs";

/**
 * Router function to handle page routing based on the current URL path.
 *
 * This function checks the current page URL (`location.pathname`) and invokes the appropriate
 * handler functions for rendering templates, forms, or admin actions based on the page.
 * It supports the main pages like the home page, login page, registration page, admin pages,
 * and listing pages. Each page has its corresponding handler that is triggered.
 *
 * @function router
 * @returns {void}
 */
export async function router() {
    const urlPath = location.pathname;

    // Home page or Index page
    if(urlPath === "/" ||  urlPath === "/index.html"){
        renderListings();
        checkActiveUser();
        createAuctionRoute();
    }
    // Login page
    if(urlPath === "/login/" || urlPath === "/login/index.html"){
        loginFormRoute();
    }
    // Registration page
    if(urlPath === "/register/" || urlPath === "/register/index.html"){
        signUpFormRoute();
    }
    // Admin Profile page
    if(urlPath === "/admin/profile/" || urlPath === "/admin/profile/index.html"){
        adminProfile();
    }
    // Admin Listings page
    if(urlPath === "/admin/listings/" || urlPath === "/admin/listings/index.html"){
        adminListings();
    }
    // Single Listing page
    if(urlPath === "/list/" || urlPath === "/list/index.html"){
        renderSingleList();
    }
}