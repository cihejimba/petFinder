/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostCtrl',
  [
    '$scope',
    '$window',
    '$ionicLoading',
    'LostPetSrv',
  function($scope,
           $window,
           $ionicLoading,
           LostPetSrv) {

    var initialize = function () {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });

      LostPetSrv.fetch().then(
        function success(pets) {
          $scope.lostPets = pets;
          $window.sessionStorage.setItem('lost.pets.collection', JSON.stringify(pets));
          $ionicLoading.hide();
        },
        function error() {
          $ionicLoading.hide();
        }
      );
    };

    $scope.getTitle = function (pet) {
      return pet.get('name') + ' is lost.';
    };

    $scope.getDescription = function (pet) {
      return 'Lost in ' + pet.get('neighborhood') + ', ' + pet.get('locality');
    };

    $scope.getLostDate = function (pet) {
      return pet.get('date');
    };

    initialize();
  }
]);
