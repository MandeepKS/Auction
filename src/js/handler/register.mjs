import { registerUser } from "../api/auth/register.mjs";

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