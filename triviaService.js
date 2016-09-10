triviaApp.service('triviaService', function($http){

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
  var randomPage = generateRandomPage();

  // this.discoverPopularMovies = function(){
  //   return $http.get(baseUrl + 'discover/movie?original_language=en&sort_by=popularity.desc' + apiKey + '&page=' + randomPage).then(function(response){
  //     // return response.data.results;
  //     var movies = response.data.results;
  //     // console.log(movies);
  //     movies.forEach(function(movie){
  //       popularMovies.push(movie);
  //       moviesArr.push({
  //         title : movie.original_title,
  //         movieImg : "http://image.tmdb.org/t/p/w500" + movie.backdrop_path
  //       })
  //     })
  //     this.popularMovies = popularMovies;
  //     this.moviesArr = moviesArr;
  //     return this.popularMovies;
  //   })
  // }

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

  function generateRandomPage(){
    return Math.round(Math.random() * (1000 - 1) + 1);
  }

  function shuffleAnswers(arr){
    for(var i = arr.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr
  }

  function indexCheck(x, y, z, a, callback){
    // console.log(x, y , z, a);
    if(x === y || x === z || x === a) {
      // console.log('reroll', x, y , z, a);
      return callback;
    } else {
      // console.log('good', x, y , z, a);
      return x;
    }
  }

  var generateImageQuestions = function(arr){
    for(var i = 0; i < arr.length; i++){
      var random1 = randomIndex(arr.length - 1);
      // console.log('random1 = ', random1);
      var random2 = randomIndex(arr.length - 1);
      // console.log('random2 = ', random2);
      var random3 = randomIndex(arr.length - 1);
      // console.log('random3 = ', random3);
      var false1 = indexCheck(random1, i, random2, random3, randomIndex(arr.length - 1));
      var false2 = indexCheck(random2, i, random1, random3, randomIndex(arr.length - 1));
      var false3 = indexCheck(random3, i, random1, random2, randomIndex(arr.length - 1));
      var answersArr = [arr[i]["title"], arr[false1]["title"], arr[false2]["title"], arr[false3]["title"]];
      // console.log(random1, random2, random3);

    //   var testing = function() {
    //     if(false1 === false2 || false1 === false3 || false2 === false3) {
    //       return 'UH OH!!!';
    //     } else {
    //       return "we are good";
    //     }
    // }
    // console.log(false1, false2, false3, testing());

      // console.log(false1, false2, false3, testing());
      // console.log(arr[false3]["title"]);

      var shuffledArr = shuffleAnswers(answersArr);

      questionsArr.push({
        image : arr[i]["movieImg"],
        correctAnswer : arr[i]["title"],
        answer1 : shuffledArr[0],
        answer2 : shuffledArr[1],
        answer3 : shuffledArr[2],
        answer4 : shuffledArr[3]
      })
    }
    return questionsArr;
  }

  this.getCorrectAnswer = function(answer, correctAnswer){
    if(answer === correctAnswer) {
      // return location.reload();
      return go('/');
    } else {
      console.log('incorrect')
    }
  }

})
