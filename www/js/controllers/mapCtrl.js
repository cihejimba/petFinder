/**
 * Created by federicomaceachen on 3/9/15.
 */
controllerModule.controller('MapCtrl',
    ['$scope', '$state', '$ionicLoading',
  function($scope, $state, $ionicLoading) {

    function initialize() {
      var mapOptions = {
        zoomControl: false,
        streetViewControl: false,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      $scope.map = map;

      $scope.centerOnMe();
    }

    $scope.centerOnMe = function() {
      if(!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(
          function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            new google.maps.Marker({
              position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
              map: $scope.map,
              icon: 'img/me_marker.png'
            });
            $ionicLoading.hide();
          },
          function(error) {
            alert('Unable to get location: ' + error.message);
          }
      );
    };

    initialize();

}]);
