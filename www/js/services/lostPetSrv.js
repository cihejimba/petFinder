/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', ['$q',
  function($q){

    var save = function (data) {
      var pet = new Pet(data);
      return pet.save();
    };

    return {
      save: save
    }

  }
]);