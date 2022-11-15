/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

const artist = JSON.parse(artists); // Have all the aritsts
const genre = JSON.parse(genres); // Have all the Genres
const song = JSON.parse(sampleSongs); // Have all the songs

function SongDetails(songGiven){
   this.songID = songGiven.song_id;
   this.songTitle = songGiven.title; // Grabs Song Title
   let theArtist = artist.find(artistLookin => artistLookin.id == songGiven.artist.id); //Uses the find method of an array to find the exact item
   this.artistOfSong = theArtist.name; // Grabs the artist of the song
   this.artistType = theArtist.type;

   this.songGenre = songGiven.genre.name;
   this.year = songGiven.year;
   let time = songGiven.details.duration;
   this.duration = Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2); // This algo can be found at https://www.folkstalk.com/2022/09/javascript-format-seconds-into-minutes-and-second-with-code-examples.html
}

function findSong(songID){
   // This code searches the list for a song that matches with the ID given.
   return song.find(songGiven => songGiven.song_id == songID);
}

function editDom(songOBJ){
   const titleCard = document.querySelector("#cardTitle");
   const artistCard = document.querySelector("#cardName");
   const artistTypeCard = document.querySelector("#cardType");
   const genreCard= document.querySelector("#cardGenre");
   const yearCard = document.querySelector("#cardYear");
   const durrationCard = document.querySelector("#cardDuration");

   titleCard.textContent = "Mike";//songOBJ.returnSongTitle();
   artistCard.textContent = "Hassan";
   artistTypeCard.textContent = "Song NAAAMAE";
   genreCard.textContent = "Hassan";
   yearCard.textContent = "Song NAAAMAE";
   durrationCard.textContent = "Hassan";

}

// let song1 = editDom(SongDetails(song[0]));



/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
