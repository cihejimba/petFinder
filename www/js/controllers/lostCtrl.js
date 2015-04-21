/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostCtrl',
  [
    '$scope',
    '$window',
    '$ionicLoading',
    '$ionicModal',
    'LostPetSrv',
  function($scope,
           $window,
           $ionicLoading,
           $ionicModal,
           LostPetSrv) {

    $scope.sortValues = [
      { label: 'Newest', field: 'date', value: 'descending', group: 'Date' },
      { label: 'Oldest', field: 'date', value: 'ascending', group: 'Date' },
      { label: 'A - Z', field: 'name', value: 'ascending', group: 'Name' },
      { label: 'Z - A', field: 'name', value: 'descending', group: 'Name' }
    ];

    $scope.filterValues = [
      { date: {   }  }
    ];

    $scope.options = {
      page: 0,
      limit: 20,
      count: 0,
      sort: $scope.sortValues[0],
      filter: []
    };

    $scope.noMoreItemsAvailable = false;

    function noMoreDataCanBeLoaded () {
      return $scope.options.page * $scope.options.limit >= $scope.options.count;
    }

    function fetchLostPets() {
      LostPetSrv.fetch($scope.options).then(
        function success(pets) {
          $scope.lostPets.push.apply($scope.lostPets, pets);
          $scope.options.page++;
          $scope.noMoreItemsAvailable = noMoreDataCanBeLoaded();
          $window.sessionStorage.setItem('lost.pets.collection', JSON.stringify(pets));
          $ionicLoading.hide();
        },
        function error() {
          $ionicLoading.hide();
        }
      );
    }

    var initialize = function () {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });

      LostPetSrv.count().then(
        function success(result) {
          $scope.options.count = result;
          LostPetSrv.fetch($scope.options).then(
            function success(pets) {
              $scope.lostPets = pets;
              $scope.options.page++;
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
      fetchLostPets();
    };

    $scope.sort = function () {
      $ionicLoading.show({
        //templateUrl: '../templates/loading.html'
        template: "<ion-spinner class='spinner-calm' icon='lines'></ion-spinner>"
      });
      $scope.options.page = 0;
      $scope.noMoreItemsAvailable = false;
      $scope.lostPets = [];
      fetchLostPets();
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
