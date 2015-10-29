(function() {
  'use strict';

  angular
    .module('nowplaying')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, toastr, cityLocator, feedNowPlaying) {
    var vm = this;
    vm.start = start;
    vm.location = location;
    vm.loadFeed = loadFeed;
    vm.feedLength = 0;
    vm.youtube = 'youtube';

    vm.locations = {};
    vm.locations.sf = {locationName: 'San Francisco',latitude:37.759246 , longitude: -122.448595 };
    vm.locations.paris = {locationName: 'Paris',latitude:48.849738 , longitude: 2.356133 };
    vm.locations.global = {locationName: 'World wide',latitude:null , longitude: null };

    function start() {
      feedNowPlaying.initialize().then(function(){
        cityLocator.getLocation().then(
          loadFeed,
          function(error){
            toastr.error(error);
            $log.error("Error getting location!");
          }
        );
      },function(error){
        toastr.error(error);
      });
    }
    function showFeed(feed){
      vm.feed = feed;
      vm.feedLength = vm.feed.statuses.length;
      $timeout(function() {
        twttr.widgets.load();
      }, 300);
    }
    function loadFeed(location){
      if(!vm.locations.local){
        vm.locations.local = location;
      }
      vm.location =location;
      vm.feed = null;
      feedNowPlaying.getFeed(location).then(
        showFeed,
        function(){
          $log.error("Error getting feed!");
        }
      );
    }
  }
})();
