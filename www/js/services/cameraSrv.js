/**
 * Created by federicomaceachen on 3/11/15.
 */
services.factory('CameraSrv', ['$cordovaCamera',
  function($cordovaCamera) {

    var takePicture = function (type) {
      var sourceType = '';
      if(type === 'CAMERA') {
        sourceType =Camera.PictureSourceType.CAMERA;
      } else if(type === 'GALLERY') {
        sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }

      var options = {
        quality : 100,
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : sourceType,
        allowEdit : false,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 150,
        targetHeight: 150,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      };
      return $cordovaCamera.getPicture(options);
    };

    return {
      takePicture: takePicture
    };
  }
]);
