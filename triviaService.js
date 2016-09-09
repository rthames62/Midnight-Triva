angular.module('triviaApp').service('triviaService', function($http){

  var baseUrl = "https://api.themoviedb.org/3/"
  var apiKey = "&550&api_key=be7c9a53bfd40a5a3d9aa3c4cf99b5c9";

  this.baseUrl = baseUrl;
  this.apiKey = apiKey;
  this.popularMovies = [];
  this.moviesArr = [];
  this.questionsArr = [];
  var popularMovies = [];
  var moviesArr = [];
  var questionsArr = [];

  this.discoverPopularMovies = function(){
    return $http.get(baseUrl + 'discover/movie?sort_by=popularity.desc' + apiKey).then(function(response){
      // return response.data.results;
      var movies = response.data.results;
      // console.log(movies);
      movies.forEach(function(movie){
        popularMovies.push(movie);
        moviesArr.push({
          title : movie.original_title,
          movieImg : "http://image.tmdb.org/t/p/w500" + movie.backdrop_path
        })
      })
      this.popularMovies = popularMovies;
      this.moviesArr = moviesArr;
      return this.popularMovies;
    })
  }

  this.generateMovieObj = function(){
    return $http.get(baseUrl + 'discover/movie?sort_by=popularity.desc' + apiKey).then(function(response){
      // return response.data.results;
      var movies = response.data.results;
      // console.log(movies);
      movies.forEach(function(movie){
        moviesArr.push({
          title : movie.original_title,
          movieImg : "http://image.tmdb.org/t/p/w500" + movie.backdrop_path
        })
      })
      this.moviesArr = generateImageQuestions(moviesArr);

      return this.moviesArr;
    })
  }

  function randomIndex(num){
    return Math.round(Math.random() * (num - 0) + 0);
  };

  function indexCheck(x, y, z, a, callback){
    if(x === y || x === z || x === a) {
      return callback;
    } else {
      return x;
    }
  }

  var generateImageQuestions = function(arr){
    for(var i = 0; i < arr.length; i++){
      var random1 = randomIndex(arr.length - 1);
      var random2 = randomIndex(arr.length - 1);
      var random3 = randomIndex(arr.length - 1);
      var false1 = indexCheck(random1, i, random2, random3, randomIndex(arr.length - 1));
      var false2 = indexCheck(random2, i, random1, random3, randomIndex(arr.length - 1));
      var false3 = indexCheck(random3, i, random1, random2, randomIndex(arr.length - 1));

      // console.log(false3);
      // console.log(arr[false3]["title"]);

      questionsArr.push({
        image : arr[i]["movieImg"],
        correctAnswer : arr[i]["title"],
        falseAnswer1 : arr[false1]["title"],
        falseAnswer2 : arr[false2]["title"],
        falseAnswer3 : arr[false3]["title"]
      })
    }
    return questionsArr;
  }

})
