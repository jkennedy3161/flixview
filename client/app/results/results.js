angular.module('flixview.results', [])
  .controller('ResultsController', function($scope, Results, $routeParams) {
    $scope.results = [];
    $scope.search = $routeParams.search;
    var page = $routeParams.search || 1;
    Results.multiSearch($scope.search, page)
      .then(function(results) {
        $scope.loaded = true;
        $scope.results = results.data.results;
        $scope.totalPages = _.range(1, results.data.total_pages + 1);
        $scope.totalResults = results.data.total_results;
      });
  });