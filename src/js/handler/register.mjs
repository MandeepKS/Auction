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
        const name = profile.name?.trim();
        const email = profile.email?.trim();
        const password = profile.password?.trim();

        // Validation checks
        if (!name || !email || !password) {
            alert("All fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        registerUser(profile);
    });
}