import { REGISTER_URL } from "./constants.mjs";
/**
 * Registers a new user by sending their profile data to the server.
 *
 * This function sends a POST request to the registration API with the user's profile data
 * in JSON format. If the registration is successful, the user is alerted with a success message
 * and redirected to the login page. If the registration fails, an alert is shown with the error message.
 *
 * @async
 * @function registerUser
 * @param {Object} profile - The profile data of the user to be registered.
 * @param {string} profile.name - The name of the user.
 * @param {string} profile.email - The email address of the user.
 * @param {string} profile.password - The password of the user.
 * @throws {Error} Throws an error if the registration request fails.
 */
export async function registerUser(profile) {
    const API_KEY = "9508e582-7cbe-42b9-9ffa-e9f0fc89d971";
    try {
        const response = await fetch(REGISTER_URL,{
            method:"POST",
            body:JSON.stringify(profile),
            headers:{
                "X-Noroff-API-Key": API_KEY,
                "Content-Type":"application/json",
           },
        });
        if(!response.ok){
            const userData = await response.json();
            alert('Failed to register user:'  + userData.errors[0].message);
        }else{
            alert("Successfully Register!!");
            window.location.href = "/login";
        }
    } catch (error) {
        console.error(error);
    }
}