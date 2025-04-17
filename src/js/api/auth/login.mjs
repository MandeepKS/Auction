import { LOGIN_URL } from "./constants.mjs";
import { headers } from "./constants.mjs";

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