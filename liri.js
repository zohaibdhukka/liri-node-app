require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var input = process.argv.splice(3).join(" ");
var command = process.argv[2];
var fs = require("fs");

switch(command){
    case "concert-this":
    bandsIntown();
    break;

    case "spotify-this-song":
    spotifyFunction();
    break;

    case "movie-this":
    movieData();
    break;

    case "do-what-it-says":
    doWhatitSays();
    break;

}
//MOVIE DATA
function movieData(){

    if (!input){
        input = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t="+ input +"&y=&plot=short&apikey=trilogy").then(
        
          function(response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log(response.data.Ratings[0].Source + ": " + response.data.Ratings[0].Value);
                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
              }
            );
            
        }
        //BANDS IN TOWN
        function bandsIntown(){
            if(!input){
                input = "Wiz Khalifa"
            }
            axios.get("https://rest.bandsintown.com/artists/" + input + "/events/?app_id=codingbootcamp&date=upcoming").then (
                
                
                    function(res){
                            for(var i = 0; i < res.data.length; i++){
                        
                                    console.log("Venue: " + res.data[i].venue.name + " Location: " + res.data[i].venue.city +", " + res.data[i].venue.country + " Venue Date: " + res.data[i].datetime);
                                }
                            }
                        )
                        
                        
        }
        //SPOTIFY          
        function spotifyFunction(){

            var spotify = new Spotify(keys.spotify);
            if (!input){
                input = "The Sign"
            }

                spotify.search({ type: 'track', query: input }, function(err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                }
                var artistsName = data.tracks.items[0].album.artists[0].name; 
                var albumName = data.tracks.items[0].album.name;
                var previewUrl = data.tracks.items[0].preview_url;
                
                console.log(" Artist: " + artistsName);
                console.log(" Album: " + albumName );
                console.log(" Song: " + input);
                console.log(" Preview Url: " + previewUrl);
            });
        
        }  

        function doWhatitSays(){
                if (!input){
                    fs.readFile("random.txt", "utf8", function(err, data){
                        if (err){
                            console.log(err);
                        
                        }
                        var randomSelect = data.split(",");
                        command = randomSelect[0];
                        input = randomSelect[1];
                        // console.log(randomSelect[0]);
                        spotifyFunction();
                    })
                }

        }