import { headers,PROFILE_URL } from "../../api/auth/constants.mjs";
import { previousTime } from "../../handler/previousTime.mjs";
import {bidStatusCheck} from "../../handler/bidStatus.mjs";
/**
 * Fetches and displays listings for an admin user.
 *
 * This function checks if the user is logged in by looking for a login status in the
 * localStorage. If the user is logged in, it fetches their auction listings and displays
 * them on the admin profile page. For each listing, it creates a Bootstrap grid with
 * cards displaying information such as the listing title, description, bid count, and status.
 * It also handles displaying a default image if no image is available.
 *
 * @async
 * @function adminListings
 * @throws {Error} Throws an error if the listings fetch fails.
 */
export async function adminListings(){
    const isLogin = localStorage.getItem('isLogin');
    const jsonString = localStorage.getItem('profile');
    const userObject = JSON.parse(jsonString);
    const userName =   userObject.name;
    const urlListings = PROFILE_URL + "/" + userName + "/listings";
    const adminProfile = document.getElementById("adminProfile");
    const adminListingsBody = document.getElementById('adminListingsBody');

     if(isLogin){
            adminProfile.textContent = "Welcome, " + userName;
            try {
                const response = await fetch(urlListings, {
                    method: 'GET',
                    headers:headers(),
                });
                if(!response.ok){
                    const urlResponse = await response.json();
                    throw new Error("Failed to fetch list: " + urlResponse.errors[0].message);
                }
                    const userData = await response.json();
                    const listings = userData.data;
                 if(listings.length > 0){
                     // Create Bootstrap grid container and row
                    const container = document.createElement('div');
                    container.className = 'container';
                    const row = document.createElement('div');
                    row.className = 'row';
                    const url = '/list/?id=';
                    listings.forEach((list) => {
                        const id = list.id;
                        const a = document.createElement('a');
                        a.href = url + id;
                        a.style.textDecoration = 'none';
                        const colDiv = document.createElement('div');
                        colDiv.className = 'col col-12 col-md-6 col-lg-4 mt-5';

                        const card = document.createElement('div');
                        card.className = 'card card-home mt-5 p-3';

                        // Image setup
                        const image = document.createElement('img');
                        image.className = 'img-fluid';
                        image.alt = list.title || 'No Image Available';
                        image.src = list.media && list.media.length > 0 && list.media[0].url
                                    ? list.media[0].url
                                    : '/public/images/nomedia.png'; // Default placeholder image

                        // Title
                        const title = document.createElement('h5');
                        title.className = 'card-title';
                        title.innerText = list.title || 'No Title';

                        // Description
                        const text = document.createElement('p');
                        text.className = 'card-text';
                        text.innerText = list.description || 'No description available';

                        // Bids Section
                        const bid = document.createElement('p');
                        bid.className = 'card-text fw-bold fst-italic';

                        const label = document.createElement('label');
                        label.className = 'bid-label';
                        label.innerText = 'Bids so far : ';

                        bid.appendChild(label);
                        bid.appendChild(document.createTextNode(` ${list._count?.bids || 0}`)); // Handle missing bid count

                        // Listed Section
                        const listed = document.createElement('p');
                        listed.className = 'card-text text-muted fst-italic';
                        listed.innerText = `Listing : ${previousTime(list.created)} `;

                        // Updated List section
                        const updatedList = document.createElement('p');
                        updatedList.className = 'card-text text-muted fst-italic';
                        updatedList.innerText = `Updated : ${previousTime(list.updated)}`;

                        // Status Section
                        const status = document.createElement('p');
                        status.className = 'card-text fw-bold';
                        status.innerText = `Status: ${bidStatusCheck(list.endsAt)}`;
                        // Append elements
                        card.appendChild(image);
                        card.appendChild(title);
                        card.appendChild(text);
                        card.appendChild(bid);
                        card.appendChild(listed);
                        card.appendChild(updatedList);
                        card.appendChild(status);
                        a.appendChild(card);
                        colDiv.appendChild(a);
                        row.appendChild(colDiv);
                    });
                    container.appendChild(row);
                    adminListingsBody.appendChild(container);
                } else{
                    const container = document.createElement('div');
                    container.className = "container";
                    const h1 = document.createElement('h1');
                    h1.className =' text-center mt-5';
                    h1.innerHTML = "No list found!";
                    container.append(h1);
                    adminListingsBody.append(container);
                }
            } catch(error){
                console.log(error);
            }
        }
}