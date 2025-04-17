import { loginFormRoute } from "../handler/login.mjs";
import { signUpFormRoute } from "../handler/register.mjs";
import { checkActiveUser } from "../handler/checkUser.mjs";
import { renderListings, renderSingleList } from "../render/templates/listing.mjs";
import { adminProfile } from "../handler/admin/profile.mjs";
import { createAuctionRoute } from "../handler/auctionModal.mjs";
import { adminListings } from "../handler/admin/listings.mjs";

export async function router() {
    const urlPath = location.pathname;
    if(urlPath === "/" ||  urlPath === "/index.html"){
        renderListings();
        checkActiveUser();
        createAuctionRoute();
    }
    if(urlPath === "/login/" || urlPath === "/login/index.html"){
        loginFormRoute();
    }
    if(urlPath === "/register/" || urlPath === "/register/index.html"){
        signUpFormRoute();
    }
    if(urlPath === "/admin/profile/" || urlPath === "/admin/profile/index.html"){
        adminProfile();
    }
    if(urlPath === "/admin/listings/" || urlPath === "/admin/listings/index.html"){
        adminListings();
    }
    if(urlPath === "/admin/wins/" || urlPath === "/admin/wins/index.html"){
        adminProfile();
    }
    if(urlPath === "/list/" || urlPath === "/list/index.html"){
        renderSingleList();
    }
}