(function() {
  'use strict';

  angular
    .module('nowplaying')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('index runBlock end');
  }

})();
