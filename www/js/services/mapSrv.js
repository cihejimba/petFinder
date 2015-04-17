/**
 * Created by federicomaceachen on 4/16/15.
 */
services.factory('MapSrv', ['$q',
  function($q){

    var initializeMap = function (mapElement, mapOptions) {
      return new google.maps.Map(mapElement, mapOptions);
    };

    var centerOnMe = function (map) {
      var deferred = $q.defer();

      if(!map) {
        return;
      }

      navigator.geolocation.getCurrentPosition(
        function(pos) {
          deferred.resolve(pos);
        },
        function(error) {
          deferred.reject(error);
        }
      );

      return deferred.promise;
    };

    return {
      initializeMap: initializeMap,
      centerOnMe: centerOnMe
    }

  }
]);