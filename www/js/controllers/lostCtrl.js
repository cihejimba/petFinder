/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostCtrl', ['$scope', '$ionicLoading',
  function($scope, $ionicLoading) {

    $scope.lostPets = [
      {
        id: 1,
        image: 'img/no-image.png',
        title: 'Some title',
        description: 'Some description'
      },
      {
        id: 2,
        image: 'img/no-image.png',
        title: 'Some title 2',
        description: 'Some description 2'
      }
    ]

  }
]);
