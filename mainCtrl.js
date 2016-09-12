triviaApp.controller('mainCtrl', function($scope, triviaService){

  $scope.popularMovies = [];
  $scope.moviesArr = [];
  $scope.moviesNextArr = [];
  $scope.imgUrl = "http://image.tmdb.org/t/p/w500/";
  $scope.answer = "answer";
  $scope.streak = 0;
  $scope.lives = 3;

  $scope.correctAnswer = function(answer, correctAnswer) {
    $scope.answer = triviaService.answer;
    $scope.inputAnswer = triviaService.getCorrectAnswer(answer, correctAnswer);
    $scope.updateLives($scope.inputAnswer);

    triviaService.generateNextMovieObj().then(function(movies){
      // $scope.moviesNextArr = [];
      var randomQuestion = generateRandomQuestion(movies.length);
      $scope.moviesNextArr = movies;
      $scope.nextMovieQuestion = $scope.moviesNextArr[randomQuestion];
      // console.log($scope.moviesNextArr);
    })
  }

  triviaService.generateMovieObj().then(function(movies){
    var randomQuestion = generateRandomQuestion(movies.length);
    $scope.moviesArr = movies;
    $scope.movieQuestion = $scope.moviesArr[randomQuestion];
  })

  generateRandomQuestion = function(num){
    return Math.round(Math.random() * (num - 0) + 0);
  }

  $scope.updateLives = function(x) {
        if(x == true) {
          $scope.streak += 1;
          return location.href = '#/nextquestion';
        } else {
          if($scope.lives > 1) {
            $scope.lives -= 1;
            return location.href = '#/nextquestion';
          } else {
            $scope.lives = 3;
            $scope.streak = 0;
            alert('you suck, try again');
            return location.href = '#/';
          }
        }
  }

})

triviaApp.controller('questionCtrl', function($scope, triviaService){
  $scope.test = "This is the question page";
})

triviaApp.controller('nextCtrl', function($scope, triviaService){
  $scope.test = "This is the next question page";
})
