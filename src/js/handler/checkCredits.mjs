import { headers, PROFILE_URL } from "../api/auth/constants.mjs";

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
            console.log(credits);
            return credits;
            } else{
                console.error(userData.errors[0].message);
            }
    } catch (error) {
        console.log(error);
    }
}