/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('NavigationCtrl', ['$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {

    function initialize () {
      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        $scope.fromState = from;
      });
    }

    initialize();

    $scope.navBar = {
      title: 'Pet Finder',
      leftIcon: {
        hide: true
      },
      rightIcon: {
        icon: 'more-vert',
        hide: false
      }
    };

    $scope.back = function () {
      $state.go($scope.fromState.name);
    }

}]);