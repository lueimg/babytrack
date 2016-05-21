(function () {
  'use strict';
  angular.module('doc.features')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'features/babytrack/babytrack.html',
          controller: 'recordsCtrl'
        });

    }]);
})();
