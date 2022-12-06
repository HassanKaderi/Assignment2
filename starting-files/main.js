/* url of song api --- https versions hopefully a little later this semester */	
const api = 'http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php';

const artist = JSON.parse(artists); // Have all the aritsts
const genre = JSON.parse(genres); // Have all the Genres
const songs = JSON.parse(localStorage.getItem('songs'));
const arrOfPlaylists = [];
let currentSongs = songs;
let numData = [];

   const data = {
      labels: [
        'Danceability',
        'Energy',
        'Speechiness',
        'Acousticness',
        'Liveness',
        'Valence',
      ],
      datasets: [{ // Dataset 0
        label: 'Song Name',
        data: numData,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    };
   
   let ctx = document.getElementById('mycanvas');
   const newChart = new Chart(ctx, config);

function sort(condition, boxResults){
   let x = document.querySelector(boxResults);
   x.innerHTML = '';
   let sortSongs = songs; // neede to change
   switch(condition.toLowerCase()){
      case 'title':
         currentSongs.sort((a,b) =>   {
            if (a.title > b.title) {
               return 1;
             }
             if (a.title < b.title) {
               return -1;
             }
             return 0;});
         break
      case 'artist':
         currentSongs.sort((a,b) =>   {
            if (a.artist.name > b.artist.name) {
               return 1;
             }
             if (a.artist.name < b.artist.name) {
               return -1;
             }
             return 0;});
         break
      case 'year':
         currentSongs.sort((a,b) => b.year - a.year);
         break
      case 'genre':
         currentSongs.sort((a,b) =>   {
            if (a.genre.name > b.genre.name) {
               return 1;
             }
             if (a.genre.name < b.genre.name) {
               return -1;
             }
             return 0;});
         break
      case 'popularity':
         currentSongs.sort((a,b) => b.details.popularity - a.details.popularity);
         break
      default:
         console.log('No sorting available')
         break
   }

   for(asong of currentSongs){
      addSongToTable(asong,'#searchResults');
   }
}

function SearchOption(SongOBJ){
   const titleCard = document.querySelector("#cardTitle");
   const artistCard = document.querySelector("#cardName");
   const artistTypeCard = document.querySelector("#cardType");
   const genreCard= document.querySelector("#cardGenre");
   const yearCard = document.querySelector("#cardYear");
   const durrationCard = document.querySelector("#cardDuration");

   titleCard.textContent = SongOBJ.title;//songOBJ.returnSongTitle();
   artistCard.textContent = 'By, ' + SongOBJ.artist.name;
   artistTypeCard.textContent = 'Artist Type: ' + artist.find(artist => artist.id = SongOBJ.artist.id).type;
   genreCard.textContent = 'Song Genre ' + SongOBJ.genre.name.toUpperCase()
   yearCard.textContent = 'Released: ' +  SongOBJ.year;
   durrationCard.textContent = 'Song Duration: ' + Math.floor(SongOBJ.details.duration / 60) + ':' + ('0' + Math.floor(SongOBJ.details.duration % 60)).slice(-2);

   // Right side 
   const cardBPM = document.querySelector("#cardBPM");
   const cardPopularity = document.querySelector("#cardPopularity");

   const cardEnergy = document.querySelector("#cardEnergy");
   const cardDanceability = document.querySelector("#cardDanceability");
   const cardLiveness = document.querySelector("#cardLiveness");
   const cardValence = document.querySelector("#cardValence");
   const cardAcousticness = document.querySelector("#cardAcousticness");
   const cardSpeechiness = document.querySelector("#cardSpeechiness");

   cardBPM.textContent = SongOBJ.details.bpm + ' BPM,';
   cardPopularity.textContent = 'Popularity: ' + SongOBJ.details.popularity;

   cardDanceability.textContent = 'Danceability: ' +SongOBJ.analytics.danceability;
   cardEnergy.textContent = 'Energy: ' + SongOBJ.analytics.energy;//songOBJ.returnSongTitle();
   cardSpeechiness.textContent = 'Speechiness: ' + SongOBJ.analytics.speechiness;
   cardAcousticness.textContent = 'Acousticness: ' + SongOBJ.analytics.acousticness;
   cardValence.textContent = 'Valence: ' + SongOBJ.analytics.valence;
   cardLiveness.textContent = 'Liveness: ' + SongOBJ.analytics.liveness;

   numData = [
      SongOBJ.analytics.danceability,
      SongOBJ.analytics.energy,
      SongOBJ.analytics.speechiness,
      SongOBJ.analytics.acousticness,
      SongOBJ.analytics.liveness,
      SongOBJ.analytics.valence
   ];

   const newDataset = { // Dataset 0
      label: 'Song Analysis',
      data: numData,
      fill: true,
      backgroundColor: 'rgba(0, 99, 132, 0.2)',
      borderColor: 'rgb(0, 99, 132)',
      pointBackgroundColor: 'rgb(0, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0, 99, 132)'
   }
   newChart.data.datasets.pop();
   newChart.data.datasets.push(newDataset);
   newChart.update();

}

function addSongToTable(songOBJ, parent, playlist){
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
   title.classList.add('mouseOverEvent');
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
   but.setAttribute('data-playlist', playlist);
   if(parent == '#searchResults'){
      but.textContent = 'Add To Playlist';
      but.addEventListener('click', function(e){
         addToPlaylistPopup(e, songOBJ.song_id);
         // addToPlaylist(findSong(e.target.dataset.songid));
      });
   } else {
      but.textContent = 'Remove From Playlist'
      but.addEventListener('click', function(e){
         console.log(e.target);
         removeFromPlaylist(findSong(e.target.dataset.songid), e.target.dataset.playlist);
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
   currentSongs = [];
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
      currentSongs.push(a);
   }
}

function searchArtist(artist){
   let matchingTitle = songs.filter(searchedSong => searchedSong.artist.name.toLowerCase().includes(artist.toLowerCase()));
   document.querySelector('#searchResults').innerHTML = '';
   currentSongs = [];
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
      currentSongs.push(a);
   }
}

function searcheGenre(genre){
   let matchingTitle = songs.filter(searchedSong => searchedSong.genre.name.toLowerCase().includes(genre.toLowerCase()));
   document.querySelector('#searchResults').innerHTML = '';
   currentSongs = [];
   for(a of matchingTitle){
      addSongToTable(a, '#searchResults');
      currentSongs.push(a);
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
   currentSongs = [];
   for(s of search){
      addSongToTable(s, '#searchResults');
      currentSongs.push(s);
   }
}

function searchPop(rating, sign){
   let x = document.querySelector('#searchResults');
   x.innerHTML ='';
   let search;
   if(sign == '1'){
      search = songs.filter(songFound => songFound.details.popularity > rating);
   }
   else{
      search = songs.filter(songFound => songFound.details.popularity < rating);
   }
      
      
   currentSongs = [];
   for(s of search){
      addSongToTable(s, '#searchResults');
      currentSongs.push(s);
   }

}

function hideView() {
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
         searchPop(value, oper);
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
   for(a in localStorage){
      if(!(playlistName == 'songs' || localStorage.getItem(a) != null)){
         let x = [];
         localStorage.setItem(playlistName, JSON.stringify(x));
      }
   }   
}

function addPlaylistsToList(){
   let x = document.querySelector('#listOfPlaylists');
   x.innerHTML = '';
   for(a in localStorage){
   if(localStorage.getItem(a) != null && a != 'songs'){
      let li = document.createElement('li');
      li.textContent = a;
      li.setAttribute('class', 'playlistListStyle');
      li.setAttribute('dataset', a);
      li.addEventListener('click', function (e) {
         console.log(e.target.textContent);
         document.getElementById('removeCurrentPlaylist').dataset.playlist = e.target.textContent;
         updatePlaylistView(e.target.textContent);
      })
      x.appendChild(li)
   }
}
}

function updatePlaylistView(playlistName){
   document.getElementById('playlistResults').innerHTML = '';
   let x = localStorage.getItem(playlistName);
   let parsed  = JSON.parse(x);
   for(num of parsed){
      addSongToTable(num, '#playlistResults', playlistName);
   }
}

function addToPlaylist(songObj, playlistName){
   let playlistGiven = localStorage.getItem(playlistName);
   
   if(!playlistGiven){ // If the playlist is empty we need to create a new array object
      if(! (playlistName == 'songs' || arrOfPlaylists.find(item => item == playlistName))){
         console.log(playlistGiven + ': Playlist doenst exist, lemme make a new one called: ' + playlistName);
         createPlaylist(playlistName);
         addToPlaylist(songObj, playlistName);
      }
   } else {
      console.log('Found the list, time to add the song!')
      let x = JSON.parse(playlistGiven);
      if(!x.includes(x.find(song => song.song_id == songObj.song_id))){
         x.push(songObj);
         console.log(x)
         localStorage.setItem(playlistName, JSON.stringify(x));
         addSongToTable(songObj, '#playlistResults', playlistName);
      } else {
         alert("This song is already in your playlist!");
      }
   }
   // now that the playlist is not empty we hav to check for duplicates so we do not accidentally add em.
   
   
}

function removeFromPlaylist(songObj, playlistName){
   document.querySelector('#playlistResults').innerHTML = '';
   let playlist = JSON.parse(localStorage.getItem(playlistName));

   if(playlist.includes(playlist.find(someElement => someElement.song_id == songObj.song_id))){
      playlist.splice(playlist.indexOf(playlist.find(someElement => someElement.song_id == songObj.song_id)), 1)
      localStorage.setItem(playlistName, JSON.stringify(playlist));
      for(a of playlist){
         addSongToTable(a, '#playlistResults');
      }
   } else {
      console.log('Song not found');
   }
}

function removeAllPlaylists(){
   // VERY IMPORTANT!!!!!
   for(key in localStorage){
      if(localStorage.getItem(key) != null && key != 'songs'){
         localStorage.removeItem(key);
      }
   }
   document.querySelector('#playlistResults').innerHTML = '';
   addPlaylistsToList();
}

function addToPlaylistPopup(e, songId){
   console.log('Created new popup!');

   let div = document.createElement('div');
   div.className = 'addToPlaylist';
   div.id = 'popupwindow';

   let select = document.createElement('select');
   select.className = 'bg-transparent';
   select.addEventListener('change', function(e){
      addToPlaylist(findSong(songId), e.target.value)
      e.target.parentNode.remove()
   });

   let option = document.createElement('option');
   option.textContent = 'Choose Playlist';
   option.value = 0;
   option.className = 'specialOption';
   select.appendChild(option);


   for(list in localStorage){
      if(localStorage.getItem(list) != null && list != 'songs'){
         let option = document.createElement('option');
         option.textContent = list;
         option.value = list;
         option.className = 'specialOption';
         select.appendChild(option);
      }
      
   }

   div.appendChild(select);
   div.appendChild(document.createElement('hr'));
    
   let inp = document.createElement('input');
   inp.type = 'text';
   inp.className = 'bg-transparent';
   inp.placeholder = 'Create new';
   div.appendChild(inp);
   div.appendChild(document.createElement('br'));

   let but = document.createElement('button');
   but.textContent = 'Add';
   but.addEventListener('click', function(e){
      if(inp.value == ''){
         alert('You need to add a title.');
      } else {
         addToPlaylist(findSong(songId), inp.value)
         addPlaylistsToList();
      }

   })

   div.appendChild(but);

   e.target.parentNode.appendChild(div);

}
 
window.addEventListener('DOMContentLoaded', () => {
   //The reason we made an on content load event listener is so that the content loads before we output anything
   addPlaylistsToList();
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

   if(!jsonData){
      fetch(api).then((response) => response.json())
      .then((data) => {
         localStorage.setItem('songs', JSON.stringify(data));
         for(aSong of data){
            addSongToTable(aSong, '#searchResults');
         }
         window.location.reload(); // Needed to reload the page so that local storage has everything needed
      });
   } else {
      const songs = JSON.parse(jsonData);
      for(aSong of songs){
         addSongToTable(aSong, '#searchResults');
      }
   }
   // } else {
   //    for(song of playlist){
   //       addSongToTable(song, '#playlistResults');
   //    }
   // }

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

   //Creating Chart

   

   

   let credits = document.querySelector('#creditButton');
   let credits2 = document.querySelector('#creditButtonTwo');
   credits.addEventListener('mouseover', () => {
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

   credits2.addEventListener('mouseover', () => {
      let popup = document.querySelector('#credTwo');
      if(popup.style.display == 'block'){
         popup.style.display = 'none';
      } else {
         popup.style.display = 'block';
         setTimeout(()=> {
            popup.style.display = 'none';
         }, '5000');
      }
   });

   // Sorting titles event listner

   var table = document.getElementById("searchSort");
   for (var i = 0, cell; cell = table.cells[i]; i++) {
      cell.addEventListener('click', (e) => {
         sort(e.target.textContent, '#searchResults');
      });
      cell.style.cursor = 'pointer';
   }

   
   let remove = document.querySelector('#removeAllFromPlaylist');
   remove.addEventListener('click', function(){
      alert('Removing all playlist!');
      removeAllPlaylists();
   });

   document.getElementById('removeCurrentPlaylist').addEventListener('click', function (e){
      if(e.target.dataset.playlist == 'none'){
         alert('Please select a playlist first!');
      } else {
         console.log(e.target.dataset.playlist);
         deletePlaylist(e.target.dataset.playlist)
         e.target.dataset.playlist = 'none';
         addPlaylistsToList();
         document.getElementById('playlistResults').innerHTML = '';
      }
   })

});