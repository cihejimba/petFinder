/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    [
      '$scope',
      '$window',
      '$timeout',
      '$ionicLoading',
      '$ionicModal',
      '$cordovaToast',
      '$translate',
      'CameraSrv',
      'LostPetSrv',
      'MapSrv',
      function($scope,
               $window,
               $timeout,
               $ionicLoading,
               $ionicModal,
               $cordovaToast,
               $translate,
               CameraSrv,
               LostPetSrv,
               MapSrv) {

        $scope.data = {};

        angular.extend($scope.data, Pet.getDefaults());

        $scope.$on('$ionicView.enter', function () {
          var position = $window.sessionStorage.getItem('lost-form-position');
          if(position) {
            $window.sessionStorage.removeItem('lost-form-position');
          }
        });

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

        function initializeMap() {
          var mapOptions = {
            zoomControl: false,
            streetViewControl: false,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          $scope.map = MapSrv.initializeMap(document.getElementById('mapModal'), mapOptions);

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
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
          // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
          // Execute action
        });


      }
    ]
);
