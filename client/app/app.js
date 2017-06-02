angular.module('flixview', [
  'flixview.landing',
  'flixview.results',
  'flixview.details',
  'flixview.services',
  'ngRoute'
])
.controller('flixviewController', function($scope, $location) {
  $scope.searchQuery = '';
  $scope.search = function(search) {
    if (search.length < 1) {
      return;
    }
    $location.path('/results/' + search + '/1');
    $scope.searchQuery = '';
  };
})
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results/:search/:page', {
      templateUrl: 'app/results/results.html',
      controllerAs: 'context',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controllerAs: 'context',
      controller: 'DetailsController'
    });
    // removes # from url
    $locationProvider.html5Mode(true);
});