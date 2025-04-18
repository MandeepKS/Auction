import { registerUser } from "../api/auth/register.mjs";

/**
 * Attaches a submit event listener to the sign-up form.
 * On submission, it prevents the default behavior, extracts form data,
 * converts it to an object, and passes it to the registerUser API function.
 *
 * @function
 * @returns {void}
 */
export function signUpFormRoute(){
    const signUpForm = document.getElementById('signUp');
    signUpForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
        registerUser(profile);
    });
}