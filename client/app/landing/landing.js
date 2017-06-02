angular.module('flixview.landing', [])
  .controller('LandingController', function($scope, Landing) {
    $scope.popularMovies = [];
    $scope.latestMovies = [];
    $scope.upcomingMovies = {};
    $scope.popularShows = [];
    $scope.latestShows = [];

    $scope.fetchPopularMovies = function() {
      Landing.getPopularMovies()
        .then(function(data) {
          $scope.popularMovies = data.results;
        });
    };

    $scope.fetchLatestMovies = function() {
      Landing.getLatestMovies()
        .then(function(data) {
          $scope.latestMovies = data.results;
        });
    };

    $scope.fetchUpcomingMovies = function() {
      Landing.getUpcomingMovies()
        .then(function(data) {
          $scope.upcomingMovies = data.results;
        });
    };

    $scope.fetchPopularShows = function() {
      Landing.getPopularShows()
        .then(function(data) {
          $scope.popularShows = data.results;
        });
    };

    $scope.fetchLatestShows = function() {
      Landing.getLatestShows()
        .then(function(data) {
          $scope.latestShows = data.results;
        });
    };
  });