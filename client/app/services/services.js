angular.module('flixview.services', [])
  .factory('Details', function($http) {
    var getReviews = function(type, id) {
      return $http({
        method: 'GET',
        url: '/review/' + type + '/' + id
      })
      .then(function(res) {
        return res;
      });
    };
    var getDetails = function (type, id, cb) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    return {
      getDetails: getDetails,
      getReviews: getReviews
    };
  })
  .factory('Landing', function($http) {

  })
  .factory('Results', function($http) {
    var multiSearch = function(query) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US&query=' + query
      })
      .then(function(res) {
        return res;
      });
    };
    return {
      multiSearch: multiSearch
    };
  });