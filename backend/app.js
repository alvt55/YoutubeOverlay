
// import apikey from "./apikey.js";

const apikey = "AIzaSyCEm2qPWQZsqoH92JFyGYsi2eHag-kko0Q";

// returns 3 video ids based on "search" parameter 
async function Search(search) {
    const result =  await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&q=${search}&type=video&part=snippet&maxResults=3`); 

    const r = await result.json(); 
    const e = await r.items; 
     
    const listOfLinks = [];

    const t = await e.map(i => {
        listOfLinks.push(i.id.videoId); 
    }) 

    return await listOfLinks; 

}

async function loadVideos() {
    // Array of video IDs
    const videoIds = await Search("bigway");

    let link = "https://www.youtube.com/embed/";

    // Select the container where the iframes will be appended
    let container = document.getElementById('video-container');

    // Loop through the video IDs array
    videoIds.forEach(videoId => {
        // Create a div element with the responsive container class
        let div = document.createElement('div');
        div.className = 'responsive-iframe-container';

        // Create an iframe element
        let iframe = document.createElement('iframe');

        // Set the iframe's attributes
        iframe.src = link + videoId;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        // Append the iframe to the div (responsive container)
        div.appendChild(iframe);

        // Append the div to the main container
        container.appendChild(div);
    });
}

// Call the function to load videos
loadVideos();
