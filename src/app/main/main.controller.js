(function() {
  'use strict';

  angular
    .module('nowplaying')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, toastr, cityLocator, $location,$window) {
    var vm = this;
    vm.start = start;
    vm.location = null;

    function start() {
      cityLocator.getLocation().then(function(location){
        vm.location = location;
        $location.path( "/"+$window.encodeURIComponent(location.locationName.toLowerCase()));
      },function(){
        $log.error("Error getting location!")
      });
    }
  }
})();
