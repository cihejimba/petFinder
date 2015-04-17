/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    [
      '$scope',
      '$timeout',
      '$ionicLoading',
      '$ionicModal',
      '$cordovaToast',
      '$translate',
      'CameraSrv',
      'LostPetSrv',
      'MapSrv',
      function($scope,
               $timeout,
               $ionicLoading,
               $ionicModal,
               $cordovaToast,
               $translate,
               CameraSrv,
               LostPetSrv,
               MapSrv) {

        var LOST_FORM_POSITION_KEY = 'lost-form-position',
          STATIC_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=200x200&center=';


        $scope.data = {};
        //
        $scope.mapUrl = '';

        angular.extend($scope.data, Pet.getDefaults());

        $scope.saveLostPet = function (data) {
          $ionicLoading.show({
            templateUrl: '../templates/loading.html'
          });

          LostPetSrv.save(data).then(
            function (result) {
              $ionicLoading.hide();
              $translate('GENERIC.SAVED').then(function (translation) {
                $cordovaToast.showShortBottom(translation);
              });
              angular.extend($scope.data, Pet.getDefaults());
            },
            function (reason) {
              $ionicLoading.hide();
            }
          );
        };

        $scope.getPhoto = function(type) {
          var promise = CameraSrv.takePicture(type);
          promise.then(
              function(imageData) {
                $scope.data.image = imageData;
              },
              function(error) {
                $scope.error = {
                  title: 'ERROR',
                  text: error
                };
              }
          );
        };

        $scope.removePosition = function () {
          delete $scope.data.position;
        };

        function initializeMap() {
          var mapOptions = {
            zoomControl: false,
            streetViewControl: false,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = MapSrv.initializeMap(document.getElementById('mapModal'), mapOptions);

          google.maps.event.addListener($scope.map, 'click', function(event) {
            $scope.data.position = event.latLng;
            var latLong = event.latLng.lat() + ',' + event.latLng.lng();
            $scope.mapUrl = STATIC_MAP_URL + latLong;
            $scope.mapUrl += '&markers=color:red|' + latLong;
            $scope.closeModal();
          });

          $scope.centerOnMe();
        }

        $scope.centerOnMe = function() {
          $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
          });

          MapSrv.centerOnMe($scope.map).then(
            function success(pos) {
              $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $ionicLoading.hide();
            },
            function error(reason) {
              $ionicLoading.hide();
              console.log(reason);
            }
          );
        };

        $scope.openModal = function() {
          if(!$scope.modal) {
            $ionicModal.fromTemplateUrl('./templates/map-modal.html', {
              scope: $scope,
              animation: 'slide-in-up'
            }).then(function (modal) {
              $scope.modal = modal;
              $scope.modal.show().then(function () {
                ionic.Platform.ready(function () {
                  $timeout(function () {
                    // in my case
                    initializeMap();
                    // OR this case:
                    google.maps.event.trigger($scope.map, 'resize');
                  });
                });
              });
            });
          } else {
            $scope.modal.show();
          }
        };
        $scope.closeModal = function() {
          $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
          $scope.modal.remove();
        });
      }
    ]
);
