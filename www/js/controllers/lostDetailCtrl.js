/**
 * Created by federicomaceachen on 3/20/15.
 */
controllerModule.controller('LostDetailCtrl', [
  '$scope',
  '$window',
  '$stateParams',
  '$ionicLoading',
  function($scope,
           $window,
           $stateParams,
           $ionicLoading) {

    function initialize() {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });

      var LostPets = Parse.Collection.extend({ model: Pet }),
        pets = new LostPets(JSON.parse($window.sessionStorage.getItem('lost.pets.collection')));
      $scope.pet = pets.get($stateParams.lostPetId);
      $ionicLoading.hide();
    }

    initialize();
  }
]);
