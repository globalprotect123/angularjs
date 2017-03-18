(function () {
'use strict';

angular.module('DirectiveApp', [])
.controller('ShoppingListController1', SLController1)
.factory('ShoppingListFactory', SLFactory)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
  var ddo = {
    templateUrl: 'shopping-list.html',
    scope: {
      items: '<',
      title: '@',
      onRemove: '&'
    },
    controller: ShoppingListDirectiveController,
    bindToController: true,
    controllerAs: 'sldc'
  }
  return ddo;
}

function ShoppingListDirectiveController() {
  var sldc = this;
  sldc.cookiesInList = function() {
    for (var i = 0; i < sldc.items.length; ++i) {
      var name = sldc.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
    return false;
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
