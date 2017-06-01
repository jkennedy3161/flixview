var apiKey = require('../../../server/config/apiKey.js');

angular.module('flixview.services', [])
  .factory('Details', function($http) {
    var getDetails = function (type, id, cb) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + type + '/' + id + '?api_key=' + apiKey.key + '&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    return {
      getDetails: getDetails
    };
  })
  .factory('Landing', function($http) {

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