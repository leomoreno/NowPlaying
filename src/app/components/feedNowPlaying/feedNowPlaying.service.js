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
      getFeed: getFeed,
      clearCache: clearCache
    };
    return service;

    function initialize() {
      deferred = $q.defer();
      // clearCache();
      OAuth.initialize(oAuthKey,{cache: true});
      service.authorizationResult = OAuth.create("twitter");
      connect().then(initializeComplete,initializeFailed);
      
      function initializeComplete() {
        deferred.resolve();
      }
      function initializeFailed(error) {
        deferred.reject(error);
      }
      return deferred.promise;
    }
    function clearCache() {
        OAuth.clearCache('twitter');
        service.authorizationResult = false;
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
      if(location && location.latitude && location.longitude){
        url += '?q=%23nowPlaying+youtube&include_entities=true&result_type=recent&count=15&geocode='+location.latitude+','+location.longitude+',50km';
      }else
        url += '?q=%23nowPlaying+youtube&include_entities=true&result_type=recent&count=15';
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
