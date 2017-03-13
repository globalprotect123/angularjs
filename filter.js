(function () {
'use strict';

angular.module('DIApp', [])
.controller('DIController', DIController)
.filter('siuwang', SiuwangFilterFactory)
.filter('multi', MultiFilterFactory);

DIController.$inject = ['$scope', 'siuwangFilter', 'multiFilter'];

function MultiFilterFactory()  {
  return function(input, firstarg, secondarg) {
    console.log("input is: " + input + "!!!");
    return input + " + " + firstarg + " + " + secondarg
  }
}

function SiuwangFilterFactory()  {
  return function(input) {
    console.log("input is: " + input + "!!!");
    var str = "";
    var local = "";
    for (var i = 0; i < input.length; ++i) {
      if ((i % 2) == 0) {
        local = str.concat("", input.charAt(i).toUpperCase());
      } else {
        local = str.concat("", input.charAt(i));
      }
      str = local;
    }
    return str;
  }
}

function DIController($scope, siuwangFilter) {
  $scope.cost = .45;
  $scope.name = "";
  $scope.sayHello = function() {
    return "This is a test";
  }
  $scope.upper = function() {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  };
}
})();
