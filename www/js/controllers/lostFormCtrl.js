/**
 * Created by federicomaceachen on 3/16/15.
 */
controllerModule.controller('LostFormCtrl',
    ['$scope', 'CameraSrv', 'DatePickerSrv',
      function($scope, CameraSrv, DatePickerSrv) {

        $scope.data = {
          image: '',
          color: '',
          state: '',
          zone: '',
          gender: '',
          date: '',
          description: ''
        };

        $scope.saveLostPet = function (data) {
          alert('Saving.. ' + data);
        };

        $scope.dateSelected = false;

        $scope.gender = {
          male: 'male',
          female: 'female'
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
            minDate: new Date() - 10000,
            allowOldDates: true,
            allowFutureDates: false,
            doneButtonLabel: 'DONE',
            doneButtonColor: '#F2F3F4',
            cancelButtonLabel: 'CANCEL',
            cancelButtonColor: '#000000'
          };

          DatePickerSrv.getDatePicker(options).then(function(date){
            $scope.data.date = date;
          });
          $scope.dateSelected = true;
        };

      }
    ]
);
