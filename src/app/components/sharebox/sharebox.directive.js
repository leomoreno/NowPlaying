(function() {
  'use strict';

  angular
    .module('nowplaying')
    .directive('shareBox', shareBox);

  /** @ngInject */
  function shareBox() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sharebox/sharebox.html',
      controller: ShareboxController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;


    /** @ngInject */
    function ShareboxController($log) {
      var vm = this;

      activate();

      function activate() {
        $log.debug("ShareboxController");
        $log.debug(vm);
        //TODO: check login status
        //TODO: provide login button
        //TODO: provide form and methods for link sharing
        // var query = 'https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&geocode='+position.coords.latitude+','+position.coords.longitude+',10km';
        //&since_id=24012619984051000&max_id=25012619984051814
      }
    }

  }

})();
