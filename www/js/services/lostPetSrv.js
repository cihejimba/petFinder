/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', ['$q',
  function($q){

    var save = function (data) {
      var pet = new Pet(data),
          deferred = $q.defer();

      pet.save(null, {
        success: function(response) {
          deferred.resolve(response);
        },
        error: function(response, error) {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    };

    return {
      save: save
    }

  }
]);