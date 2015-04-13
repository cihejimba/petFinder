/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('FoundFormCtrl',
    ['$scope',
      function($scope) {
        $scope.data = {};

        $scope.getPhoto = function() {
          var promise = CameraSrv.takePicture();
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
