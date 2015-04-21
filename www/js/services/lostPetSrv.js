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
      query.limit(options.limit);
      query.skip(options.page * options.limit);
      query.descending("date");
      return query.find();
    };

    var count = function () {
      var query = new Parse.Query(Pet);
      return query.count();
    };

    return {
      save: save,
      fetch: fetch,
      count: count
    }

  }
]);