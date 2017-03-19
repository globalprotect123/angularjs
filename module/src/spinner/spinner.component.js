(function () {
'use strict';

// Component definition here (To use this component, type <loading-spinner> in HTML)
angular.module('Spinner')
.component('loadingSpinner', {
  templateUrl: 'src/spinner/spinner.template.html',
  controller: SpinnerController
});

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;

  var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data) {
    console.log("Event: ", event);
    console.log("Data: ", data);
    $ctrl.showSpinner = data.on;
  });

  $ctrl.$onDestroy = function () {
    cancelListener();
  };
};

})();
