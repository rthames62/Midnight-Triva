triviaApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
      templateUrl : 'question.html',
      controller : 'questionCtrl'
  })
  .when('/nextquestion', {
      templateUrl : 'nextQuestion.html',
      controller : 'nextCtrl'
  })
})
