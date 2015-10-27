/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nowplaying')
    .constant('toastr', toastr)
    .constant('moment', moment);

})();
