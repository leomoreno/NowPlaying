/* global toastr:false, OAuth:false, moment:false */
(function() {
  'use strict';

  angular
    .module('nowplaying')
    .constant('toastr', toastr)
    .constant('OAuth', OAuth)
    .constant('tUser', 'dev+biplaying@bunnyinc.com')
    .constant('tUsername', 'BInowplaying')
    .constant('tKey', 'gEFEbGdkVTDfzVgyiiCbzUImi')
    .constant('oAuthKey', '80l_rz7SK-Vx2N-D938yl2A3FOw')
    .constant('moment', moment);

})();
