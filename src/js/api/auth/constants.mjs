/**
 * API base URL for the Noroff API.
 * @constant {string}
 */
export const API_URL = "https://v2.api.noroff.dev"; // API URL
/**
 * The URL endpoint for user login.
 * @constant {string}
 */
export const LOGIN_URL = `${API_URL}/auth/login`; // Login URL
/**
 * The URL endpoint for user registration.
 * @constant {string}
 */
export const REGISTER_URL = `${API_URL}/auth/register`; // Register URL
/**
 * The URL endpoint for auction listings.
 * @constant {string}
 */
export const LISTINGS_URL = `${API_URL}/auction/listings`; // Post URL
/**
 * The URL endpoint for user profiles in auctions.
 * @constant {string}
 */
export const PROFILE_URL = `${API_URL}/auction/profiles`; // Profile URL
/**
 * API Key used for authentication with the Noroff API.
 * @constant {string}
 */
export const API_KEY = "9508e582-7cbe-42b9-9ffa-e9f0fc89d971";

/**
 * Returns the headers to be used for authenticated API requests.
 * Includes the `Content-Type`, `Authorization` token, and custom API Key for the requests.
 *
 * @function headers
 * @returns {Object} The headers object to be used in fetch requests.
 * @throws {Error} Throws an error if the token is not found in localStorage.
 */
export function headers(){
    const token = localStorage.getItem("token");
    return{
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
    };
}
