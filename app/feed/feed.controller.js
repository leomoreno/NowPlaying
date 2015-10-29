(function() {
  'use strict';

  angular
    .module('nowplaying')
    .controller('FeedController', FeedController);

  /** @ngInject */
  function FeedController($log, toastr, $routeParams) {
    var vm = this;
    
    activate();

    function activate() {
      vm.cityName = $routeParams.cityName;
    }

  }
})();
