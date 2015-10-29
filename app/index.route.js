(function() {
  'use strict';

  angular
    .module('nowplaying')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/:cityName', {
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedController',
        controllerAs: 'feed'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  }

})();
