(function () {
  'use strict';
  angular.module('doc.features')
    // lista los clientes
    .controller('ClienteCtrl', [
      '$scope',
      function ($scope) {
        $scope.colDef = [
          {
            columnHeaderDisplayName: 'Legacy ID',
            displayProperty: 'legacy_id'
          },
          {
            columnHeaderDisplayName: 'Descripción',
            displayProperty: 'descripcion'
          }
        ];

        $scope.tableConfig = {
          url: 'Clientes/list',
          method: 'get',
          params:{},
          paginationConfig: {
            response: {
              totalItems: 'results.totalResults',
              itemsLocation: 'results.list'
            }
          }
        };
      }])

    .controller('ClientCreateCtrl', [
      '$scope',
      'Cliente', // Objecto que contiene los metodosAPi Rest
      '$location',
      function ($scope, Cliente, $location) {
        $scope.cliente = new Cliente();

        $scope.backToList = function () {
          $location.path('/clientes');
        };

        $scope.save = function (form) {
          if (form.$valid) {
            $scope.cliente.$save(function () {
              $location.path('/clientes');
            })
          } else {
            // todo: agregar servicio de notifiaciones general al sistema
            console.log('error de formulario');
            console.log(form);
          }
        };




      }])
})();
