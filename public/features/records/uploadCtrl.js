(function () {
  'use strict';
  angular.module('doc.features')
  .controller('UploadCtrl', [
    '$scope',
    'Upload',
    function ($scope, Upload) {

      $scope.customer = {};
      $scope.isLoading = false;
      $scope.disableSubmit = false;
      $scope.callSucced = false;

      function resetValues() {
        $scope.customer = {};
        $scope.isLoading = false;
        $scope.disableSubmit = false;
        angular.element('#registrosForm')[0].reset();
      }

      $scope.saveData = function (file) {
        if ($scope.customer && Object.keys($scope.customer).length){
          $scope.nroRegistros = '';
          $scope.errorMsg = '';
          $scope.isLoading = true;
          $scope.disableSubmit = true;
          $scope.callSucced = false;

          Upload.upload({
            url: 'records/upload',
            data: {uploadFile: file}
          }).then(function (resp) {
            $scope.nroRegistros = resp.data.totalCount;
            $scope.callSucced = true;
            resetValues();
          }, function (error) {
            $scope.errorMsg = error && error.message ? error.message : 'Error de comunicación con el servidor';
            resetValues();
          });
        }
      };
    }]);
})();
