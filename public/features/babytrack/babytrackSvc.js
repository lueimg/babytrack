(function () {
  'use strict';
  angular
    .module('doc.features')
    .factory('Records', ['$resource', function ($resource) {
      var Records = $resource('/records',
        {},
        {
          query: {
            isArray: true
          },
          categories: {
            method: 'GET',
            url: '/records/categories',
            isArray: true
          }
        }
      );
      return Records;
    }]);
})();
