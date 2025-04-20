import { loginUser } from "../api/auth/login.mjs";
/**
 * Attaches a submit event listener to the login form.
 * On form submission, prevents default behavior, collects form data,
 * and passes it to the `loginUser` function.
 *
 * @function
 * @returns {void}
 */
export function loginFormRoute() {
    const logInForm = document.getElementById("loginForm");
    if (!logInForm) {
        console.error("Login form not found!");
        return;
    }
    // SignIn form submit
    logInForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());
         // Basic validation
         const email = profile.email?.trim();
         const password = profile.password?.trim();

         if (!email || !password) {
             alert("Both email and password are required.");
             return;
         }

         // Email format check
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             alert("Please enter a valid email address.");
             return;
         }
        loginUser(profile);
    });
}