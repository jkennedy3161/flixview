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
      templateUrl: 'app/results/results.html'
    }
  })