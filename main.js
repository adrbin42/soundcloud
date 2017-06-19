/*
  Here is a guide for the steps you could take:
*/

// First figure out what is the end goal supposed to do.
// Get API Key (in this case you already have it)
//build a form that accepts input from user (their favorite band)
//and it searches Soundcloud and returns songs by the artist
//Instructions say it fetches a list of songs
//Need to be able to click on a song and it plays a list of songs

// 1. First select and store the elements you'll be working with
    // Select and store input from form elements

let audioPlayer = document.querySelector(".music-player");
let form = document.querySelector(".search-form");
let grid = document.querySelector(".grid");

// 2. Create your `onSubmit` event for getting the user's search term
    // Create a submit button that takes the user input and
    // assigns to a variable. Function reloads page automatically
    //if you are using onsubmit property with a function will reload automatically

form.onsubmit = function onSubmit() {
  event.preventDefault();
  searchSoundCloud(form.search.value);
};

// 3. Create your `fetch` request that is called after a submission
  // Ask for data relating to user's search term.
  // make api calls to soundcloud for musician information
function searchSoundCloud(song){
  fetch("http://api.soundcloud.com/tracks/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f&q=" + song)
  .then(function(response){
    response.json().then(function(data){
    let searchItems = data;
    let songs = "";
    let artist = form.search.value;
    var uri;

    console.log(searchItems);

    for(let i=0;i<searchItems.length;i++){
      //t300x300 make artwork pics bigger?
      if(searchItems[i].artwork_url !== null){
      songs += "<div class='grid-cell'>";
      songs += "<img src=" + searchItems[i].artwork_url + " id='artwork'><br>";
      songs += "<span id='songTitle'>";
      songs += searchItems[i].title + "</span><br>";
      songs += "<span id='artist'>";
      songs += artist.toUpperCase() + "</span></div>";
      }else{
        songs += "<div class='grid-cell'>";
        songs += "<img src='noartwork.jpg'  id='artwork' ></span>" ;
        songs += "<span id='songTitle'>";
        songs += searchItems[i].title + "</span>";
        songs += "<span id='artist'>";
        songs += artist.toUpperCase() + "</span></div>";
        }
      }
      grid.innerHTML = "<div class='searchText'><h3>Search results</h3></div>" + songs;
    });
  });

}
// 5. Create a way to listen for a click that will play the song in the audio play
    // Add an event listener that listens for a click event.

    // Get the parent DIV, add click listener...
  document.querySelector(".grid").addEventListener("click", function(event) {
	// event.target was the clicked element
  if (event.target && event.target.matches(".grid-cell")) {
    console.log("Search result clicked!");
	}
});
