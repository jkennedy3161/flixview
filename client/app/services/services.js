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

    var postReview = function(type, id, content) {
      return $http({
        method: 'POST',
        url: '/review/' + type + '/' + id,
        data: content
      })
      .then(function(res) {
        return res;
      });
    };

    return {
      getDetails: getDetails,
      getReviews: getReviews,
      postReview: postReview
    };
  })
  .factory('Landing', function($http) {
    var getPopularMovies = function() {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    var getLatestMovies = function() {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    var getUpcomingMovies = function() {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    var getPopularShows = function() {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    var getLatestShows = function() {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/airing_today?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US'
      })
      .then(function(res) {
        return res.data;
      });
    };

    return {
      getPopularMovies: getPopularMovies,
      getLatestMovies: getLatestMovies,
      getUpcomingMovies: getUpcomingMovies,
      getPopularShows: getPopularShows,
      getLatestShows: getLatestShows
    };
  })
  .factory('Results', function($http) {
    var multiSearch = function(query, page) {
      return $http({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/multi?api_key=d4fa18b170e5c465d770c71fe7fef9a6&language=en-US&query=' + query + '&page=' + page
      })
      .then(function(res) {
        return res;
      });
    };
    return {
      multiSearch: multiSearch
    };
  })
  .factory('User', function($http) {
    var checkUser = function(data) {
      $http({
        method: 'POST',
        url: '/user',
        data: data
      });
    };
    return {
      checkUser: checkUser
    };
  })


  .service('authService', authService);

  authService.$inject = ['lock', 'authManager', '$q'];

  function authService(lock, authManager, $q) {
    var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
    var deferredProfile = $q.defer();

    if (userProfile) {
      deferredProfile.resolve(userProfile);
    }

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's id_token and profile
    function logout() {
      deferredProfile = $q.defer();
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = null;
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();

        lock.getProfile(authResult.idToken, function (error, profile) {
          if (error) {
            return console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          deferredProfile.resolve(profile);
        });

      });
    }

    function getProfileDeferred() {
      return deferredProfile.promise;
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      getProfileDeferred: getProfileDeferred
    };
  }