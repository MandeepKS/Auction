import { headers, PROFILE_URL } from "../../api/auth/constants.mjs";



export async function adminProfile(){
    const isLogin = localStorage.getItem('isLogin');
    const jsonString = localStorage.getItem('profile');
    const userObject = JSON.parse(jsonString);
    const userName =   userObject.name;
    const avatarURL = PROFILE_URL + "/" + userName;
    // console.log(userObject);

    const adminProfile = document.getElementById("adminProfile");
    const container = document.createElement('div');
    if(isLogin){
        adminProfile.textContent = "Welcome, " + userName;
        try {
            const response = await fetch(avatarURL, {
                method: 'GET',
                headers:headers(),
            });

            if(response.ok){
                const userData = await response.json();
                console.log('response get profile api:', userData);
                let userName = userData.data.name;
                let email = userData.data.email;
                let userListings = userData.data._count.listings;
                let userWins = userData.data._count.wins;
                let avatarImage = userData.data.avatar.url;
                let avatarAlt = userData.data.avatar.alt;
                let userTotalCredits = userData.data.credits;
                console.log(userTotalCredits);
                container.className = 'container py-5';

                const section = document.createElement('div');
                section.className = 'section_admin_profile';

                const row = document.createElement('div');
                row.className = 'row justify-content-center';

                const col = document.createElement('div');
                col.className = 'col-12 col-lg-6';

                const card = document.createElement('div');
                card.className = 'card shadow-lg p-4 text-center';

                // Profile Image
                const profileImageContainer = document.createElement('div');
                profileImageContainer.className = 'circle mx-auto mb-3';
                profileImageContainer.id = 'profileImageContainer';

                const profileImage = document.createElement('img');
                profileImage.id = 'profileImage';
                profileImage.src = avatarImage;
                profileImage.alt = avatarAlt;
                profileImage.style.width = '120px';
                profileImage.style.height = '120px';
                profileImage.style.objectFit = 'cover';
                profileImage.className = 'rounded-circle border border-secondary';

                profileImageContainer.appendChild(profileImage);

                // Profile Info
                const profileName = document.createElement('h2');
                profileName.className = 'fw-bold dark-red';
                profileName.id = 'profileName';
                profileName.textContent = userName;

                const profileEmail = document.createElement('p');
                profileEmail.className = 'text-muted';
                profileEmail.id = 'profileEmail';
                profileEmail.textContent = email;


                // Listings & Wins Count
                const listingsContainer = document.createElement('div');
                listingsContainer.className = 'mt-4';

                const listings = document.createElement('p');
                listings.className = 'mb-1 fw-semibold';
                listings.innerHTML = `Listings: <span class="dark-red" id="listingCount">${userListings}</span>`;

                const wins = document.createElement('p');
                wins.className = 'fw-semibold';
                wins.innerHTML = `Wins: <span class="dark-red" id="winCount">${userWins}</span>`;

                // Append elements
                listingsContainer.appendChild(listings);
                listingsContainer.appendChild(wins);

                // Assemble elements
                card.appendChild(profileImageContainer);
                card.appendChild(profileName);
                card.appendChild(profileEmail);
                card.appendChild(listingsContainer);

                col.appendChild(card);
                row.appendChild(col);
                section.appendChild(row);
                container.appendChild(section);
            }

        } catch (error) {
            console.log('Error :' , error);
        }
        document.getElementById('adminProfileBody').appendChild(container);
        document.getElementById('profileImageContainer').addEventListener('click', changeAvatarImage);
    }
    else{
       return window.location.href="/admin/unauth/";
    }
}


async function changeAvatarImage(){
    const newImage = prompt("Enter new image URL:");
    const jsonString = localStorage.getItem('profile');
    const userObject = JSON.parse(jsonString);
    const userName =   userObject.name;
    const avatarURL = PROFILE_URL + "/" + userName;

   if(newImage){
        const formattedImage = {
            avatar:{
                url: newImage,
                alt: "avatar created by " + userName,
            },
        };

        try {
            const response = await fetch(avatarURL,{
                method:'PUT',
                body: JSON.stringify(formattedImage),
                headers:headers(),
            });
            if(response.ok){
                alert("Image updated successfully");
                document.getElementById('adminProfileBody').innerHTML = "";
                adminProfile();
            } else{
                alert("Image update fail");
            }
        } catch (error) {
            console.log(error);

        }
    }
}