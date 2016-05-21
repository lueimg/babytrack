(function () {
  'use strict';
  angular
    .module('doc.features')
    .factory('Cliente', ['$resource', function ($resource) {
      var Cliente = $resource('/Clientes/list/:id',
        {id: '@id'},
        {
          query: {
            isArray: true
          }
        }
      );
      return Cliente;
    }]);
})();
