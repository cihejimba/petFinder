/**
 * Created by federicomaceachen on 4/13/15.
 */
services.factory('LostPetSrv', ['$resource',
  function($resource){

    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });

  }
]);