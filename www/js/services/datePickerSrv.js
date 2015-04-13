/**
 * Created by federicomaceachen on 3/19/15.
 */
services.factory('DatePickerSrv', ['$cordovaDatePicker',
      function ($cordovaDatePicker) {

        var getDatePicker = function (options) {
          return $cordovaDatePicker.show(options);
        };

        return {
          getDatePicker: getDatePicker
        };
  }]
);
