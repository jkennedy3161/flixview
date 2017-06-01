angular.module('flixview', [
  'flixview.details',
  'flixview.services',
  'flixview.landing',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    });
});