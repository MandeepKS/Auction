import { fetchListings, fetchSingleList } from "../../api/auth/auctionsListings/fetchList.mjs";
import { previousTime } from "../../handler/previousTime.mjs";
import {bidStatusCheck} from "../../handler/bidStatus.mjs";
export async function renderListings() {
    const rawData = await fetchListings();
    let auctions = document.getElementById('auctions');
    let loader = document.getElementById('loader');
    auctions.appendChild(loader);
    const listings = rawData.data;
    setTimeout(() => {
        loader.remove(); // Remove loader once data is fetched
        if (listings.length === 0) {
            auctions.innerText = 'No listings available';
            return;
        }
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
            colDiv.className = 'col col-12 col-md-6 col-lg-4'; // Each card takes 1/3 of the row

            const card = document.createElement('div');
            card.className = 'card card-home mt-3 p-3';

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
        auctions.appendChild(container);
    }, 1000);

    console.log(listings);
    return listings;
}

export async function renderSingleList(){
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const response = await fetchSingleList(id);
  const list = response.data;
  const singleBid = document.getElementById('singleBid');
  const isLogin = localStorage.getItem('isLogin');
  const container = document.createElement('div');
  container.className = 'container';

  const row = document.createElement('div');
  row.className = 'row';

  // === Outer Column (for alignment) ===
  const colDiv = document.createElement('div');
  colDiv.className = 'col-12  mx-auto';
  // === Inner Row for Two Cards Side-by-Side ===
  const innerRow = document.createElement('div');
  innerRow.className = 'row';

  // === Left Card (Listing Info) ===
  const leftCol = document.createElement('div');
  leftCol.className = 'col-12 col-md-6';

  const card = document.createElement('div');
  card.className = 'card card-home mt-3 p-3';

  const image = document.createElement('img');
  image.className = 'img-fluid';
  image.alt = list.title || 'No Image Available';
  image.src = list.media?.[0]?.url || '/public/images/nomedia.png';

  const title = document.createElement('h5');
  title.className = 'card-title mt-2';
  title.innerText = list.title || 'No Title';

  const text = document.createElement('p');
  text.className = 'card-text';
  text.innerText = list.description || 'No description available';

  const bid = document.createElement('p');
  bid.className = 'card-text fw-bold fst-italic';
  const label = document.createElement('label');
  label.className = 'bid-label';
  label.innerText = 'Bids so far : ';
  bid.appendChild(label);
  bid.appendChild(document.createTextNode(` ${list._count?.bids || 0}`));

  const listed = document.createElement('p');
  listed.className = 'card-text text-muted fst-italic';
  listed.innerText = `Listed : ${previousTime(list.created)}`;

  const updatedList = document.createElement('p');
  updatedList.className = 'card-text text-muted fst-italic';
  updatedList.innerText = `Updated : ${previousTime(list.updated)}`;

  // Status Section
  const status = document.createElement('p');
  status.className = 'card-text fw-bold';
  status.innerText = `Status: ${bidStatusCheck(list.endsAt)}`;
  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(bid);
  card.appendChild(listed);
  card.appendChild(updatedList);
  card.appendChild(status);
  leftCol.appendChild(card);

  // === Right Card (Bidding Info) ===
  const rightCol = document.createElement('div');
  rightCol.className = 'col-12 col-md-5';

  const rightCard = document.createElement('div');
  rightCard.className = 'card mt-3 p-3 shadow';

  const activeTitle = document.createElement('h6');
  activeTitle.className = 'fw-bold';
  activeTitle.innerText = 'Active Bidding';

  const timer = document.createElement('p');
  timer.className = 'text-muted';
  timer.innerText = 'Bidding ends in 7 days 16 hours'; // You can update this with a dynamic countdown

  const button = document.createElement('button');
  button.className = 'btn btn-outline-dark mb-2';
  if (isLogin) {
    button.innerText = 'Place Bid';
    button.addEventListener('click', () => {
      const bidAmount = prompt('Enter bid amount:');
      if (bidAmount && !isNaN(bidAmount)) {
        // Here you would call a bidding function or API
        console.log(`User bid: ${bidAmount}`);
      } else {
        alert('Please enter a valid number.');
      }
    });
  } else {
    button.innerText = 'Log in to bid';
    button.addEventListener('click', () => {
      window.location.href = '/login'; // Adjust login path if needed
    });
  }

  const bottomStatus = document.createElement('div');
  bottomStatus.className = 'd-flex align-items-center p-2 mt-2 rounded';
  bottomStatus.style.backgroundColor = '#d3e4c2';

  const profile = document.createElement('img');
  profile.src = list.bids?.[0]?.bidder?.avatar.url || '/public/images/default.png';
  profile.alt = 'Avatar';
  profile.className = 'rounded-circle';
  profile.style.width = '30px';
  profile.style.height = '30px';
  profile.style.objectFit = 'cover';

  const bidInfo = document.createElement('span');
  bidInfo.className = 'ms-2';
  bidInfo.innerHTML = `<strong>1 Credits</strong> <em>WINNING</em>`;

  bottomStatus.appendChild(profile);
  bottomStatus.appendChild(bidInfo);

  rightCard.appendChild(activeTitle);
  rightCard.appendChild(timer);
  rightCard.appendChild(button);
  rightCard.appendChild(bottomStatus);

  rightCol.appendChild(rightCard);

  // === Assemble Both Columns ===
  innerRow.appendChild(leftCol);
  innerRow.appendChild(rightCol);

  colDiv.appendChild(innerRow);
  row.appendChild(colDiv);
  container.appendChild(row);
  singleBid.appendChild(container);
    console.log('single list', list);
  }
