import { headers, PROFILE_URL } from "../api/auth/constants.mjs";

/**
 * Fetches the credit balance for a given user profile.
 *
 * Makes a GET request to the API to retrieve the number of credits
 * associated with the provided user name. Logs and returns the credits if successful.
 *
 * @async
 * @function checkCredits
 * @param {string} name - The username of the profile whose credits should be checked.
 * @returns {Promise<number|undefined>} The number of credits if the request is successful, otherwise undefined.
 */
export async function checkCredits(name) {
    const urlCredits = PROFILE_URL + "/" + name + "/credits";
    try {
        const response = await fetch(urlCredits,{
            method:'GET',
            headers:headers()
        });
        const userData = await response.json();
         if(response.ok){
            const credits = userData.data.credits;
            return credits;
            } else{
                console.error(userData.errors[0].message);
            }
    } catch (error) {
        console.log(error);
    }
}