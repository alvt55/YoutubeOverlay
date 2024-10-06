const form = document.getElementById('myForm');
let currentSearchTerm = '';
let pageToken = '';  // To handle pagination in YouTube API

// Add an event listener to listen for the submit event
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchVal = document.getElementById('search').value;
    currentSearchTerm = searchVal;
    pageToken = '';  // Reset the page token for new searches
    loadVideos(searchVal, true);  // Load the first 10 videos, true indicates a new search
});

// Function to search videos (returns 10 video IDs and nextPageToken for pagination)
async function Search(search) {
    const result =  await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&q=${search}&type=video&part=snippet&maxResults=3`);
        //api token ^^
    const r = await result.json();
    const e = await r.items;
    pageToken = r.nextPageToken || '';  // Update the page token for the next API call
    
    const listOfLinks = e.map(i => i.id.videoId);
    return listOfLinks;

}

// Function to load videos into the container
async function loadVideos(search, isNewSearch = false) {
    const videoIds = await Search(search);
    let link = "https://www.youtube.com/embed/";
    let container = document.getElementById('video-container');

    if (isNewSearch) {
        // Clear previous videos if it's a new search
        container.innerHTML = '';
    }

    // Loop through the video IDs and append them to the container
    videoIds.forEach(videoId => {
        // Create a currDiv element with the responsive container class
        let currDiv = document.createElement('div');
        currDiv.className = 'responsive-iframe-container';
        
        let iframe = document.createElement('iframe');
        iframe.src = link + videoId;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        
        currDiv.appendChild(iframe);
        container.appendChild(currDiv);
    });
}

// Infinite scrolling
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 10 && pageToken) {
        // Load the next set of videos when reaching the bottom if a valid pageToken exists
        loadVideos(currentSearchTerm);
    }
});
