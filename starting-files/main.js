/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

const artist = JSON.parse(artists); // Have all the aritsts
const genre = JSON.parse(genres); // Have all the Genres
const songs = JSON.parse(localStorage.getItem('songs'));
const playlist = JSON.parse(localStorage.getItem('playlist'));
const arrOfPlaylists = [];

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

}

function addSongToTable(songOBJ, parent){
   let parentNode = document.querySelector(parent);
   let tr = document.createElement("tr");
   tr.setAttribute('dataset', songOBJ.song_id);

   let title = document.createElement("td");
   title.textContent = songOBJ.title;
   title.addEventListener('click', function (e){
      SearchOption(songOBJ);
      document.querySelector('#firstView').style.display = 'none';
      document.querySelector('#thirdView').style.display = 'none';
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
      but.addEventListener('click', function(e){
         removeFromPlaylist(findSong(e.target.dataset.songid));
      });
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
   let matchingTitle = songs.filter(searchedSong => searchedSong.title.toLowerCase().includes(title.toLowerCase()));
   document.querySelector('#searchResults').innerHTML = '';
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
   }
}

function searchArtist(artist){
   let matchingTitle = songs.filter(searchedSong => searchedSong.artist.name.toLowerCase().includes(artist.toLowerCase()));
   document.querySelector('#searchResults').innerHTML = '';
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
   }
}

function searcheGenre(genre){
   let matchingTitle = songs.filter(searchedSong => searchedSong.genre.name.toLowerCase().includes(genre.toLowerCase()));
   document.querySelector('#searchResults').innerHTML = '';
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
   }
}

function searchYear(year, value){
   let x = document.querySelector('#searchResults');
   x.innerHTML ='';
   let search;
   if(value == '1'){
      search = songs.filter(songFound => songFound.year > year);
   }  
   else{
      search = songs.filter(songFound => songFound.year < year);
   }
      
   for(s of search){
      addSongToTable(s, '#searchResults');
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

function checkSearchFilters(option, value){
   if(value != ''){
   switch(option){
      case 1:
         console.log('looking for a Title! With this value: ' + value);
         searchTitle(value);
         break;
      case 2:
         console.log('looking for a Genre! With this value: ' + value);
         searchArtist(value);
         break;
      case 3:
         console.log('looking for a Artist! With this value: ' + value);
         searcheGenre(value);
         break;
      default:
         break;
   }
} else {
   alert('Please Add a value...')
}
}

function checkNumberFilters(option, value, oper){
   if(value != ''){
   switch(option){
      case 1:
         console.log('looking for a Year! With this value: ' + value + 'That is ' + oper);
         searchYear(value, oper);
         break;
      case 2:
         console.log('looking for a Pop! With this value: ' + value);
         searchArtist(value);
         break;
      default:
         break;
   }
} else {
   alert('Please Add a value...')
}
}

function createPlaylist(playlistName){
   if(! (playlistName == 'songs' || arrOfPlaylists.find(item => item == playlistName))){
      let arr = [];
      localStorage.setItem(playlistName, JSON.stringify(arr));
      arrOfPlaylists.push(playlistName);
   } else {
      console.log('Playlist exists or can not be named that!');
   }
}

function deletePlaylist(playlistName){
   if(playlistName == 'songs' || arrOfPlaylists.find(item => item == playlistName)){
      localStorage.removeItem(playlistName);
      arrOfPlaylists.splice(arrOfPlaylists.indexOf(playlistName));
   } else {
      console.log('Play list not found!')
   }
}

function addPlaylistsToList(){
   let x = document.querySelector('#listOfPlaylists');
   for(a of arrOfPlaylists){
      let li = document.createElement('li');
      li.textContent = a;
      li.setAttribute('class', 'playlistListStyle');
      li.setAttribute('dataset', a);
      li.addEventListener('click', function (e) {
         console.log(e.target);
      })
      x.appendChild(li)
   }
}


function addToPlaylist(songObj, playlistName){
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

function removeFromPlaylist(songObj, playlistName){
   document.querySelector('#playlistResults').innerHTML = '';
   let playlist = JSON.parse(localStorage.getItem('playlist'));
   if(playlist.includes(playlist.find(song => song.song_id == songObj.song_id))){
      console.log('Removing song found at: ' + playlist.indexOf(playlist.find(song => song.song_id == songObj.song_id)));
      playlist.splice(playlist.indexOf(playlist.find(song => song.song_id == songObj.song_id)), 1)
      localStorage.setItem('playlist', JSON.stringify(playlist));
      for(a of playlist){
         addSongToTable(a, '#playlistResults');
      }
   } else {
      console.log('Song not found');
   }
}

window.addEventListener('DOMContentLoaded', () => {
   //The reason we made an on content load event listener is so that the content loads before we output anything
   document.querySelector('#secondView').style.display = 'none';
   // document.querySelector('#thirdView').style.display = 'none';

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
   }
   if(!playlist){
      let arr = [];
      localStorage.setItem('playlist', JSON.stringify(arr));
   } else {
      for(song of playlist){
         addSongToTable(song, '#playlistResults');
      }
   }

   // This clears all the filters, and remaps the Songs
   document.querySelector('#clearFilters').addEventListener('click', function (e){
      let x = document.querySelector('#searchResults');
      x.innerHTML ='';
      for(aSong of songs){
         addSongToTable(aSong, '#searchResults');
      }
   });

   // Adding the event listner to when the search button is clicked for the searching
   document.querySelector('#searchFilters').addEventListener('click', function(){
      let formOneValue = document.querySelector('#browseFilterOne');
      let formTwoValue = document.querySelector('#browseFilterTwo');

      let textBoxOne = document.querySelector('#browseFilterOneText').value;
      let textBoxTwo = document.querySelector('#browseFilterTwoText').value;

      let opp = document.querySelectorAll('[name="valueGiver"]');

      let popup = document.querySelector('.popup');
      let popupText = document.querySelector('#popupTitle');

      if(formOneValue.selectedIndex == 0 && formTwoValue.selectedIndex == 0){
         popupText.textContent = 'Please Select a filter type!';
         popup.style.display = 'block';
         setTimeout(()=>{
            popup.style.display = 'none';
         },3000)
         
      } else if((formOneValue.selectedIndex > 0 && formTwoValue.selectedIndex > 0)){
         popupText.textContent = 'Please choose only one filter type!';
         popup.style.display = 'block';
         setTimeout(()=>{
            popup.style.display = 'none';
         },3000)
         formOneValue.selectedIndex = 0;
         formTwoValue.selectedIndex = 0;
      } else {
         if(formOneValue.selectedIndex > 0){
            // Filter either title genre or playlist
            checkSearchFilters(formOneValue.selectedIndex, textBoxOne);
         } else {
            if(opp[0].checked){
               checkNumberFilters(formTwoValue.selectedIndex, textBoxTwo, '-1');
            }else{
               checkNumberFilters(formTwoValue.selectedIndex, textBoxTwo, '1');
            }
            // Filter Either Year or Popularity
         }
      }
   });

   // Adding credit popup 

   // <p id="headerButtons"><button id="songView">Song Browser</button><button>Credits</button>
   //              <div class="credits">
   //                  <button><a href="https://github.com/HassanKaderi/Assignment2">Github</a></button>
   //                  <hr>
   //                  Created by Hassan and Yuusuf
   //                  <br>
   //              </div>
   //          </p>

   let credits = document.querySelector('#creditButton');
   credits.addEventListener('click', () => {
      let popup = document.querySelector('.credits');
      if(popup.style.display == 'block'){
         popup.style.display = 'none';
      } else {
         popup.style.display = 'block';
         setTimeout(()=> {
            popup.style.display = 'none';
         }, '5000');
      }
   });


});






/* note: you may get a CORS error if you try fetching this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/
