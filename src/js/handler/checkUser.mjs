import { checkCredits } from "./checkCredits.mjs";
/**
 * Checks if a user is logged in, updates UI elements accordingly,
 * and displays user credits if logged in.
 *
 * @async
 * @function checkActiveUser
 * @returns {Promise<void>} A promise that resolves once the DOM is updated based on login status.
 */
export async function checkActiveUser(){
    const isLogin = localStorage.getItem('isLogin');
    const jsonString = localStorage.getItem('profile');
    const activeProfile = document.getElementById('activeProfile');
    const userObject = JSON.parse(jsonString);
    const dropDown = document.getElementById('userDropDown');
    const auctionModalBtn = document.getElementById('newAuctionModalBtn');
    const loginBtn = document.getElementById('loginBtnHome');
    const creditChecks = document.getElementById('credits');
    if(isLogin){
        activeProfile.textContent = "Welcome, " +userObject.name;
        creditChecks.textContent = "Credits : " +  await checkCredits(userObject.name);
        loginBtn.style.display = "none";
    }
    else{
        dropDown.style.display = "none";
        auctionModalBtn.style.display = "none";
        loginBtn.style.display = "inline-block";
    }
}

/**
 * Event listener for logging out the user.
 * Clears localStorage and redirects to the homepage.
 */
const logOut = document.getElementById('logOut');
if(logOut){
    logOut.addEventListener("click", function(){
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        localStorage.removeItem("isLogin");
        window.location.href="/";
    });
}
