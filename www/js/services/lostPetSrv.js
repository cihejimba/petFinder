/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', [
  function(){

    var save = function (data) {
      var pet = new Pet(data);
      return pet.save();
    };

    return {
      save: save
    }

  }
]);