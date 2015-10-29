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
      scope: {
          local: '='
      },
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ShareboxController($log,feedNowPlaying) {
      var vm = this;
      vm.publish = publish;

      function publish() {
        feedNowPlaying.postTweet(vm.comment,vm.url,vm.local).then(function(){
          vm.publishform.$setPristine();
          vm.comment = '';
          vm.url = '';
        });
      }
    }

  }

})();
