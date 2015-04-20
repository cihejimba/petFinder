/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    [
      '$scope',
      '$filter',
      '$timeout',
      '$ionicLoading',
      '$ionicModal',
      '$cordovaToast',
      '$cordovaDatePicker',
      '$translate',
      'CameraSrv',
      'LostPetSrv',
      'MapSrv',
      function($scope,
               $filter,
               $timeout,
               $ionicLoading,
               $ionicModal,
               $cordovaToast,
               $cordovaDatePicker,
               $translate,
               CameraSrv,
               LostPetSrv,
               MapSrv) {

        var STATIC_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=200x200&center=';

        $scope.device = {
          isAndroid: ionic.Platform.isAndroid(),
          isIOS: ionic.Platform.isIOS()
        };

        $scope.data = {};
        //
        $scope.mapUrl = '';

        angular.extend($scope.data, Pet.getDefaults());

        $scope.saveLostPet = function (data) {
          $ionicLoading.show({
            //templateUrl: '../templates/loading.html',
            template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
          });

          var _this = this;
          LostPetSrv.save(data).then(
            function (result) {
              $ionicLoading.hide();
              $translate('GENERIC.SAVED').then(function (translation) {
                $cordovaToast.showShortBottom(translation);
              });
              angular.extend($scope.data, Pet.getDefaults());
              _this.lostForm.$setPristine();
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

        $scope.showDatePicker = function () {
          var options = {
            date: new Date(),
            mode: 'date', // or 'time'
            maxDate: ionic.Platform.isAndroid() ? new Date().valueOf() : new Date(),
            allowOldDates: true,
            allowFutureDates: false
          };

          $cordovaDatePicker.show(options).then(function(date){
            $scope.data.date = $filter('date')(date, 'shortDate');
          });

        };

        $scope.removeLocation = function () {
          delete $scope.data.location;
          $scope.data.neighborhood = '';
          $scope.data.locality = '';
          $scope.data.country = '';
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
            $scope.data.location = new Parse.GeoPoint({latitude: event.latLng.lng(), longitude: event.latLng.lat()});
            var latLong = event.latLng.lat() + ',' + event.latLng.lng();
            $scope.mapUrl = STATIC_MAP_URL + latLong;
            $scope.mapUrl += '&markers=color:red|' + latLong;
            fillFormData(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
            $scope.closeModal();
          });

          $scope.centerOnMe();
        }

        var fillFormData = function (latlng) {
          var geoCoder = new google.maps.Geocoder();
          geoCoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var location = results[1];
              if (location) {
                angular.forEach(location.address_components, function(value, key) {
                  if(value.types.indexOf('neighborhood') !== -1) {
                    $scope.data.neighborhood = value.long_name;
                  } else if(value.types.indexOf('locality') !== -1) {
                    $scope.data.locality = value.long_name;
                  } else if(value.types.indexOf('country') !== -1) {
                    $scope.data.country = value.long_name;
                  }
                });
                $scope.$apply();
              }
            } else {
              alert("Geocoder failed due to: " + status);
            }
          });
        };

        $scope.centerOnMe = function() {
          $ionicLoading.show({
            //templateUrl: '../templates/loading.html'
            template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
          });

          MapSrv.centerOnMe($scope.map).then(
            function success(pos) {
              var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
              $scope.map.setCenter(latlng);
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
                    initializeMap();
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
