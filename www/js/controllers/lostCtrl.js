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

    var options = {
      page: 0,
      limit: 10,
      count: 0
    };

    $scope.noMoreItemsAvailable = false;

    function noMoreDataCanBeLoaded () {
      return options.page * options.limit >= options.count;
    }

    var initialize = function () {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });

      LostPetSrv.count().then(
        function success(result) {
          options.count = result;
          LostPetSrv.fetch(options).then(
            function success(pets) {
              $scope.lostPets = pets;
              options.page++;
              $scope.noMoreItemsAvailable = noMoreDataCanBeLoaded();
              $window.sessionStorage.setItem('lost.pets.collection', JSON.stringify(pets));
              $ionicLoading.hide();
            },
            function error() {
              $ionicLoading.hide();
            }
          );
        },
        function error(reason) {

        }
      );
    };

    $scope.loadMore = function () {
      LostPetSrv.fetch(options).then(
        function success(pets) {
          $scope.lostPets.push.apply($scope.lostPets, pets);
          options.page++;
          $scope.noMoreItemsAvailable = noMoreDataCanBeLoaded();
          $window.sessionStorage.setItem('lost.pets.collection', JSON.stringify(pets));
        },
        function error() {
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
