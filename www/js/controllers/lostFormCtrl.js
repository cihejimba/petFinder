/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    ['$scope', 'CameraSrv', '$ionicLoading', '$cordovaToast', '$translate', 'LostPetSrv',
      function($scope, CameraSrv, $ionicLoading, $cordovaToast, $translate, LostPetSrv) {

        $scope.data = {};

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
      }
    ]
);
