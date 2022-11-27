/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

const artist = JSON.parse(artists); // Have all the aritsts
const genre = JSON.parse(genres); // Have all the Genres
const songs = JSON.parse(localStorage.getItem('songs'));
const playlist = JSON.parse(localStorage.getItem('playlist'));

const ctx = document.getElementById('mycanvas');

let data = [];

const myChart =
   new Chart(ctx, {
   type: 'radar',
   data: {
         labels: ['Danceability', 'Energy', 'Speechiness', 'Acousticness', 'Liveness', 'Valence'],
   datasets: [{
      label: 'Song Details',
      data: data,
      borderWidth: 3,       
      }]
   },
            options: {
            elements: {
            line: {
                borderWidth: 3
                }
            }
          }
});



function SearchOption(SongOBJ){
   const titleCard = document.querySelector("#cardTitle");
   const artistCard = document.querySelector("#cardName");
   const artistTypeCard = document.querySelector("#cardType");
   const genreCard= document.querySelector("#cardGenre");
   const yearCard = document.querySelector("#cardYear");
   const durrationCard = document.querySelector("#cardDuration");

   titleCard.textContent = SongOBJ.title;//songOBJ.returnSongTitle();
   artistCard.textContent = SongOBJ.artist.name;
   artistTypeCard.textContent = SongOBJ.genre.name.toUpperCase();
   genreCard.textContent = 'test'.toUpperCase();
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

   myChart.update();
}

function addSongToTable(songOBJ){
   let parentNode = document.querySelector("#searchResults");
   let tr = document.createElement("tr");

   let title = document.createElement("td");
   title.textContent = songOBJ.title;
   title.addEventListener('click', function (e){
      SearchOption(songOBJ);
      document.querySelector('#firstView').style.display = 'none';
      document.querySelector('#secondView').style.display = 'block';
   })
   tr.appendChild(title);

   let artist = document.createElement("td");
   artist.textContent = songOBJ.artist.name;
   tr.appendChild(artist);

   let year = document.createElement("td");
   year.textContent = songOBJ.year;
   tr.appendChild(year);

   let genre = document.createElement("td");
   genre.textContent = songOBJ.genre.name.toUpperCase();
   tr.appendChild(genre);

   let pop = document.createElement("td");
   pop.textContent = songOBJ.details.popularity;
   tr.appendChild(pop);

   let add = document.createElement("td");
   let but = document.createElement('button');
   but.textContent = 'Add To Playlist'
   add.appendChild(but);
   tr.appendChild(add);
   
   parentNode.appendChild(tr);
}

function findSong(songID){
   // This code searches the list for a song that matches with the ID given.
   return songs.find(songGiven => songGiven.song_id == songID);
}

function searchTitle(title){
   let matchingTitle = songs.filter(searchedSong => searchedSong.title.toLowerCase() == title.toLowerCase());
   for(let s of matchingTitle){
      console.log(matchingTitle);
   }
}

function searchArtist(){

}

function searcheGenre(){

}

function searchYear(year, sign){
   let x = document.querySelector('#searchResults');
   x.innerHTML ='';
   let search;
   if(sign == '>')
      search = songs.filter(songFound => songFound.year > year);
   else
      search = songs.filter(songFound => songFound.year < year);
   for(s of search){
      addSongToTable(s);
   }
}

function searchPop(rating, sign){
   let x = document.querySelector('#searchResults');
   x.innerHTML ='';
   let search;
   if(sign == '>')
      search = songs.filter(songFound => songFound.details.popularity > rating);
   else
      search = songs.filter(songFound => songFound.details.popularity < rating);
   for(s of search){
      addSongToTable(s);
   }

}

window.addEventListener('DOMContentLoaded', () => {
   //The reason we made an on content load event listener is so that the content loads before we output anything
   document.querySelector('#secondView').style.display = 'none';

   const jsonData = localStorage.getItem('songs');
   const playlistData = localStorage.getItem('playlist');

   if(!jsonData){
      fetch(api).then((response) => response.json())
      .then((data) => {
         localStorage.setItem('songs', JSON.stringify(data));
         for(aSong of data){
            addSongToTable(aSong);
         }
      });
   } else {

      const songs = JSON.parse(jsonData);
      const playlist = JSON.parse(playlistData);

      for(aSong of songs){
         addSongToTable(aSong);
      }

      for(aSong of playlist){
         console.log(aSong);
      }
   }

});



/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
