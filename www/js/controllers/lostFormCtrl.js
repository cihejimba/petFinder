/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    ['$scope', 'CameraSrv', '$ionicLoading', '$cordovaToast', 'LostPetSrv',
      function($scope, CameraSrv, $ionicLoading, $cordovaToast, LostPetSrv) {

        $scope.data = {};

        angular.extend($scope.data, Pet.getDefaults());

        $scope.saveLostPet = function (data) {
          $ionicLoading.show({
            templateUrl: '../templates/loading.html'
          });

          LostPetSrv.save(data).then(
            function (result) {
              $ionicLoading.hide();
              //$cordovaToast.showShortBottom('Pet saved.');
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
