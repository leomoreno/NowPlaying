(function() {
  'use strict';

  angular
    .module('nowplaying')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $log, toastr, $geolocation, $location) {
    var vm = this;

    activate();

    function activate() {
      getLocation();
    }

    function getLocation() {
      $log.debug("getLocation");
      $geolocation.getCurrentPosition({
          timeout: 60000
       }).then(function(position) {
          vm.myPosition = position;
          // $log.info(position.coords);
          // $log.info(position.coords.latitude);
          // $log.info(position.coords.longitude);
          // TODO: check google API to get city name
          var p = $location.path( "/sf" );
          vm.cityName = "sf";
          $log.info("parent()");
          $log.info(p);
       });
    }
  }
})();
