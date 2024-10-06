



const form = document.getElementById('myForm');

// Add an event listener to listen for the submit event
form.addEventListener('submit', function(event) {
    // Prevent the form from submitting the default way (i.e., reloading the page)
    event.preventDefault();

    // Capture the form data
    const searchVal = document.getElementById('search').value;

    // Log the form data to the console (for demonstration)
    console.log(`Searchval: ${searchVal}`);
  

    // Optionally show a success message to the user
    loadVideos(searchVal); 
});


const apikey = "AIzaSyCEm2qPWQZsqoH92JFyGYsi2eHag-kko0Q";

// returns 3 video ids based on "search" parameter 
async function Search(search) {
    const result =  await fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCEm2qPWQZsqoH92JFyGYsi2eHag-kko0Q&q=${search}&type=video&part=snippet&maxResults=3`); 

    const r = await result.json(); 
    const e = await r.items; 
     
    const listOfLinks = [];

    const t = await e.map(i => {
        listOfLinks.push(i.id.videoId); 
    }) 

    return await listOfLinks; 

}

async function loadVideos(search) {

   

    // Array of video IDs
    const videoIds = await Search(search);

    let link = "https://www.youtube.com/embed/";

    // Select the container where the iframes will be appended
    let container = document.getElementById('video-container');

     // remove previous videos 
     container.innerHTML = '';

    // Loop through the video IDs array
    videoIds.forEach(videoId => {
        // Create a currDiv element with the responsive container class
        let currDiv = document.createElement('currDiv');
        currDiv.className = 'responsive-iframe-container';

        // Create an iframe element
        let iframe = document.createElement('iframe');

        // Set the iframe's attributes
        iframe.src = link + videoId;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        // Append the iframe to the currDiv (responsive container)
        currDiv.appendChild(iframe);

        // Append the currDiv to the main container
        container.appendChild(currDiv);
    });
}

// Call the function to load videos
// loadVideos();
