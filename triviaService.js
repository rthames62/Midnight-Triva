triviaApp.service('triviaService', function($http){

  var baseUrl = "https://api.themoviedb.org/3/"
  var apiKey = "&550&api_key=be7c9a53bfd40a5a3d9aa3c4cf99b5c9";

  this.baseUrl = baseUrl;
  this.apiKey = apiKey;
  this.popularMovies = [];
  this.moviesArr = [];
  this.questionsArr = [];
  this.streak = 0;
  this.lives = 3;
  var popularMovies = [];
  var moviesArr = [];
  var questionsArr = [];
  var randomPage = generateRandomPage();
  var random1 = 0;
  var random2 = 0;
  var random3 = 0;
  var randomsArr = [];

  this.generateMovieObj = function(){
    return $http.get(baseUrl + 'discover/movie?sort_by=popularity.desc' + apiKey).then(function(response){
      var movies = response.data.results;
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

  function indexCheck(len, index){
    randomsArr = [];
    random1 = randomIndex(len);
    random2 = randomIndex(len);
    random3 = randomIndex(len);
    // console.log(random1, random2, random3, index);
    if(random1 === random2 || random1 === random3 || random2 === random3 || random1 === index || random2 === index || random3 === index) {
      return indexCheck(len, index);
    } else if (isNaN(random1) === false || isNaN(random2) === false || isNaN(random3) === false) {
        randomsArr.push(random1);
        randomsArr.push(random2);
        randomsArr.push(random3);
        return randomsArr;
    }
  }

  var generateImageQuestions = function(arr){
    for(var i = 0; i < arr.length; i++){
      // var random1 = randomIndex(arr.length - 1);
      // var random2 = randomIndex(arr.length - 1);
      // var random3 = randomIndex(arr.length - 1);
      var allFalsesArr = indexCheck(arr.length - 1, i);
      // console.log(allFalsesArr);
      var false1 = allFalsesArr[0];
      var false2 = allFalsesArr[1];
      var false3 = allFalsesArr[2];
      var answersArr = [arr[i]["title"], arr[false1]["title"], arr[false2]["title"], arr[false3]["title"]];
      // console.log(random1, random2, random3);

      var testing = function() {
        if(false1 === false2 || false1 === false3 || false2 === false3) {
          return 'UH OH!!!';
        } else {
          return "we are good";
        }
    }
    console.log(false1, false2, false3, testing());

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
      this.streak += 1;
      console.log(this.streak);
      return true;
    } else {
      return false;
    }
  }

})
