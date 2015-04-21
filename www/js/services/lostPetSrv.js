/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', [
  function(){

    var save = function (data) {
      var pet = new Pet(data);

      if(data.image) {
        var base64 = data.image,
          imageFile = new Parse.File('petFinderImage.png', { base64: base64 }, 'image/png');
        pet.set('image', imageFile);
      }

      return pet.save();
    };

    var fetch = function (options) {
      var query = new Parse.Query(Pet);
      query.limit(10);
      return query.find();
    };

    return {
      save: save,
      fetch: fetch
    }

  }
]);