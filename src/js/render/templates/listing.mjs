import { fetchListings, fetchSingleList } from "../../api/auth/auctionsListings/fetchList.mjs";
import { previousTime } from "../../handler/previousTime.mjs";
import {bidEndTimeCheck, bidStatusCheck} from "../../handler/bidStatus.mjs";
import { bidSubmit } from "../../handler/placeBid.mjs";
/**
 * Renders all auction listings on the homepage and sets up search functionality.
 *
 * - Fetches listings from the backend.
 * - Displays listings as Bootstrap cards.
 * - Appends a loader during data fetch.
 * - Includes a search input to filter listings by title.
 *
 * @async
 * @function renderListings
 * @returns {Promise<void>}
 */
export async function renderListings() {
  const rawData = await fetchListings();
  const listings = rawData.data;
  const auctions = document.getElementById('auctions');
  const loader = document.getElementById('loader');
  auctions.appendChild(loader);

  const searchInput = document.getElementById('searchInput');

  const renderCards = (data) => {
    auctions.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'container';
    const row = document.createElement('div');
    row.className = 'row';

    data.forEach((list) => {
      const id = list.id;
      const a = document.createElement('a');
      a.href = `/list/?id=${id}`;
      a.style.textDecoration = 'none';

      const colDiv = document.createElement('div');
      colDiv.className = 'col col-12 col-md-6 col-lg-4';

      const card = document.createElement('div');
      card.className = 'card card-home mt-3 p-3';

      const image = document.createElement('img');
      image.className = 'img-fluid';
      image.alt = list.title || 'No Image Available';
      image.src = list.media?.[0]?.url || '/public/images/nomedia.png';

      const title = document.createElement('h5');
      title.className = 'card-title';
      title.innerText = list.title || 'No Title';

      const text = document.createElement('p');
      text.className = 'card-text';
      text.innerText = list.description || 'No description available';

      const bid = document.createElement('p');
      bid.className = 'card-text fw-bold fst-italic';
      const label = document.createElement('label');
      label.innerText = 'Bids so far: ';
      bid.appendChild(label);
      bid.appendChild(document.createTextNode(` ${list._count?.bids || 0}`));

      const listed = document.createElement('p');
      listed.className = 'card-text text-muted fst-italic';
      listed.innerText = `Listing: ${previousTime(list.created)}`;

      const updated = document.createElement('p');
      updated.className = 'card-text text-muted fst-italic';
      updated.innerText = `Updated: ${previousTime(list.updated)}`;

      const status = document.createElement('p');
      status.className = 'card-text fw-bold';
      status.innerText = `Status: ${bidStatusCheck(list.endsAt)}`;

      card.append(image, title, text, bid, listed, updated, status);
      a.appendChild(card);
      colDiv.appendChild(a);
      row.appendChild(colDiv);
    });

    container.appendChild(row);
    auctions.appendChild(container);
  };

  setTimeout(() => {
    loader.remove();
    if (!listings.length) {
      auctions.innerText = 'No listings available';
      return;
    }
    renderCards(listings);

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = listings.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
      renderCards(filtered);
    });
  }, 1000);
}


/**
 * Renders a single auction listing page with detailed information and bidding functionality.
 *
 * - Fetches listing data based on URL parameter `id`.
 * - Displays listing card with image, title, description, timestamps, and bid status.
 * - Shows a bidding section (button and countdown) if the user is logged in.
 * - Handles bid submission via prompt.
 * - Displays bidder avatar and winning info if available.
 *
 * @async
 * @function
 * @returns {Promise<void>} - This function updates the DOM but does not return any value.
 */
export async function renderSingleList(){
  const url = new URL(location.href);
  const id = url.searchParams.get("id");
  const response = await fetchSingleList(id);
  const list = response.data;
  const singleBid = document.getElementById('singleBid');
  const isLogin = localStorage.getItem('isLogin');
  const container = document.createElement('div');
  container.className = 'container mt-5 mb-5';

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
  activeTitle.innerText = 'Bidding Detail';

  const timer = document.createElement('p');
  timer.className = 'text-muted';
  timer.innerText =  bidEndTimeCheck(list.endsAt); //dynamic countdown

  const button = document.createElement('button');
  button.className = 'btn btn-outline-dark mb-2';
  if (isLogin) {
    if(bidStatusCheck(list.endsAt) === "Active"){
      button.innerText = 'Place Bid';
      button.addEventListener('click', () => {
        const bidAmount = prompt('Enter bid amount:');
        if (bidAmount && !isNaN(bidAmount)) {
          bidSubmit(bidAmount, list.id);
          console.log(`User bid: ${bidAmount}`);
        } else {
          alert('Please enter a valid number.');
        }
      });
    } else{
      button.style.display = "none";
    }

  } else {
    button.innerText = 'Log in to bid';
    button.addEventListener('click', () => {
      window.location.href = '/login'; //login path
    });
  }
  rightCard.appendChild(activeTitle);
  rightCard.appendChild(timer);
  rightCard.appendChild(button);
    //Bottom status
    const highestBidder = list.bids;
    const sortedBidders = [...highestBidder].sort((a, b) => b.amount - a.amount);
    sortedBidders.forEach((bidder)=>{
    const bottomStatus = document.createElement('div');
    const avatarImg = bidder?.bidder?.avatar.url ||'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500';
    const bidderName = bidder?.bidder?.name;
    const bidAmount = bidder?.amount;
    console.log('reverse bid', bidder);
    bottomStatus.className = 'd-flex align-items-center p-2 mt-2 rounded';
    bottomStatus.style.backgroundColor = '#d3e4c2';

    const profile = document.createElement('img');
    profile.src = avatarImg;
    profile.alt = 'AVT';
    profile.className = 'rounded-circle';
    profile.style.width = '30px';
    profile.style.height = '30px';
    profile.style.objectFit = 'cover';

    const bidInfo = document.createElement('div');
    bidInfo.className = 'd-flex justify-content-between w-100 ms-2';

    const nameSpan = document.createElement('span');
    nameSpan.innerText = bidderName;

    const amountSpan = document.createElement('span');
    amountSpan.innerHTML = `<strong>$${bidAmount}</strong>`;

    bidInfo.appendChild(nameSpan);
    bidInfo.appendChild(amountSpan);
    bottomStatus.appendChild(profile);
    bottomStatus.appendChild(bidInfo);
    rightCard.appendChild(bottomStatus);
  });
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
