(function() {
  'use strict';

  angular
    .module('nowplaying')
    .factory('cityLocator', cityLocator);

  /** @ngInject */
  function cityLocator($log, $q, $http, $geolocation) {
    var apiHost = 'http://maps.googleapis.com/maps/api/geocode/json?sensor=true&';
    var deferred = null;

    var service = {
      apiHost: apiHost,
      getLocation: getLocation
    };
    return service;

    function getLocation() {
      deferred = $q.defer();
      $geolocation.getCurrentPosition({
          timeout: 60000
       }).then(function(position) {
          position = position;
          getLocationDetails(position);
       }, function(reason) {
          $log.debug('Failed: ' + reason);
       });

       return deferred.promise;
    }
    function getLocationDetails(position) {
      return $http.get(apiHost + 'latlng='+position.coords.latitude+','+position.coords.longitude)
        .then(getLocationComplete)
        .catch(getLocationFailed);

      function getLocationComplete(response) {
        angular.forEach(response.data.results[0].address_components, function(i){
          if(i.types[0] && i.types[0] === 'administrative_area_level_1'){
            $log.debug(i.long_name);
            var location = {'locationName': i.long_name,'latitude':position.coords.latitude,'longitude':position.coords.longitude };
            deferred.resolve(location);
          }
        });
        return response.data;
      }

      function getLocationFailed(error) {
        $log.error('XHR Failed for getLocation.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
