(function () {
'use strict';

angular.module('ShoppingListAddApp', [])
.controller('ShoppingListAddController', SLAddController)
.controller('ShoppingListShowController', SLShowController)
.service('ShoppingListService', SLService)

SLAddController.$inject = ['ShoppingListService'];
function SLAddController(ShoppingListService) {
  var ctrl = this;
  ctrl.itemName = "";
  ctrl.itemQuantity = "";
  ctrl.addItem = function() {
    ShoppingListService.addItem(ctrl.itemName, ctrl.itemQuantity);
  };
}

SLShowController.$inject = ['ShoppingListService'];
function SLShowController(ShoppingListService) {
  var ctrl = this;
  ctrl.items = ShoppingListService.getItems();
  ctrl.removeItem = function(index) {
    ShoppingListService.removeItem(index);
  };
}

function SLService() {
  var service = this;
  var items = [];

  service.addItem = function(name, quantity) {
    var item = {
      name: name,
      quantity: quantity
    };
    items.push(item);
  };
  service.getItems = function() {
    return items;
  };
  service.removeItem = function(index) {
    items.splice(index, 1);
  };
}



})();
