angular.module('flixview', [
  'flixview.landing',
  'flixview.results',
  'flixview.details',
  'flixview.services',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results', {
      templateUrl: 'app/results/results.html',
      controllerAs: 'context',
      controller: 'ResultsController'
    });
});