(function() {
  'use strict';

  angular
    .module('nowplaying')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, toastr, cityLocator, feedNowPlaying, $location,$window) {
    var vm = this;
    vm.start = start;
    vm.location = null;

    function start() {
      cityLocator.getLocation().then(
        loadFeed,
        function(){
          $log.error("Error getting location!");
        }
      );
    }
    function showFeed(feed){
      vm.feed = feed;
    }
    function loadFeed(location){
      vm.location = location;
      feedNowPlaying.initialize();
      feedNowPlaying.getFeed(location).then(
        showFeed,
        function(){
          $log.error("Error getting feed!");
        }
      );
    }
  }
})();
