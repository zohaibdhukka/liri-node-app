require("dotenv").config();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);
var Spotify = require('node-spotify-api');
var input = process.argv.splice(2).join(" ");

//MOVIE DATA
// axios.get("http://www.omdbapi.com/?t="+ input +"&y=&plot=short&apikey=trilogy").then(
//   function(response) {
//     console.log(response);
//   }
// );

//BANDS IN TOWN
// axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then (
    
    
//     function(res){
//         for(var i = 0; i < res.data.length; i++){

//             console.log("Venue: " + res.data[i].venue.name + " Location: " + res.data[i].venue.country +", " + res.data[i].venue.city + " Venue Date: " + res.data[i].datetime);
//         }
//     }
// )

//SPOTIFY
spotify.search({ type: 'track', query: input }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });