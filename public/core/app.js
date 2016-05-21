
(function () {
  'use strict';

  // ========== initialize main module ========== //
  angular
    .module('documentarioApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'adaptv.adaptStrap',
      'mgcrea.ngStrap',
      'doc.features',
      'ngFileUpload',
      'ui.bootstrap',
      'ui.grid',
      'ui.grid.pagination',
      'ui.grid.resizeColumns',
      'ui.grid.autoResize'
    ]);
  angular.module('doc.features', []);
})();
