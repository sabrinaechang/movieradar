base_urlTD = "https://tastedive.com/api/similar?"; //base url, resets to default
base_urlDB = "https://api.themoviedb.org/3";

//empty arrays
var TotalMovies = [];
var TotalMoviesDes = [];
var TotalReleases = [];
var description = '';
var query;
var genres = {};
var myGenres = {};
var newGenres = [];

function displayInput() {
  query = document.getElementById("movie").value;
  query = checkQuery(query);
  generateLink(query);
  
}

function firstMovie(){
  document.getElementById("first-movie-title").innerHTML = TotalMovies[0].Name;
  document.getElementById("first-movie-description").innerHTML = TotalMoviesDes[0];
}

function secondMovie(){
  document.getElementById("second-movie-title").innerHTML = TotalMovies[1].Name;
  document.getElementById("second-movie-description").innerHTML = TotalMoviesDes[1];
}

function thirdMovie(){
  document.getElementById("third-movie-title").innerHTML = TotalMovies[2].Name;
  document.getElementById("third-movie-description").innerHTML = TotalMoviesDes[2];
}

function fourthMovie(){
  document.getElementById("fourth-movie-title").innerHTML = TotalMovies[3].Name;
  document.getElementById("fourth-movie-description").innerHTML = TotalMoviesDes[3];
}

function fifthMovie(){
  document.getElementById("fifth-movie-title").innerHTML = TotalMovies[4].Name;
  document.getElementById("fifth-movie-description").innerHTML = TotalMoviesDes[4];
}

function sixthMovie(){
  document.getElementById("sixth-movie-title").innerHTML = TotalMovies[5].Name;
  document.getElementById("sixth-movie-description").innerHTML = TotalMoviesDes[5];
}

function seventhMovie(){
document.getElementById("seventh-movie-title").innerHTML = TotalMovies[6].Name;
  document.getElementById("seventh-movie-description").innerHTML = TotalMoviesDes[6];
}

function eighthMovie(){
  document.getElementById("eighth-movie-title").innerHTML = TotalMovies[7].Name;
  document.getElementById("eighth-movie-description").innerHTML = TotalMoviesDes[7];
}

function ninthMovie(){
  document.getElementById("ninth-movie-title").innerHTML = TotalMovies[8].Name;
  document.getElementById("ninth-movie-description").innerHTML = TotalMoviesDes[8];
}

function tenthMovie(){
  document.getElementById("tenth-movie-title").innerHTML = TotalMovies[9].Name;
  document.getElementById("tenth-movie-description").innerHTML = TotalMoviesDes[9];
}

function clearResults(){
  document.getElementById("first-movie-title").innerHTML = "";
  document.getElementById("second-movie-title").innerHTML = "";
  document.getElementById("third-movie-title").innerHTML = "";
  document.getElementById("fourth-movie-title").innerHTML = "";
  document.getElementById("fifth-movie-title").innerHTML = "";
  document.getElementById("sixth-movie-title").innerHTML = "";
  document.getElementById("seventh-movie-title").innerHTML = "";
  document.getElementById("eighth-movie-title").innerHTML = "";
  document.getElementById("ninth-movie-title").innerHTML = "";
  document.getElementById("tenth-movie-title").innerHTML = "";
  document.getElementById("first-movie-description").innerHTML = "";
  document.getElementById("second-movie-description").innerHTML = "";
  document.getElementById("third-movie-description").innerHTML = "";
  document.getElementById("fourth-movie-description").innerHTML = "";
  document.getElementById("fifth-movie-description").innerHTML = "";
  document.getElementById("sixth-movie-description").innerHTML = "";
  document.getElementById("seventh-movie-description").innerHTML = "";
  document.getElementById("eighth-movie-description").innerHTML = "";
  document.getElementById("ninth-movie-description").innerHTML = "";
  document.getElementById("tenth-movie-description").innerHTML = "";
  var arr = [];
  TotalMovies = arr;
}

function checkQuery(query){
  return query.replace(/ /g, "+"); //replace all spaces in the query with +'s
}

function generateLink(query){
  base_urlTD += "q=" + query + "&k=" + "279226-GirlsWho-1QJL3YMH";
  setTasteDiveArray();
  resetUrlTD();
}

function generateLink_info(movieid){
  base_urlDB += "/movie/" + movieid + "?" + "api_key=24d5e7488dd99842eb1fb8a89a8016d9" + "&language=en-US";
  setMDBArray();
  resetUrlMDB();
}

function generateLink_now(query){
  //1.http://api.themoviedb.org/3/search/movie?api_key=24d5e7488dd99842eb1fb8a89a8016d9&query=up
  //get id
  //http://api.themoviedb.org/3/movie/14160?api_key=24d5e7488dd99842eb1fb8a89a8016d9
  base_urlDB += "/movie/" + "now_playing?" + "api_key=24d5e7488dd99842eb1fb8a89a8016d9";
  setMDBArray();
  resetUrlMDB();
}




function setTasteDiveArray(){
  $.ajax({
    type: 'GET',
    url: base_urlTD,
    dataType:'json',
    crossDomain: true,

    success: function(data){

      for (var index = 0; index < 10; index++){
        TotalMovies.push(data.Similar.Results[index]);
        console.log("Found movie " + index);
      }
    }
  });

  //getting genre of current selection
  $.ajax({
    type: 'GET',
    url: "https://api.themoviedb.org/3/search/movie?api_key=24d5e7488dd99842eb1fb8a89a8016d9&query=" + query, ///change to call movie db about our query movie
    dataType:'json',
    crossDomain: true,

    success: function(data){

    //  for (var i = 0; i < data.results.length; i++){
        myGenres = (data.results[0].genre_ids);
    //  }
      console.log(myGenres);
      console.log();
      }

  });
}

function getNewGenres(){ //getting all the new movie's genres
  $.ajax({
    type: 'GET',
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=24d5e7488dd99842eb1fb8a89a8016d9",
    dataType:'json',
    crossDomain: true,

    success: function(data){
      console.log(data);
    //  var result = JSON.parse(data);
  //  console.log(data.genres[2]);
  console.log("new genres: ");
      for (var i = 0; i < 10; i++){
        var temp = [];
        temp.push(data.results[i].title);
        temp.push(data.results[i].genre_ids);
        newGenres.push(temp);
      }

      for (var i = 0; i < newGenres.length; i++){
        console.log(newGenres[i]['1']); //access the keys of the newgenres
      }
    }
  });
  compareMovieID();
}
  //same thing as getgenres, but store key as now playing movie title, value as genre ids

function containsID(){

}

function compareMovieID(){
  console.log("comparing movies");
  for (var i = 0; i < newGenres.length; i++){
    console.log(newGenres[i]['1']);
  }
}

function getGenres(){ //getting all of the types of genres
  $.ajax({
    type: 'GET',
    url: "https://api.themoviedb.org/3/genre/movie/list?api_key=24d5e7488dd99842eb1fb8a89a8016d9",
    dataType:'json',
    crossDomain: true,

    success: function(data){

    //  var result = JSON.parse(data);
  //  console.log(data.genres[2]);
      for (var i = 0; i < data.genres.length; i++){
      //  console.log("test");
        genres[data.genres[i].id] = data.genres[i].name;
      }
       console.log(genres);
      // console.log(genres['12'])
    }
  });
  getNewGenres();
}




function getMovieInfo(){
  for (var i = 0; i < 10; i++){
    base_urlDB = "https://api.themoviedb.org/3";
    base_urlDB += "/search/movie?api_key=24d5e7488dd99842eb1fb8a89a8016d9&query=" + TotalMovies[i].Name;

  //console.log(base_urlDB);
    $.ajax({
      type: 'GET',
      url: base_urlDB,
      dataType:'json',
      crossDomain: true,

      success: function(data){
        console.log(data);
      //  console.log("im reaading data!!!");
    //    console.log(data);
        //console.log(data.results[0].overview);
      var  description = data.results[0].overview;
      var release_date = data.results[0].release_date;
      console.log("release date is: " + release_date);
        TotalMoviesDes.push(description);
        if (base_urlDB = "https://api.themoviedb.org/3/search/movie?api_key=24d5e7488dd99842eb1fb8a89a8016d9&query=" + TotalMovies[9].Name){

  console.log(TotalMoviesDes);
  firstMovie();
  secondMovie();
  thirdMovie();
  fourthMovie();
  fifthMovie();
  sixthMovie();
  seventhMovie();
  eighthMovie();
  ninthMovie();
  tenthMovie();
  //http://api.themoviedb.org/3/search/movie?api_key=24d5e7488dd99842eb1fb8a89a8016d9&query=up
}
}
})
}
} // end of the for loop}



function resetUrlTD(){
  base_urlTD = "https://tastedive.com/api/similar?";
}

function resetUrlMDB(){
  base_urlDB = "https://api.themoviedb.org/3";
}
