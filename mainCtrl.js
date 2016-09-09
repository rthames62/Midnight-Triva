angular.module('triviaApp').controller('mainCtrl', function($scope, triviaService){

  $scope.popularMovies = [];
  $scope.moviesArr = [];
  $scope.imgUrl = "http://image.tmdb.org/t/p/w500/";

  triviaService.discoverPopularMovies().then(function(movies){
    $scope.popularMovies = movies;
  })

  triviaService.generateMovieObj().then(function(movies){
    var randomQuestion = generateRandomQuestion(movies.length);
    $scope.moviesArr = movies;
    $scope.movieQuestion = $scope.moviesArr[randomQuestion];
    // console.log(generateRandomQuestion(movies.length));
  })

  generateRandomQuestion = function(num){
    return Math.round(Math.random() * (num - 0) + 0);
  }

})
