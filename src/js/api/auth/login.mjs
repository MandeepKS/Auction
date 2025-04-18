import { LOGIN_URL } from "./constants.mjs";
import { headers } from "./constants.mjs";

/**
 * Logs in a user by sending their credentials to the server and handling the response.
 *
 * This function sends a POST request to the login API with the user's profile data (credentials),
 * and upon a successful login, stores the user's token and profile data in local storage.
 * The user is then redirected to the index page after a brief loading spinner is shown.
 * If login fails, an error message is displayed and the page is reloaded.
 *
 * @async
 * @function loginUser
 * @param {Object} profile - The login credentials of the user.
 * @param {string} profile.email - The email address of the user.
 * @param {string} profile.password - The password of the user.
 * @throws {Error} Throws an error if the login request fails or the response is invalid.
 */
export async function loginUser(profile) {
    let spinner = document.getElementById('loginFormLoader');
    try {
        const response = await fetch(LOGIN_URL,{
            method: "POST",
            body: JSON.stringify(profile),
            headers:headers(),
        });
        if(!response.ok){
            const urlResponse = await response.json();
            alert('Failed to login :'  + urlResponse.errors[0].message);
            window.location.reload();
        }
        const userData = await response.json();
        if(response.ok){
            spinner.classList.remove('visually-hidden');
            localStorage.setItem("token",userData.data.accessToken);
            const user = {
                name:userData.data.name,
                email:userData.data.email,
                avatar:userData.data.avatar,
                banner:userData.data.banner,
            };
            localStorage.setItem("profile",JSON.stringify(user));
            localStorage.setItem("isLogin",true);
            setTimeout(()=>{
                spinner.classList.add('visually-hidden');
                window.location.href = "/index.html";
            },1000);

        }else{
            throw new Error("Failed to login user: " + response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
}