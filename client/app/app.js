angular.module('flixview', [
  'flixview.landing',
  'flixview.results',
  'flixview.details',
  'flixview.services',
  'ngRoute'
])
.controller('flixviewController', function($scope, $location) {
  $scope.search = function(search) {
    $location.path('/results/' + search);
  };
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results/:search', {
      templateUrl: 'app/results/results.html',
      controllerAs: 'context',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controllerAs: 'context',
      controller: 'DetailsController'
    });
});