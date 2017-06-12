angular.module('flixview', [
  'flixview.landing',
  'flixview.results',
  'flixview.details',
  'flixview.services',
  'flixview.user',
  'angular-jwt',
  'auth0.lock',
  'ngRoute'
])
.controller('flixviewController', function($scope, $location, authService, $http, User) {
  $scope.searchQuery = '';
  $scope.loggedIn = false;
  $scope.search = function(search) {
    if (search.length < 1) {
      return;
    }
    $location.path('/results/' + search + '/1');
    $scope.searchQuery = '';
  };

  $scope.login = authService.login;
  $scope.logout = function() {
    authService.logout();
    $scope.loggedIn = false;
  };

  // Gets user profile when logged in
  authService.getProfileDeferred()
    .then(function(profile) {
      $scope.profile = profile;
      if (profile) {
        User.checkUser(profile);
        $scope.loggedIn = true;
      }
    });
})
.config(function($routeProvider, $locationProvider, lockProvider, jwtOptionsProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController'
    })
    .when('/results/:search/:page', {
      templateUrl: 'app/results/results.html',
      controller: 'ResultsController'
    })
    .when('/:type/:id', {
      templateUrl: 'app/details/details.html',
      controller: 'DetailsController'
    })
    .when('/user', {
      templateUrl: 'app/user/user.html',
      controller: 'UserController'
    })
    .otherwise('/');

    // Auth0 account info
    lockProvider.init({
      clientID: 'kTgg4bCwSm5p7eDUiqLpc1AVrEG3hcM3',
      domain: 'jkennedy31613.auth0.com'
    });
    // removes # from url
    $locationProvider.html5Mode(true);

    jwtOptionsProvider.config({
      tokenGetter: ['options', function(options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListDomains: ['localhost'],
      unauthenticatedRedirectPath: '/login'
    });
})

.run(function($rootScope, authService, lock, authManager) {
  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = authService;

  // Register the authentication listener that is
  // set up in auth.service.js
  authService.registerAuthenticationListener();

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();

  // Register synchronous hash parser
  lock.interceptHash();
});