/**
 * Created by federicomaceachen on 3/9/15.
 */
controllerModule.controller('MapCtrl',
    [
      '$scope',
      '$timeout',
      '$ionicLoading',
      'MapSrv',
  function($scope,
           $timeout,
           $ionicLoading,
           MapSrv) {

    $scope.$on('$ionicView.afterEnter', function(){
      // Hack to fix google map breaking after opening a second map in a different view.
      if($scope.map) google.maps.event.trigger($scope.map, 'resize');
    });

    function initialize() {
      var mapOptions = {
        zoomControl: false,
        streetViewControl: false,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = MapSrv.initializeMap(document.getElementById('map'), mapOptions);

      $scope.centerOnMe();
    }

    $scope.centerOnMe = function() {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });

      MapSrv.centerOnMe($scope.map).then(
        function success(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: $scope.map,
            icon: 'img/me_marker.png'
          });
          $ionicLoading.hide();
        },
        function error(reason) {
          $ionicLoading.hide();
          console.log(reason);
        }
      );
    };

    ionic.Platform.ready(function(){
      $timeout(function () {
        // in my case
        initialize();
        // OR this case:
        google.maps.event.trigger($scope.map, 'resize');
      });
    });
}]);
