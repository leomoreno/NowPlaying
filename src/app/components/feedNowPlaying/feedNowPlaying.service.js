/* global OAuth:false*/
(function() {
  'use strict';

  angular
    .module('nowplaying')
    .factory('feedNowPlaying', feedNowPlaying);

  /** @ngInject */
  function feedNowPlaying($log, $q, $http, oAuthKey) {
    var apiHost = 'https://api.twitter.com/1.1/search/tweets.json';
    var deferred = null;

    var service = {
      initialize: initialize,
      getFeed: getFeed
    };
    return service;

    function initialize() {
      deferred = $q.defer();
      OAuth.initialize(oAuthKey,{cache: true});
      service.authorizationResult = OAuth.create("twitter");
      connect().then(initializeComplete,initializeFailed);
      
      function initializeComplete() {
        deferred.resolve();
      }
      function initializeFailed(error) {
        $log.error('Error connecting to oAuth.io.'+error);
        deferred.reject();
      }

    }
    function connect() {
        var deferred = $q.defer();
        OAuth.popup('twitter',{cache: true})
            .done(function(result) {
              service.authorizationResult = result;
              deferred.resolve();
            })
            .fail(function (err) {
              $log.error('Error connecting to Twitter\n'+err);
              deferred.reject(err);
        });
        return deferred.promise;
    }
    function getFeed(location,maxId) {
      var deferred = $q.defer();
      var url = '/1.1/search/tweets.json';
      url += '?q=%23nowPlaying&include_entities=true&geocode='+location.latitude+','+location.longitude+',1mi';
      if (maxId) {
          url += '&max_id=' + maxId;
      }
      service.authorizationResult.get(url).done(function(data) {
          deferred.resolve(data);
      }).fail(function(err) {
          $log.error('XHR Failed for getFeed.\n' + angular.toJson(err, true));
          deferred.reject(err);
      });
      return deferred.promise;
    }
  }
})();
