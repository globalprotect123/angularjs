(function () {
'use strict';

angular.module('DirectiveApp', [])
.controller('ShoppingListController1', SLController1)
.factory('ShoppingListFactory', SLFactory)
.component('shoppingList', {
  templateUrl: 'shopping-list2.html',
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

ShoppingListComponentController.$inject = ['$scope', '$element']
function ShoppingListComponentController($scope, $element) {
  var $ctrl = this;

  $ctrl.cookiesInList = function () {
    for (var i = 0; i < $ctrl.items.length; i++) {
      var name = $ctrl.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };

  $ctrl.remove = function (myIndex) {
    $ctrl.onRemove({ index: myIndex });
  };

  $ctrl.$onInit = function () {
    console.log("We are in $onInit()");
  };

  $ctrl.$onChanges = function (changeObj) {
    console.log("Changes: ", changeObj);
  }

  $ctrl.$postLink = function () {
    $scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
      console.log($element);
      if (newValue === true) {
        // Show warning
        var warningElem = $element.find('div.error');
        warningElem.slideDown(900);
      }
      else {
        // Hide warning
        var warningElem = $element.find('div.error');
        warningElem.slideUp(900);
      }
    });
  };
}

SLController1.$inject = ['ShoppingListFactory'];
function SLController1(ShoppingListFactory) {
  var ctrl = this;

  // use factory to create service
  var shoppingList = ShoppingListFactory();

  ctrl.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  ctrl.title = origTitle + " (" + ctrl.items.length + " items)";
  ctrl.itemName = "";
  ctrl.itemQuantity = "";
  ctrl.lastRemoved = "";
  ctrl.addItem = function() {
    try {
      shoppingList.addItem(ctrl.itemName, ctrl.itemQuantity);
    } catch (error) {
      ctrl.errorMessage = error.message;
    }
    ctrl.title = origTitle + " (" + ctrl.items.length + " items)";
  };
  ctrl.removeItem = function(index) {
    ctrl.lastRemoved = "Last item removed was " + ctrl.items[index].name;
    shoppingList.removeItem(index);
    ctrl.title = origTitle + " (" + ctrl.items.length + " items)";
  };
}

function SLFactory() {
  var factory = function(maxItems) {
    return new SLService(maxItems);
  };
  return factory;
}

function SLService(maxItems) {
  var service = this;
  var items = [];

  service.addItem = function(name, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined && (items.length < maxItems))) {
      var item = {
        name: name,
        quantity: quantity
      };
      items.push(item);
    } else {
      throw new Error("Max items (" + maxItems + ") reached!");
    }
  };
  service.getItems = function() {
    return items;
  };
  service.removeItem = function(index) {
    items.splice(index, 1);
  };
}

})();
