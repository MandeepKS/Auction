export const API_URL = "https://v2.api.noroff.dev"; // API URL
export const LOGIN_URL = `${API_URL}/auth/login`; // Login URL
export const REGISTER_URL = `${API_URL}/auth/register`; // Register URL
export const LISTINGS_URL = `${API_URL}/auction/listings`; // Post URL
export const PROFILE_URL = `${API_URL}/auction/profiles`; // Profile URL
export const API_KEY = "9508e582-7cbe-42b9-9ffa-e9f0fc89d971";

export function headers(){
    const token = localStorage.getItem("token");
    return{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };
}
