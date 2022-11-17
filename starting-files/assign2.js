/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

const artist = JSON.parse(artists); // Have all the aritsts
const genre = JSON.parse(genres); // Have all the Genres
const song = JSON.parse(sampleSongs); // Have all the songs

let data = [];

function SearchOption(SongOBJ){
   const titleCard = document.querySelector("#cardTitle");
   const artistCard = document.querySelector("#cardName");
   const artistTypeCard = document.querySelector("#cardType");
   const genreCard= document.querySelector("#cardGenre");
   const yearCard = document.querySelector("#cardYear");
   const durrationCard = document.querySelector("#cardDuration");

   titleCard.textContent = SongOBJ.title;//songOBJ.returnSongTitle();
   artistCard.textContent = SongOBJ.artist.name;
   artistTypeCard.textContent = SongOBJ.genre.name;
   genreCard.textContent = "Hassan";
   yearCard.textContent = SongOBJ.year;
   durrationCard.textContent = Math.floor(SongOBJ.details.duration / 60) + ':' + ('0' + Math.floor(SongOBJ.details.duration % 60)).slice(-2);

   data = [
      SongOBJ.analytics.danceability,
      SongOBJ.analytics.energy,
      SongOBJ.analytics.speechiness,
      SongOBJ.analytics.acousticness,
      SongOBJ.analytics.liveness,
      SongOBJ.analytics.valence
   ];
}

function addSongToTable(songOBJ){
   let parentNode = document.querySelector("#searchResults");
   console.log(songOBJ);
   let tr = document.createElement("tr");

   let title = document.createElement("td");
   title.textContent = songOBJ.title;
   tr.appendChild(title);

   let artist = document.createElement("td");
   artist.textContent = songOBJ.artist.name;
   tr.appendChild(artist);

   let year = document.createElement("td");
   year.textContent = songOBJ.year;
   tr.appendChild(year);

   let genre = document.createElement("td");
   genre.textContent = songOBJ.genre.name;
   tr.appendChild(genre);

   let pop = document.createElement("td");
   pop.textContent = songOBJ.details.popularity;
   tr.appendChild(pop);
   
   parentNode.appendChild(tr);
}

function findSong(songID){
   // This code searches the list for a song that matches with the ID given.
   return song.find(songGiven => songGiven.song_id == songID);
}

window.addEventListener('DOMContentLoaded', (event)=> {
   //The reason we made an on content load event listener is so that the content loads before we output anything
   for(aSong of song){
      addSongToTable(aSong);
   }
});




/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
