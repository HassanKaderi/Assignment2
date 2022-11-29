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

function addSongToTable(songOBJ, parent){
   let parentNode = document.querySelector(parent);
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
   but.setAttribute('data-songid', songOBJ.song_id);
   if(parent == '#searchResults'){
      but.textContent = 'Add To Playlist';
      but.addEventListener('click', function(e){
         addToPlaylist(findSong(e.target.dataset.songid));
      });
   } else {
      but.textContent = 'Remove From Playlist'
   }
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

function hideView () {
   let x = document.getElementById("secondView"); 

   if (x.style.display === "none") {
       x.style.display = "block";
       document.querySelector('#firstView').style.display = 'none';

     } else {
       x.style.display = "none";
       document.querySelector('#firstView').style.display = 'block';
     }
}

function checkRadio(radio, value){
   switch(radio){
      case 'Title':
         console.log('looking for a Title! With this value: ' + value);
         break;
      case 'Genre':
         console.log('looking for a Genre! With this value: ' + value);
         break;
      case 'Artist':
         console.log('looking for a Artist! With this value: ' + value);
         break;
      default:
         break;
   }
}

function addToPlaylist(songObj){
   let playlist = localStorage.getItem('playlist');
   if(!playlist){ // If the playlist is empty we need to create a new array object
      let arr = [];
      arr = [songObj];
      localStorage.setItem('playlist', JSON.stringify(arr));
      addSongToTable(songObj, '#playlistResults');
   } else { // now that the playlist is not empty we hav to check for duplicates so we do not accidentally add em.
      let x = JSON.parse(playlist);
      if(!x.includes(x.find(song => song.song_id == songObj.song_id))){
         x.push(songObj);
         console.log(x)
         localStorage.setItem('playlist', JSON.stringify(x));
         addSongToTable(songObj, '#playlistResults');
      } else {
         alert("This song is already in your playlist!");
      }
   }
}

function removeFromPlaylist(songObj){
   let playlist = JSON.parse(localStorage.getItem('playlist'));
   playlist.splice(playlist.indexOf(songObj), 1);
   
}

window.addEventListener('DOMContentLoaded', () => {
   //The reason we made an on content load event listener is so that the content loads before we output anything
   document.querySelector('#secondView').style.display = 'none';
   document.querySelector('#thirdView').style.display = 'none';

   document.querySelector('#playlistView').addEventListener('click', function(){
      document.querySelector('#thirdView').style.display = 'block';
      document.querySelector('#firstView').style.display = 'none';
   });

   document.querySelector('#songView').addEventListener('click', function(){
      document.querySelector('#firstView').style.display = 'block';
      document.querySelector('#thirdView').style.display = 'none';
   });

   const jsonData = localStorage.getItem('songs');
   const playlist = JSON.parse(localStorage.getItem('playlist'));

   if(!jsonData){
      fetch(api).then((response) => response.json())
      .then((data) => {
         localStorage.setItem('songs', JSON.stringify(data));
         for(aSong of data){
            addSongToTable(aSong, '#searchResults');
         }
      });
   } else {

      const songs = JSON.parse(jsonData);
      

      for(aSong of songs){
         addSongToTable(aSong, '#searchResults');
      }

      if(playlist){
         for(song of playlist){
               addSongToTable(song, '#playlistResults');
            }
      }
      // 

   
      // for(aSong of playlist){
      //    console.log(aSong);
      // }
   }

   document.querySelector('#clearFilters').addEventListener('click', function (e){
      let x = document.querySelector('#searchResults');
      x.innerHTML ='';
   });

   document.querySelector('#searchFilters').addEventListener('click', function(){
      let radioButtons = document.querySelectorAll('input[name="filterType"]');
      for(let r of radioButtons){
         if(r.checked){
            checkRadio(r.dataset.search, document.querySelectorAll('.title').value);
         }
      }
   });


});






/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
