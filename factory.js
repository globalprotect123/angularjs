(function () {
'use strict';

angular.module('ControllerAsApp', [])
.controller('ShoppingListController1', SLController1)
.controller('ShoppingListController2', SLController2)
.factory('ShoppingListFactory', SLFactory);

SLController1.$inject = ['ShoppingListFactory'];
function SLController1(ShoppingListFactory) {
  var ctrl = this;

  // use factory to create service
  var shoppingList = ShoppingListFactory();

  ctrl.items = shoppingList.getItems();
  ctrl.itemName = "";
  ctrl.itemQuantity = "";
  ctrl.addItem = function() {
    shoppingList.addItem(ctrl.itemName, ctrl.itemQuantity);
  };
  ctrl.removeItem = function(index) {
    shoppingList.removeItem(index);
  };
}

SLController2.$inject = ['ShoppingListFactory'];
function SLController2(ShoppingListFactory) {
  var ctrl = this;

  // use factory to create service with limit of 3 items
  var shoppingList = ShoppingListFactory(3);

  ctrl.items = shoppingList.getItems();
  ctrl.itemName = "";
  ctrl.itemQuantity = "";
  ctrl.addItem = function() {
    try {
      shoppingList.addItem(ctrl.itemName, ctrl.itemQuantity);
    } catch (error) {
      console.log("Error: " + error.message);
      ctrl.errorMessage = error.message;
    }
  }
  ctrl.removeItem = function(index) {
    shoppingList.removeItem(index);
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
