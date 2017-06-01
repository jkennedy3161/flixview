var apiKey = require('../../../server/config/apiKey.js');

angular.module('flixview.results', [])
  .controller('ResultsController', function(Results) {
    var context = this;
    context.searchQuery = "Jurassic Park";
    context.results = [];

    context.getResults = function(searchQuery) {
      Results.multiSearch(searchQuery)
        .then(function(results) {
          console.log(results);
          context.results = results.data.results;
        });
    };
    context.getDefaultResults = function() {
      context.getResults(context.searchQuery);
    }
  })
  .directive('searchResult', function() {
    return {
      restrict: 'EA',
      scope: {
        source: '='
      },
      templateUrl: 'app/results/searchResult.html'
    }
  })
  .factory('Results', function($http) {
    var multiSearch = function(query) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi?api_key=' + apiKey.key + '&language=en-US&query=' + query
      })
      .then(function(res) {
        return res;
      });
    };
    return {
      multiSearch: multiSearch
    };
  });