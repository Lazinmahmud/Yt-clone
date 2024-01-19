///google search engine
document.querySelector('.query').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
     const searchText = encodeURIComponent(this.value);
     const googleSearchURL = `https://www.google.com/search?q=${searchText}`;
     window.open(googleSearchURL, '_blank');
   }
});


// youtube api use from youtube video player
const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyAfjmiTs9n_DNqYaTewZXBUoKxOoXFa9ms";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 70,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `<div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class="thumbnail">
      <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon">
        <div class="info">
          <h4 class="video-title">${data.snippet.title}</h4>
          <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
      </div>
    </div>
    `;
}

//search bar

const searchInput = document.querySelector('.search-bar');

let searchLink = "https://www.youtube.com/results?search_query=";

// বাটন ক্লিক এবং কীবোর্ড ইন্টার একসাথে কাজ করবে
searchInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
}
// video player click video open

const removeAc = ()=>{
  navbarItem.forEach(item=>{
    item.classList.remove('Ac')
  })
}

let navbarItem = document.querySelectorAll('.navItems');
navbarItem.forEach(item=>{
  item.addEventListener('click',()=>{
    removeAc();
    item.classList.add('Ac')
  });
});


document.getElementById('vdo').addEventListener('click', function() {
  
    document.querySelector('.youtube-video-page').style.left = '0'
    document.querySelector('.home-page').style.left = '-100%'
});

document.getElementById('homePage').addEventListener('click', function() {
  
    document.querySelector('.youtube-video-page').style.left = '100%'
    document.querySelector('.home-page').style.left = '0'
});