/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', [
  function(){

    var save = function (data) {
      var base64 = data.image,
        imageFile = new Parse.File('petFinderimage.png', { base64: base64 }, 'image/png'),
        pet = new Pet(data);

      pet.set('image', imageFile);
      return pet.save();
    };

    return {
      save: save
    }

  }
]);