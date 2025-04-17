import { REGISTER_URL } from "./constants.mjs";
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
            alert('Failed to register user:'  + response.statusText);
        }else{
            alert("Successfully Register!!");
            window.location.href = "/login";
        }
    } catch (error) {
        console.error(error);

    }
}